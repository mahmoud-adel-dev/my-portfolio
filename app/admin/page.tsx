"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Activity,
  ArrowUpRight,
  Clock,
  ExternalLink,
  Eye,
  Inbox,
  LayoutDashboard,
  LogOut,
  Mail,
  MessageCircle,
  MousePointerClick,
  Phone,
  RefreshCw,
  Search,
  ShieldCheck,
  Trash2,
  TrendingUp,
  UserCheck,
  Users,
} from "lucide-react";
import type { RequestStatus } from "@/lib/storage";

type Summary = {
  totalVisits: number;
  uniqueVisitors: number;
  avgDurationSeconds: number;
  totalClicks: number;
  totalRequests: number;
  pendingRequests: number;
  topClicks: { url: string; label: string; count: number; category: string }[];
  deviceCounts: { desktop: number; mobile: number; tablet: number };
  localeCounts: Record<string, number>;
  timeline: { date: string; visits: number; unique: number }[];
  durationBuckets: {
    under30s: number;
    oneToThreeMin: number;
    threeToFiveMin: number;
    overFiveMin: number;
  };
  recentVisits: {
    id: string;
    path: string;
    locale: string;
    device: string;
    duration: number;
    referrer: string;
    timestamp: number;
  }[];
};

type ProjectRequest = {
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

export default function AdminDashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState<Summary | null>(null);
  const [requests, setRequests] = useState<ProjectRequest[]>([]);
  const [activeTab, setActiveTab] = useState<"overview" | "requests" | "clicks" | "visits">("overview");
  const [requestFilter, setRequestFilter] = useState<string>("all");
  const [selectedRequest, setSelectedRequest] = useState<ProjectRequest | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const checkAuthAndFetch = useCallback(async () => {
    try {
      const authRes = await fetch("/api/admin/auth");
      const authData = await authRes.json();
      if (!authData.authenticated) {
        router.push("/admin/login");
        return;
      }

      const [statsRes, reqsRes] = await Promise.all([
        fetch("/api/admin/stats"),
        fetch("/api/requests"),
      ]);

      if (statsRes.ok) {
        const sData = await statsRes.json();
        setSummary(sData.summary);
      }

      if (reqsRes.ok) {
        const rData = await reqsRes.json();
        setRequests(rData.requests || []);
      }
    } catch {
      router.push("/admin/login");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [router]);

  useEffect(() => {
    checkAuthAndFetch();
  }, [checkAuthAndFetch]);

  const handleLogout = async () => {
    await fetch("/api/admin/auth", { method: "DELETE" });
    router.push("/admin/login");
  };

  const handleStatusChange = async (id: string, newStatus: RequestStatus) => {
    try {
      const res = await fetch("/api/requests", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
      if (res.ok) {
        setRequests((prev) =>
          prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r)),
        );
        if (selectedRequest?.id === id) {
          setSelectedRequest((prev) => (prev ? { ...prev, status: newStatus } : null));
        }
      }
    } catch (e) {
      console.error("Failed to update status", e);
    }
  };

  const handleDeleteRequest = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project request?")) return;
    try {
      const res = await fetch(`/api/requests?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setRequests((prev) => prev.filter((r) => r.id !== id));
        if (selectedRequest?.id === id) setSelectedRequest(null);
      }
    } catch (e) {
      console.error("Failed to delete request", e);
    }
  };

  const handleClearAnalytics = async () => {
    if (!confirm("Reset all visit and click analytics? This action cannot be undone.")) return;
    await fetch("/api/admin/stats", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "clear_analytics" }),
    });
    checkAuthAndFetch();
  };

  const formatDuration = (seconds: number) => {
    if (!seconds || seconds <= 0) return "0s";
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    if (mins === 0) return `${secs}s`;
    return `${mins}m ${secs}s`;
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#090a0c]">
        <div className="flex flex-col items-center gap-3">
          <RefreshCw className="size-6 animate-spin text-[#ffb454]" />
          <p className="font-mono text-xs uppercase tracking-wider text-[#9199a5]">
            Loading Admin Engine...
          </p>
        </div>
      </div>
    );
  }

  const filteredRequests =
    requestFilter === "all"
      ? requests
      : requests.filter((r) => r.status === requestFilter);

  const maxTimelineVisits = Math.max(
    ...(summary?.timeline.map((t) => t.visits) || [1]),
    1,
  );

  return (
    <div className="min-h-screen bg-[#090a0c] text-[#f3f4f5]">
      {/* Top Navbar */}
      <header className="sticky top-0 z-30 border-b border-white/10 bg-[#0e1013]/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-4">
            <div className="flex size-9 items-center justify-center rounded-lg border border-[#ffb454]/40 bg-[#ffb454]/10 text-[#ffb454]">
              <ShieldCheck className="size-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-sm font-bold text-white">Mahmoud Adel</span>
                <span className="rounded bg-[#ffb454]/20 px-1.5 py-0.2 font-mono text-[10px] text-[#ffb454]">
                  Admin
                </span>
              </div>
              <p className="text-[11px] text-[#9199a5]">Portfolio Telemetry & Operations</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setRefreshing(true);
                checkAuthAndFetch();
              }}
              title="Refresh Data"
              className="flex size-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-[#9199a5] transition-colors hover:border-white/20 hover:text-white"
            >
              <RefreshCw className={`size-4 ${refreshing ? "animate-spin" : ""}`} />
            </button>

            <Link
              href="/"
              target="_blank"
              className="hidden items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 font-mono text-xs text-[#9199a5] transition-colors hover:border-white/20 hover:text-white sm:flex"
            >
              <span>Live Site</span>
              <ExternalLink className="size-3" />
            </Link>

            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-1.5 font-mono text-xs text-red-400 transition-colors hover:bg-red-500/20"
            >
              <LogOut className="size-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-white/10 pb-4">
          <button
            onClick={() => setActiveTab("overview")}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 font-mono text-xs transition-colors ${
              activeTab === "overview"
                ? "bg-[#ffb454] font-bold text-[#241300]"
                : "border border-white/10 text-[#9199a5] hover:border-white/20 hover:text-white"
            }`}
          >
            <LayoutDashboard className="size-3.5" />
            <span>Overview & Analytics</span>
          </button>

          <button
            onClick={() => setActiveTab("requests")}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 font-mono text-xs transition-colors ${
              activeTab === "requests"
                ? "bg-[#ffb454] font-bold text-[#241300]"
                : "border border-white/10 text-[#9199a5] hover:border-white/20 hover:text-white"
            }`}
          >
            <Inbox className="size-3.5" />
            <span>Project Requests</span>
            {summary?.pendingRequests ? (
              <span className="rounded-full bg-emerald-500 px-1.5 py-0.2 text-[10px] font-bold text-black">
                {summary.pendingRequests}
              </span>
            ) : null}
          </button>

          <button
            onClick={() => setActiveTab("clicks")}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 font-mono text-xs transition-colors ${
              activeTab === "clicks"
                ? "bg-[#ffb454] font-bold text-[#241300]"
                : "border border-white/10 text-[#9199a5] hover:border-white/20 hover:text-white"
            }`}
          >
            <MousePointerClick className="size-3.5" />
            <span>Link Clicks ({summary?.totalClicks || 0})</span>
          </button>

          <button
            onClick={() => setActiveTab("visits")}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 font-mono text-xs transition-colors ${
              activeTab === "visits"
                ? "bg-[#ffb454] font-bold text-[#241300]"
                : "border border-white/10 text-[#9199a5] hover:border-white/20 hover:text-white"
            }`}
          >
            <Activity className="size-3.5" />
            <span>Live Visits Stream</span>
          </button>
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* TAB 1: OVERVIEW & KPIS */}
        {/* ---------------------------------------------------------------- */}
        {activeTab === "overview" && summary ? (
          <div className="mt-8 space-y-8">
            {/* KPI Cards Grid */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {/* Total Visits */}
              <div className="rounded-xl border border-white/10 bg-[#121418] p-5">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-[#9199a5]">Total Page Views</span>
                  <div className="flex size-8 items-center justify-center rounded bg-blue-500/10 text-blue-400">
                    <Eye className="size-4" />
                  </div>
                </div>
                <div className="mt-3">
                  <p className="font-mono text-3xl font-bold text-white">{summary.totalVisits}</p>
                  <p className="mt-1 text-xs text-[#9199a5]">
                    Across all locales & pages
                  </p>
                </div>
              </div>

              {/* Unique Visitors */}
              <div className="rounded-xl border border-white/10 bg-[#121418] p-5">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-[#9199a5]">Unique Visitors</span>
                  <div className="flex size-8 items-center justify-center rounded bg-emerald-500/10 text-emerald-400">
                    <Users className="size-4" />
                  </div>
                </div>
                <div className="mt-3">
                  <p className="font-mono text-3xl font-bold text-white">{summary.uniqueVisitors}</p>
                  <p className="mt-1 text-xs text-emerald-400">
                    Distinct sessions tracked
                  </p>
                </div>
              </div>

              {/* Stay Duration */}
              <div className="rounded-xl border border-white/10 bg-[#121418] p-5">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-[#9199a5]">Avg User Duration</span>
                  <div className="flex size-8 items-center justify-center rounded bg-amber-500/10 text-amber-400">
                    <Clock className="size-4" />
                  </div>
                </div>
                <div className="mt-3">
                  <p className="font-mono text-3xl font-bold text-[#ffb454]">
                    {formatDuration(summary.avgDurationSeconds)}
                  </p>
                  <p className="mt-1 text-xs text-[#9199a5]">
                    Active time on portfolio
                  </p>
                </div>
              </div>

              {/* Inquiries */}
              <div className="rounded-xl border border-white/10 bg-[#121418] p-5">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-[#9199a5]">Project Requests</span>
                  <div className="flex size-8 items-center justify-center rounded bg-purple-500/10 text-purple-400">
                    <Inbox className="size-4" />
                  </div>
                </div>
                <div className="mt-3">
                  <div className="flex items-baseline gap-2">
                    <p className="font-mono text-3xl font-bold text-white">{summary.totalRequests}</p>
                    {summary.pendingRequests > 0 ? (
                      <span className="text-xs font-semibold text-emerald-400">
                        ({summary.pendingRequests} new)
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-1 text-xs text-[#9199a5]">
                    Inquiries from clients
                  </p>
                </div>
              </div>
            </div>

            {/* Timeline & Duration Distribution */}
            <div className="grid gap-6 lg:grid-cols-12">
              {/* 7-Day Visits Timeline */}
              <div className="rounded-xl border border-white/10 bg-[#121418] p-6 lg:col-span-8">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-mono text-sm font-bold text-white">
                      Traffic Trend (Last 7 Days)
                    </h3>
                    <p className="text-xs text-[#9199a5]">Daily visits vs unique visitors</p>
                  </div>
                  <TrendingUp className="size-4 text-[#ffb454]" />
                </div>

                <div className="mt-8 flex h-48 items-end gap-2 sm:gap-4">
                  {summary.timeline.map((t) => {
                    const heightPercent = Math.max(
                      Math.round((t.visits / maxTimelineVisits) * 100),
                      8,
                    );
                    return (
                      <div key={t.date} className="group relative flex flex-1 flex-col items-center">
                        {/* Tooltip */}
                        <div className="absolute -top-10 hidden rounded bg-black/90 px-2 py-1 font-mono text-[10px] text-white shadow-md group-hover:block z-10 whitespace-nowrap">
                          {t.visits} visits ({t.unique} unique)
                        </div>
                        {/* Bar */}
                        <div className="w-full rounded-t bg-white/5 transition-all group-hover:bg-white/10 flex flex-col justify-end h-full">
                          <div
                            style={{ height: `${heightPercent}%` }}
                            className="w-full rounded-t bg-gradient-to-t from-[#ffb454]/40 to-[#ffb454] transition-all"
                          />
                        </div>
                        <span className="mt-2 font-mono text-[10px] text-[#9199a5]">
                          {t.date.slice(5)}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Stay Duration Buckets */}
              <div className="rounded-xl border border-white/10 bg-[#121418] p-6 lg:col-span-4">
                <h3 className="font-mono text-sm font-bold text-white">Duration Breakdown</h3>
                <p className="text-xs text-[#9199a5]">How long users stay on site</p>

                <div className="mt-6 space-y-4">
                  <div>
                    <div className="flex justify-between text-xs">
                      <span className="text-[#9199a5]">&lt; 30 seconds</span>
                      <span className="font-mono font-semibold text-white">
                        {summary.durationBuckets.under30s}
                      </span>
                    </div>
                    <div className="mt-1.5 h-1.5 w-full rounded-full bg-white/5">
                      <div
                        style={{
                          width: `${(summary.durationBuckets.under30s / (summary.totalVisits || 1)) * 100}%`,
                        }}
                        className="h-full rounded-full bg-zinc-500"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs">
                      <span className="text-[#9199a5]">1 - 3 minutes</span>
                      <span className="font-mono font-semibold text-white">
                        {summary.durationBuckets.oneToThreeMin}
                      </span>
                    </div>
                    <div className="mt-1.5 h-1.5 w-full rounded-full bg-white/5">
                      <div
                        style={{
                          width: `${(summary.durationBuckets.oneToThreeMin / (summary.totalVisits || 1)) * 100}%`,
                        }}
                        className="h-full rounded-full bg-blue-400"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs">
                      <span className="text-[#9199a5]">3 - 5 minutes</span>
                      <span className="font-mono font-semibold text-white">
                        {summary.durationBuckets.threeToFiveMin}
                      </span>
                    </div>
                    <div className="mt-1.5 h-1.5 w-full rounded-full bg-white/5">
                      <div
                        style={{
                          width: `${(summary.durationBuckets.threeToFiveMin / (summary.totalVisits || 1)) * 100}%`,
                        }}
                        className="h-full rounded-full bg-emerald-400"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs">
                      <span className="text-[#9199a5]">&gt; 5 minutes</span>
                      <span className="font-mono font-semibold text-white">
                        {summary.durationBuckets.overFiveMin}
                      </span>
                    </div>
                    <div className="mt-1.5 h-1.5 w-full rounded-full bg-white/5">
                      <div
                        style={{
                          width: `${(summary.durationBuckets.overFiveMin / (summary.totalVisits || 1)) * 100}%`,
                        }}
                        className="h-full rounded-full bg-[#ffb454]"
                      />
                    </div>
                  </div>
                </div>

                {/* Device summary */}
                <div className="mt-8 border-t border-white/10 pt-4">
                  <p className="font-mono text-[11px] uppercase tracking-wider text-[#9199a5]">
                    Devices
                  </p>
                  <div className="mt-2 flex justify-between text-xs">
                    <span>Desktop: {summary.deviceCounts.desktop}</span>
                    <span>Mobile: {summary.deviceCounts.mobile}</span>
                    <span>Tablet: {summary.deviceCounts.tablet}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Link Clicks Snapshot */}
            <div className="rounded-xl border border-white/10 bg-[#121418] p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-mono text-sm font-bold text-white">
                    Top Clicked Links & Actions
                  </h3>
                  <p className="text-xs text-[#9199a5]">Most clicked contact, social & project links</p>
                </div>
                <button
                  onClick={() => setActiveTab("clicks")}
                  className="font-mono text-xs text-[#ffb454] hover:underline"
                >
                  View All Clicks →
                </button>
              </div>

              <div className="mt-4 divide-y divide-white/5">
                {summary.topClicks.slice(0, 6).map((click) => (
                  <div key={click.url} className="flex items-center justify-between py-3">
                    <div className="flex items-center gap-3">
                      <MousePointerClick className="size-4 text-[#ffb454]" />
                      <div>
                        <p className="text-xs font-medium text-white">{click.label}</p>
                        <p className="font-mono text-[10px] text-[#9199a5] truncate max-w-sm">
                          {click.url}
                        </p>
                      </div>
                    </div>
                    <span className="rounded bg-white/5 px-2.5 py-1 font-mono text-xs font-bold text-[#ffb454]">
                      {click.count} clicks
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Maintenance Action */}
            <div className="flex items-center justify-between rounded-lg border border-white/10 bg-[#0e1013] p-4 text-xs">
              <span className="text-[#9199a5]">
                Analytics stored locally in <code className="text-[#ffb454]">data/storage/</code> with zero cloud dependencies.
              </span>
              <button
                onClick={handleClearAnalytics}
                className="rounded border border-red-500/20 bg-red-500/10 px-3 py-1.5 font-mono text-[11px] text-red-400 transition-colors hover:bg-red-500/20"
              >
                Clear / Reset Analytics
              </button>
            </div>
          </div>
        ) : null}

        {/* ---------------------------------------------------------------- */}
        {/* TAB 2: PROJECT REQUESTS & INQUIRIES */}
        {/* ---------------------------------------------------------------- */}
        {activeTab === "requests" ? (
          <div className="mt-8 space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="font-mono text-base font-bold text-white">Client Requests & Inquiries</h2>
                <p className="text-xs text-[#9199a5]">
                  Incoming project scopes, consultation inquiries, and contact submissions
                </p>
              </div>

              {/* Status Filter */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-[#9199a5]">Filter:</span>
                <select
                  value={requestFilter}
                  onChange={(e) => setRequestFilter(e.target.value)}
                  className="rounded border border-white/10 bg-[#121418] px-3 py-1.5 font-mono text-xs text-white focus:border-[#ffb454] focus:outline-none"
                >
                  <option value="all">All ({requests.length})</option>
                  <option value="new">New</option>
                  <option value="in_review">In Review</option>
                  <option value="contacted">Contacted</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
            </div>

            {filteredRequests.length === 0 ? (
              <div className="rounded-xl border border-white/10 bg-[#121418] p-12 text-center">
                <Inbox className="mx-auto size-10 text-[#9199a5]" />
                <h3 className="mt-3 font-mono text-sm font-semibold text-white">No requests found</h3>
                <p className="mt-1 text-xs text-[#9199a5]">
                  {requestFilter === "all"
                    ? "Inquiries submitted through the website form will appear here."
                    : `No requests with status '${requestFilter}'.`}
                </p>
              </div>
            ) : (
              <div className="grid gap-4">
                {filteredRequests.map((req) => {
                  const statusColors: Record<RequestStatus, string> = {
                    new: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
                    in_review: "bg-amber-500/10 text-amber-400 border-amber-500/20",
                    contacted: "bg-blue-500/10 text-blue-400 border-blue-500/20",
                    archived: "bg-zinc-500/10 text-zinc-400 border-zinc-500/20",
                  };

                  return (
                    <div
                      key={req.id}
                      className="rounded-xl border border-white/10 bg-[#121418] p-5 transition-all hover:border-white/20"
                    >
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                          <div className="flex items-center gap-3">
                            <h3 className="text-sm font-bold text-white">{req.name}</h3>
                            <span
                              className={`rounded border px-2 py-0.5 font-mono text-[10px] uppercase font-bold ${
                                statusColors[req.status] || ""
                              }`}
                            >
                              {req.status}
                            </span>
                            <span className="font-mono text-[11px] text-[#9199a5]">
                              {new Date(req.createdAt).toLocaleDateString()}
                            </span>
                          </div>

                          <div className="mt-2 flex flex-wrap gap-4 text-xs text-[#9199a5]">
                            <span className="flex items-center gap-1">
                              <Mail className="size-3 text-[#ffb454]" />
                              <a href={`mailto:${req.email}`} className="hover:text-white hover:underline">
                                {req.email}
                              </a>
                            </span>

                            {req.phone ? (
                              <span className="flex items-center gap-1">
                                <Phone className="size-3 text-emerald-400" />
                                <a href={`tel:${req.phone}`} className="hover:text-white hover:underline">
                                  {req.phone}
                                </a>
                              </span>
                            ) : null}

                            <span className="rounded bg-white/5 px-2 py-0.5 font-mono text-[11px] text-[#ffb454]">
                              {req.serviceType}
                            </span>

                            {req.budget ? (
                              <span className="rounded bg-white/5 px-2 py-0.5 font-mono text-[11px] text-zinc-300">
                                Budget: {req.budget}
                              </span>
                            ) : null}
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2">
                          {req.phone ? (
                            <a
                              href={`https://wa.me/${req.phone.replace(/[^0-9]/g, "")}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              title="Chat on WhatsApp"
                              className="flex size-8 items-center justify-center rounded-lg border border-emerald-500/20 bg-emerald-500/10 text-emerald-400 transition-colors hover:bg-emerald-500/20"
                            >
                              <MessageCircle className="size-4" />
                            </a>
                          ) : null}

                          <a
                            href={`mailto:${req.email}?subject=Regarding your project request`}
                            title="Reply via Email"
                            className="flex size-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-[#9199a5] transition-colors hover:text-white"
                          >
                            <Mail className="size-4" />
                          </a>

                          <select
                            value={req.status}
                            onChange={(e) =>
                              handleStatusChange(req.id, e.target.value as RequestStatus)
                            }
                            className="rounded border border-white/10 bg-[#0c0d0f] px-2 py-1 font-mono text-xs text-white focus:border-[#ffb454] focus:outline-none"
                          >
                            <option value="new">Mark: New</option>
                            <option value="in_review">Mark: In Review</option>
                            <option value="contacted">Mark: Contacted</option>
                            <option value="archived">Mark: Archived</option>
                          </select>

                          <button
                            onClick={() => handleDeleteRequest(req.id)}
                            title="Delete Request"
                            className="flex size-8 items-center justify-center rounded-lg border border-red-500/20 bg-red-500/10 text-red-400 transition-colors hover:bg-red-500/20"
                          >
                            <Trash2 className="size-4" />
                          </button>
                        </div>
                      </div>

                      {/* Message Content */}
                      <div className="mt-4 rounded-lg bg-[#0c0d0f] p-4 text-xs leading-relaxed text-[#e2e8f0] border border-white/5">
                        <p className="whitespace-pre-wrap">{req.message}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ) : null}

        {/* ---------------------------------------------------------------- */}
        {/* TAB 3: LINK CLICKS ANALYTICS */}
        {/* ---------------------------------------------------------------- */}
        {activeTab === "clicks" && summary ? (
          <div className="mt-8 space-y-6">
            <div>
              <h2 className="font-mono text-base font-bold text-white">Link & Action Clicks</h2>
              <p className="text-xs text-[#9199a5]">
                Real-time count of every link clicked on your portfolio
              </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-[#121418] overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="border-b border-white/10 bg-white/5 font-mono text-[11px] uppercase tracking-wider text-[#9199a5]">
                    <tr>
                      <th className="px-5 py-3">Link Label & Action</th>
                      <th className="px-5 py-3">Category</th>
                      <th className="px-5 py-3">Target URL</th>
                      <th className="px-5 py-3 text-right">Click Count</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 font-mono">
                    {summary.topClicks.map((click) => (
                      <tr key={click.url} className="hover:bg-white/5 transition-colors">
                        <td className="px-5 py-3.5 font-bold text-white">
                          {click.label}
                        </td>
                        <td className="px-5 py-3.5">
                          <span className="rounded bg-white/5 px-2 py-0.5 text-[10px] text-zinc-400">
                            {click.category}
                          </span>
                        </td>
                        <td className="px-5 py-3.5 text-[#9199a5] max-w-xs truncate">
                          <a
                            href={click.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-white hover:underline flex items-center gap-1"
                          >
                            <span>{click.url}</span>
                            <ArrowUpRight className="size-3 shrink-0" />
                          </a>
                        </td>
                        <td className="px-5 py-3.5 text-right font-bold text-[#ffb454]">
                          {click.count}
                        </td>
                      </tr>
                    ))}
                    {summary.topClicks.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="px-5 py-8 text-center text-[#9199a5]">
                          No link clicks tracked yet. Clicks on WhatsApp, GitHub, and Project links will appear here.
                        </td>
                      </tr>
                    ) : null}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : null}

        {/* ---------------------------------------------------------------- */}
        {/* TAB 4: RECENT VISITS STREAM */}
        {/* ---------------------------------------------------------------- */}
        {activeTab === "visits" && summary ? (
          <div className="mt-8 space-y-6">
            <div>
              <h2 className="font-mono text-base font-bold text-white">Live Visits Stream</h2>
              <p className="text-xs text-[#9199a5]">
                Chronological feed of the last 30 visits and their session duration
              </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-[#121418] overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="border-b border-white/10 bg-white/5 font-mono text-[11px] uppercase tracking-wider text-[#9199a5]">
                    <tr>
                      <th className="px-5 py-3">Page Path</th>
                      <th className="px-5 py-3">Locale</th>
                      <th className="px-5 py-3">Device</th>
                      <th className="px-5 py-3">Time Spent</th>
                      <th className="px-5 py-3">Referrer</th>
                      <th className="px-5 py-3 text-right">Timestamp</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 font-mono">
                    {summary.recentVisits.map((v) => (
                      <tr key={v.id} className="hover:bg-white/5 transition-colors">
                        <td className="px-5 py-3 text-white font-semibold">{v.path}</td>
                        <td className="px-5 py-3">
                          <span className="rounded bg-white/5 px-2 py-0.5 uppercase text-[10px] text-zinc-300">
                            {v.locale}
                          </span>
                        </td>
                        <td className="px-5 py-3 text-[#9199a5] capitalize">{v.device}</td>
                        <td className="px-5 py-3 font-semibold text-[#ffb454]">
                          {formatDuration(v.duration)}
                        </td>
                        <td className="px-5 py-3 text-[#9199a5] max-w-[12rem] truncate">
                          {v.referrer}
                        </td>
                        <td className="px-5 py-3 text-right text-[#9199a5]">
                          {new Date(v.timestamp).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                            second: "2-digit",
                          })}
                        </td>
                      </tr>
                    ))}
                    {summary.recentVisits.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="px-5 py-8 text-center text-[#9199a5]">
                          No visits recorded yet.
                        </td>
                      </tr>
                    ) : null}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : null}
      </main>
    </div>
  );
}
