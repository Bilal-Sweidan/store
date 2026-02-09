"use client"

import Tab from "@/components/public/layout/Tab";

export default function PublicLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <main className="">
            <section className="">
                {children}
            </section>

            <div className="h-5 w-full text-white ">
                asd
            </div>
            <Tab />
        </main>
    )
}