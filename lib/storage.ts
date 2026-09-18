import { promises as fs } from "fs";
import path from "path";

export type DeviceType = "desktop" | "mobile" | "tablet";

export type VisitEvent = {
  id: string;
  sessionId: string;
  path: string;
  locale: string;
  referrer: string;
  userAgent: string;
  device: DeviceType;
  timestamp: number;
  duration: number; // in seconds
};

export type ClickEvent = {
  id: string;
  sessionId: string;
  targetUrl: string;
  label: string;
  category: string;
  timestamp: number;
};

export type RequestStatus = "new" | "in_review" | "contacted" | "archived";

export type ProjectRequest = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  serviceType: string;
  budget?: string;
  message: string;
  status: RequestStatus;
  createdAt: number;
};

export type AnalyticsData = {
  visits: VisitEvent[];
  clicks: ClickEvent[];
};

const STORAGE_DIR = path.join(process.cwd(), "data", "storage");
const ANALYTICS_FILE = path.join(STORAGE_DIR, "analytics.json");
const REQUESTS_FILE = path.join(STORAGE_DIR, "requests.json");

async function ensureDirectory(): Promise<void> {
  try {
    await fs.mkdir(STORAGE_DIR, { recursive: true });
  } catch {
    // directory exists
  }
}

async function readJsonFile<T>(filePath: string, fallback: T): Promise<T> {
  await ensureDirectory();
  try {
    const raw = await fs.readFile(filePath, "utf-8");
    return JSON.parse(raw) as T;
  } catch {
    await writeJsonFile(filePath, fallback);
    return fallback;
  }
}

async function writeJsonFile<T>(filePath: string, data: T): Promise<void> {
  await ensureDirectory();
  const tempPath = `${filePath}.tmp.${Date.now()}`;
  await fs.writeFile(tempPath, JSON.stringify(data, null, 2), "utf-8");
  await fs.rename(tempPath, filePath);
}

// --------------------------------------------------------------------------
// Visits & Sessions
// --------------------------------------------------------------------------

export async function recordVisit(event: {
  sessionId: string;
  path: string;
  locale: string;
  referrer?: string;
  userAgent?: string;
}): Promise<VisitEvent> {
  const data = await readJsonFile<AnalyticsData>(ANALYTICS_FILE, { visits: [], clicks: [] });

  const ua = event.userAgent || "";
  const isMobile = /mobile|iphone|android|blackberry/i.test(ua);
  const isTablet = /tablet|ipad/i.test(ua);
  const device: DeviceType = isTablet ? "tablet" : isMobile ? "mobile" : "desktop";

  const visit: VisitEvent = {
    id: `vis_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    sessionId: event.sessionId,
    path: event.path || "/",
    locale: event.locale || "en",
    referrer: event.referrer || "direct",
    userAgent: ua,
    device,
    timestamp: Date.now(),
    duration: 5, // initial baseline
  };

  data.visits.push(visit);

  // Keep last 10,000 visits to bound storage
  if (data.visits.length > 10000) {
    data.visits = data.visits.slice(-10000);
  }

  await writeJsonFile(ANALYTICS_FILE, data);
  return visit;
}

export async function updateSessionDuration(
  sessionId: string,
  durationSeconds: number,
): Promise<void> {
  if (!sessionId || durationSeconds <= 0) return;
  const data = await readJsonFile<AnalyticsData>(ANALYTICS_FILE, { visits: [], clicks: [] });

  // Update duration on the most recent visit matching this session
  for (let i = data.visits.length - 1; i >= 0; i--) {
    const v = data.visits[i];
    if (v && v.sessionId === sessionId) {
      v.duration = Math.max(v.duration, Math.min(Math.round(durationSeconds), 7200)); // cap at 2 hours
      break;
    }
  }

  await writeJsonFile(ANALYTICS_FILE, data);
}

// --------------------------------------------------------------------------
// Link Clicks
// --------------------------------------------------------------------------

export async function recordClick(event: {
  sessionId: string;
  targetUrl: string;
  label: string;
  category?: string;
}): Promise<ClickEvent> {
  const data = await readJsonFile<AnalyticsData>(ANALYTICS_FILE, { visits: [], clicks: [] });

  const click: ClickEvent = {
    id: `clk_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    sessionId: event.sessionId,
    targetUrl: event.targetUrl,
    label: event.label || "link",
    category: event.category || "external",
    timestamp: Date.now(),
  };

  data.clicks.push(click);

  if (data.clicks.length > 10000) {
    data.clicks = data.clicks.slice(-10000);
  }

  await writeJsonFile(ANALYTICS_FILE, data);
  return click;
}

// --------------------------------------------------------------------------
// Aggregations & Analytics Summary
// --------------------------------------------------------------------------

