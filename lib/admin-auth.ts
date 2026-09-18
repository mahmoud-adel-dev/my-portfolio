import crypto from "crypto";
import { cookies } from "next/headers";

export const ADMIN_COOKIE_NAME = "portfolio_admin_session";

function getCredentials() {
  return {
    username: process.env.ADMIN_USERNAME || "admin",
    password: process.env.ADMIN_PASSWORD || "admin123456",
    secret: process.env.ADMIN_SESSION_SECRET || "mahmoud_adel_super_secure_key_2026",
  };
}

export function verifyAdminCredentials(user: string, pass: string): boolean {
  const { username, password } = getCredentials();
  return user === username && pass === password;
}

export function signToken(username: string): string {
  const { secret } = getCredentials();
  const timestamp = Date.now();
  const data = `${username}:${timestamp}`;
  const signature = crypto.createHmac("sha256", secret).update(data).digest("hex");
  return `${data}:${signature}`;
}

export function verifyToken(token?: string): boolean {
  if (!token) return false;
  const parts = token.split(":");
  if (parts.length !== 3) return false;

  const [username, timestampStr, signature] = parts;
  if (!username || !timestampStr || !signature) return false;

  const timestamp = parseInt(timestampStr, 10);
  if (isNaN(timestamp)) return false;

  // Max session age: 14 days
  const maxAge = 14 * 24 * 60 * 60 * 1000;
  if (Date.now() - timestamp > maxAge) return false;

  const { secret, username: expectedUser } = getCredentials();
  if (username !== expectedUser) return false;

  const expectedSignature = crypto
    .createHmac("sha256", secret)
    .update(`${username}:${timestampStr}`)
    .digest("hex");

  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature));
}

export async function isAuthenticatedAdmin(): Promise<boolean> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  return verifyToken(sessionCookie);
}
