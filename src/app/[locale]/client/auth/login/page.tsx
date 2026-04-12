"use client";
import { signIn } from "next-auth/react"; // ✅ always from "next-auth/react" in client
import { useState } from "react";
import Link from "next/link";
import { useParams, useRouter, useSearchParams } from "next/navigation";

const errorMessages: Record<string, string> = {
    CredentialsSignin: "Invalid email, password, or account not verified.",
    default: "Something went wrong. Please try again.",
};

export default function LoginPage() {
    const router = useRouter();
    const params = useParams<{ locale: string }>();
    const searchParams = useSearchParams();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        const callbackUrl =
            searchParams.get("callbackUrl") ??
            `/${params?.locale ?? "en"}/dashboard`;

        const result = await signIn("credentials", {
            email,
            password,
            redirect: false, // ✅ handle redirect manually
            callbackUrl,
        });

        setLoading(false);

        if (result?.error) {
            // ✅ map error code to friendly message
            const msg = errorMessages[result.error] ?? errorMessages.default;
            setError(msg);
            return;
        }

        if (result?.ok) {
            router.push(result.url ?? callbackUrl);
        }
    };

    return (
        <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="mb-6 text-center">
                    <h1 className="text-3xl font-bold text-slate-900">Welcome back</h1>
                    <p className="text-slate-500 mt-2">
                        Sign in to continue to your dashboard.
                    </p>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                    {error && (
                        <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700" htmlFor="email">
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                placeholder="name@company.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                autoComplete="email"
                                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-slate-900 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-slate-400"
                            />
                        </div>

                        <div className="space-y-2">
                            <label
                                className="text-sm font-medium text-slate-700"
                                htmlFor="password"
                            >
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                autoComplete="current-password"
                                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-slate-900 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-slate-400"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full rounded-xl bg-slate-900 px-4 py-2.5 font-semibold text-white hover:bg-slate-800 transition disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            {loading ? "Signing in..." : "Sign in"}
                        </button>
                    </form>

                    <div className="mt-5 flex items-center justify-between text-sm">
                        <span className="text-slate-500">Don’t have an account?</span>
                        <Link
                            href={`/${params?.locale ?? "en"}/client/auth/register`}
                            className="font-semibold text-slate-900 hover:underline"
                        >
                            Create account
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}