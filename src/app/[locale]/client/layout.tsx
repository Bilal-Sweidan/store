"use client"

import DesktopTab from "@/components/public/layout/DesktopTab";
import Tab from "@/components/public/layout/Tab";

export default function PublicLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <main className="bg-main sm:block xl:flex-col">
            {children}
            <Tab />
            <DesktopTab />
        </main>
    )
}