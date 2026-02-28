"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { House, Settings, BaggageClaim, LayoutGrid, Heart, Divide } from "lucide-react"
import { useTranslations, useLocale } from "next-intl"


export default function MobileTabs() {
    const t = useTranslations("Tab")
    const locale = useLocale()
    console.log(locale)
    const pathname = usePathname()
    const tabs = [
        { href: "/app", label: "home", icon: House },
        { href: "/app/favorit", label: "favorit", icon: Heart },
        { href: "/app/category", label: "category", icon: LayoutGrid },
        { href: "/app/cart", label: "cart", icon: BaggageClaim },
        { href: "/app/setting", label: "setting", icon: Settings },
    ]

    return (
        <nav className="w-full flex py-1 fixed bottom-0 border-t-2 border-[#E2E8F0] bg-white none">
            {tabs.map(({ href, label, icon: Icon }) => {
                const active = pathname === `/${locale}${href}`
                console.log(pathname, `/${locale}${href}`)
                return (
                    <Link
                        key={`/${locale}/${href}`}
                        href={`/${locale}/${href}`}
                        className={`flex flex-col items-center justify-center flex-1 py-2 hover:scale-110
                            ${active ? "text-blue-900 pb-3" : "text-gray-500"}
                        `}
                    >
                        <Icon size={25} className="" />
                        <span className={`text-xs mt-1 font-bold capitalize ${active ? "text-blue-900" : "text-gray-500"}`} >{t(label)}</span>
                    </Link>
                )
            })}
        </nav>
    )
}
