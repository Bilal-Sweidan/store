"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { House, Settings, BaggageClaim, LayoutGrid, Heart, Divide } from "lucide-react"
import { useTranslations } from "next-intl"


export default function MobileTabs() {
    const t = useTranslations("Tab")
    const pathname = usePathname()
    const tabs = [
        { href: "/app", label: "home", icon: House },
        { href: "/app/favorit", label: "favorit", icon: Heart },
        { href: "/app/category", label: "category", icon: LayoutGrid },
        { href: "/app/cart", label: "cart", icon: BaggageClaim },
        { href: "/app/setting", label: "setting", icon: Settings },
    ]

    return (
        <nav className="w-full flex py-3 fixed bottom-0">
            {tabs.map(({ href, label, icon: Icon }) => {
                const active = pathname === href
                return (
                    <Link
                        key={href}
                        href={href}
                        className={`flex flex-col items-center justify-center flex-1 py-2
                            ${active ? "text-blue-900" : "text-gray-500"}
                        `}
                    >
                        <Icon size={25} />
                        <span className="text-xs mt-1 font-bold capitalize">{t(label)}</span>
                    </Link>
                )
            })}
        </nav>
    )
}
