"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, KeyRound, Loader2, Lock, ShieldCheck, User } from "lucide-react";
import Link from "next/link";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Authentication failed");
      }

      router.push("/admin");
      router.refresh();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Invalid credentials";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-2 font-mono text-xs text-[#9199a5] transition-colors hover:text-[#f3f4f5]"
        >
          <ArrowLeft className="size-3.5" />
          <span>Return to Portfolio</span>
        </Link>

        <div className="rounded-xl border border-white/10 bg-[#121418] p-8 shadow-2xl backdrop-blur-md">
          <div className="flex items-center justify-between border-b border-white/10 pb-5">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-lg border border-[#ffb454]/30 bg-[#ffb454]/10 text-[#ffb454]">
                <ShieldCheck className="size-5" />
              </div>
              <div>
                <h1 className="font-mono text-base font-bold text-[#f3f4f5]">Portfolio Admin</h1>
                <p className="text-xs text-[#9199a5]">Authorized personnel only</p>
              </div>
            </div>
            <span className="rounded bg-emerald-500/10 px-2 py-1 font-mono text-[10px] text-emerald-400">
              Secure
            </span>
          </div>

          {error ? (
            <div className="mt-5 rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-xs text-red-400">
              {error}
            </div>
          ) : null}

          <form onSubmit={handleLogin} className="mt-6 space-y-4">
            <div>
              <label className="mb-1.5 block font-mono text-xs uppercase tracking-wider text-[#9199a5]">
                Username
              </label>
              <div className="relative">
                <User className="absolute start-3 top-2.5 size-4 text-[#9199a5]" />
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin"
                  className="w-full rounded-lg border border-white/10 bg-[#0c0d0f] ps-10 pe-3 py-2.5 text-sm text-[#f3f4f5] placeholder:text-[#9199a5]/50 focus:border-[#ffb454] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block font-mono text-xs uppercase tracking-wider text-[#9199a5]">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute start-3 top-2.5 size-4 text-[#9199a5]" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full rounded-lg border border-white/10 bg-[#0c0d0f] ps-10 pe-3 py-2.5 text-sm text-[#f3f4f5] placeholder:text-[#9199a5]/50 focus:border-[#ffb454] focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-[#ffb454] py-2.5 font-mono text-xs font-bold uppercase tracking-wider text-[#241300] transition-colors hover:bg-[#ffc879] disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  <span>Verifying...</span>
                </>
              ) : (
                <>
                  <KeyRound className="size-4" />
                  <span>Sign In to Dashboard</span>
                </>
              )}
            </button>
          </form>

          <div className="mt-6 border-t border-white/5 pt-4 text-center">
            <p className="text-[11px] text-[#9199a5]">
              Credentials configured via <code className="rounded bg-black/40 px-1.5 py-0.5 font-mono text-[#ffb454]">.env</code> (ADMIN_USERNAME & ADMIN_PASSWORD)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