export async function getAnalyticsSummary() {
  const data = await readJsonFile<AnalyticsData>(ANALYTICS_FILE, { visits: [], clicks: [] });
  const requests = await getProjectRequests();

  const totalVisits = data.visits.length;
  const uniqueSessions = new Set(data.visits.map((v) => v.sessionId)).size;

  // Average duration
  const totalDuration = data.visits.reduce((acc, v) => acc + (v.duration || 0), 0);
  const avgDurationSeconds = totalVisits > 0 ? Math.round(totalDuration / totalVisits) : 0;

  // Clicks by target
  const clickCounts: Record<string, { label: string; count: number; category: string }> = {};
  for (const c of data.clicks) {
    const key = c.targetUrl || c.label;
    if (!clickCounts[key]) {
      clickCounts[key] = { label: c.label || c.targetUrl, count: 0, category: c.category };
    }
    clickCounts[key].count++;
  }

  const topClicks = Object.entries(clickCounts)
    .map(([url, item]) => ({ url, ...item }))
    .sort((a, b) => b.count - a.count);

  // Visits by device
  const deviceCounts: Record<DeviceType, number> = { desktop: 0, mobile: 0, tablet: 0 };
  for (const v of data.visits) {
    if (deviceCounts[v.device] !== undefined) {
      deviceCounts[v.device]++;
    } else {
      deviceCounts.desktop++;
    }
  }

  // Visits by locale
  const localeCounts: Record<string, number> = {};
  for (const v of data.visits) {
    const loc = v.locale || "en";
    localeCounts[loc] = (localeCounts[loc] || 0) + 1;
  }

  // Timeline (last 7 days)
  const days: Record<string, { visits: number; unique: Set<string> }> = {};
  const now = Date.now();
  for (let i = 6; i >= 0; i--) {
    const d = new Date(now - i * 86400000);
    const dateStr = d.toISOString().split("T")[0]!;
    days[dateStr] = { visits: 0, unique: new Set() };
  }

  for (const v of data.visits) {
    const dStr = new Date(v.timestamp).toISOString().split("T")[0]!;
    if (days[dStr]) {
      days[dStr].visits++;
      days[dStr].unique.add(v.sessionId);
    }
  }

  const timeline = Object.entries(days).map(([date, val]) => ({
    date,
    visits: val.visits,
    unique: val.unique.size,
  }));

  // Duration distribution
  const durationBuckets = {
    under30s: 0,
    oneToThreeMin: 0,
    threeToFiveMin: 0,
    overFiveMin: 0,
  };
  for (const v of data.visits) {
    if (v.duration < 30) durationBuckets.under30s++;
    else if (v.duration < 180) durationBuckets.oneToThreeMin++;
    else if (v.duration < 300) durationBuckets.threeToFiveMin++;
    else durationBuckets.overFiveMin++;
  }

  return {
    totalVisits,
    uniqueVisitors: uniqueSessions,
    avgDurationSeconds,
    totalClicks: data.clicks.length,
    topClicks,
    deviceCounts,
    localeCounts,
    timeline,
    durationBuckets,
    recentVisits: [...data.visits].reverse().slice(0, 30),
    totalRequests: requests.length,
    pendingRequests: requests.filter((r) => r.status === "new").length,
  };
}

export async function clearAllAnalytics(): Promise<void> {
  await writeJsonFile<AnalyticsData>(ANALYTICS_FILE, { visits: [], clicks: [] });
}

// --------------------------------------------------------------------------
// Project Requests (الطلبات)
// --------------------------------------------------------------------------

export async function createProjectRequest(payload: {
  name: string;
  email: string;
  phone?: string;
  serviceType: string;
  budget?: string;
  message: string;
}): Promise<ProjectRequest> {
  const requests = await readJsonFile<ProjectRequest[]>(REQUESTS_FILE, []);

  const newRequest: ProjectRequest = {
    id: `req_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    name: payload.name.trim(),
    email: payload.email.trim(),
    phone: payload.phone?.trim(),
    serviceType: payload.serviceType.trim(),
    budget: payload.budget?.trim(),
    message: payload.message.trim(),
    status: "new",
    createdAt: Date.now(),
  };

  requests.unshift(newRequest);
  await writeJsonFile(REQUESTS_FILE, requests);
  return newRequest;
}

export async function getProjectRequests(): Promise<ProjectRequest[]> {
  return readJsonFile<ProjectRequest[]>(REQUESTS_FILE, []);
}

export async function updateRequestStatus(
  id: string,
  status: RequestStatus,
): Promise<ProjectRequest | null> {
  const requests = await readJsonFile<ProjectRequest[]>(REQUESTS_FILE, []);
  const req = requests.find((r) => r.id === id);
  if (!req) return null;

  req.status = status;
  await writeJsonFile(REQUESTS_FILE, requests);
  return req;
}

export async function deleteProjectRequest(id: string): Promise<boolean> {
  const requests = await readJsonFile<ProjectRequest[]>(REQUESTS_FILE, []);
  const filtered = requests.filter((r) => r.id !== id);
  if (filtered.length === requests.length) return false;

  await writeJsonFile(REQUESTS_FILE, filtered);
  return true;
}
