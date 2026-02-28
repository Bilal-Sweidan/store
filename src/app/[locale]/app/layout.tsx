"use client"

import Tab from "@/components/public/layout/Tab";

export default function PublicLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <main className="bg-main sm:block">
            <section className="">
                {children}
            </section>
            <Tab />
        </main>
    )
}