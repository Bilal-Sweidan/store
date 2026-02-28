
import SettingHeader from "@/components/public/layout/headers/SettingHeader";
import Image from "next/image";

import image from "@/../public/1_pwZg281-0m4d4TmApYviQg.jpg";
import SettingsClient from "@/components/public/layout/SettingsClient";

export default function Setting() {
    return (
        <main className="bg-main min-h-screen pb-24">
            <div className="mx-auto max-w-md">
                {/* Top app bar */}
                <SettingHeader />

                {/* Profile hero */}
                <section className="px-4 pt-4">
                    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-sky-500 to-emerald-500 p-5 text-white shadow-xl">
                        <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/10 blur-2xl" />
                        <div className="pointer-events-none absolute bottom-0 right-0 h-28 w-28 rounded-full bg-black/10 blur-2xl" />

                        <div className="flex items-center gap-4">
                            <div className="relative h-16 w-16 overflow-hidden rounded-2xl border border-white/30 bg-white/10">
                                <Image
                                    src={image}
                                    alt="Profile"
                                    fill
                                    sizes="64px"
                                    className="object-cover"
                                />
                            </div>
                            <div>
                                <p className="text-xs uppercase tracking-[0.18em] text-indigo-100">
                                    Your account
                                </p>
                                <h1 className="mt-1 text-lg font-semibold leading-tight">
                                    Welcome back,
                                    <span className="font-bold"> Alex</span>
                                </h1>
                                <p className="text-[11px] text-indigo-100/90">
                                    Manage language, theme and preferences.
                                </p>
                            </div>
                        </div>

                        <div className="mt-4 grid grid-cols-3 gap-2 text-[11px]">
                            <div className="rounded-2xl bg-black/15 px-3 py-2 backdrop-blur-sm">
                                <p className="text-indigo-100/80">Orders</p>
                                <p className="mt-1 text-sm font-semibold">24</p>
                            </div>
                            <div className="rounded-2xl bg-black/15 px-3 py-2 backdrop-blur-sm">
                                <p className="text-indigo-100/80">Wishlist</p>
                                <p className="mt-1 text-sm font-semibold">18</p>
                            </div>
                            <div className="rounded-2xl bg-black/15 px-3 py-2 backdrop-blur-sm">
                                <p className="text-indigo-100/80">Points</p>
                                <p className="mt-1 text-sm font-semibold">1,250</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Settings cards */}
                <section className="px-4 mt-6 space-y-4 pb-4">
                    {/* Language & theme card */}
                    <SettingsClient />

                    {/* Account overview card (static for now) */}
                    <div className="rounded-2xl bg-card px-5 py-4 shadow-sm ring-1 ring-gray-100">
                        <h2 className="text-sm font-semibold text-primary">Account overview</h2>
                        <p className="mt-1 text-[11px] text-secondary">
                            Quick view of your account status and preferences.
                        </p>
                        <div className="mt-3 divide-y divide-gray-100 text-[11px] text-primary">
                            <div className="flex items-center justify-between py-2">
                                <span>Email verified</span>
                                <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-600">
                                    Active
                                </span>
                            </div>
                            <div className="flex items-center justify-between py-2">
                                <span>Push notifications</span>
                                <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-medium text-secondary">
                                    Coming soon
                                </span>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}