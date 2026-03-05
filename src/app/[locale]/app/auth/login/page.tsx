"use client";

import { useState } from "react";

export default function LoginPage() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        setTimeout(() => {
            setLoading(false);
        }, 1200);
    };

    return (
        <main className="min-h-screen bg-neutral-100 flex flex-col justify-between">
            {/* Top Section (App Style Header) */}
            <div className="pt-16 px-6 pb-8">
                <h1 className="text-3xl font-semibold text-neutral-900">
                    Welcome Back 👋
                </h1>
                <p className="text-neutral-500 text-sm mt-2">
                    Sign in to continue
                </p>
            </div>

            {/* Bottom Sheet Style Card */}
            <div className="bg-white rounded-t-3xl shadow-xl px-6 pt-8 pb-10">
                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Email */}
                    <div>
                        <label className="text-sm text-neutral-600 block mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-4 rounded-2xl bg-neutral-100 border border-neutral-200 focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900/10 outline-none transition"
                            placeholder="you@example.com"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="text-sm text-neutral-600 block mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-4 rounded-2xl bg-neutral-100 border border-neutral-200 focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900/10 outline-none transition"
                            placeholder="••••••••"
                        />
                    </div>

                    {/* Forgot */}
                    <div className="text-right">
                        <button
                            type="button"
                            className="text-sm text-neutral-500 hover:text-neutral-900 transition"
                        >
                            Forgot Password?
                        </button>
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-4 rounded-2xl bg-neutral-900 text-white font-medium text-sm transition active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? "Signing in..." : "Sign In"}
                    </button>
                </form>

                {/* Divider */}
                <div className="my-8 flex items-center gap-4 text-neutral-400 text-xs">
                    <div className="flex-1 h-px bg-neutral-200" />
                    OR
                    <div className="flex-1 h-px bg-neutral-200" />
                </div>

                {/* Social Buttons */}
                <div className="space-y-3">
                    <button className="w-full py-4 rounded-2xl border border-neutral-200 bg-neutral-50 text-sm font-medium active:scale-[0.98]">
                        Continue with Google
                    </button>
                    <button className="w-full py-4 rounded-2xl border border-neutral-200 bg-neutral-50 text-sm font-medium active:scale-[0.98]">
                        Continue with Apple
                    </button>
                </div>

                {/* Sign Up */}
                <p className="text-center text-sm text-neutral-500 mt-8">
                    Don’t have an account?{' '}
                    <button className="text-neutral-900 font-medium">
                        Sign up
                    </button>
                </p>
            </div>
        </main>
    );
}
