"use client"
import { useLocale } from "next-intl";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { LayoutDashboard, User } from "lucide-react";

import logo from '../../../../public/3D2.png'
import { usePathname } from "next/navigation";
export default function Sidebar() {
    const pathname = usePathname()
    const locale = useLocale()

    const menuItems = [
        { label: "Dashboard", href: "/supplier", icon: LayoutDashboard },
        { label: "Users", href: "/supplier/user", icon: User }
    ];

    return (
        <aside
            className={`h-screen transition-all duration-300 flex flex-col justify-between w-[100px] border-r-2`}>
            <div>
                {/* Header */}
                <header className="flex items-center justify-center p-4">
                    <Image src={logo} width={60} alt="lorenze logo" />
                </header>

                {/* Menu */}
                <nav className="mt-6 justify-center space-y-2 px-3">
                    {menuItems.map(({ label, href, icon: Icon }) => {
                        const isActive = pathname === `/${locale}${href}`;

                        return (
                            <Link
                                key={label}
                                href={`/${locale}/${href}`}
                                className={`w-full gap-1 py-2 px-5 rounded-xl text-xs font-medium transition-all duration-200 flex flex-col justify-center items-center
                  ${isActive
                                        ? "bg-white text-slate-900 shadow-lg"
                                        : "hover:bg-slate-700"
                                    }`}
                            >
                                <Icon size={24} className="" />
                                <span className="">{label}</span>
                            </Link>
                        );
                    })}
                </nav>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-slate-700">
                <button className="w-full flex items-center justify-center py-3 rounded-xl text-sm font-medium hover:bg-red-500 hover:text-white transition-all duration-200">
                    <span>Logout</span>
                </button>
            </div>
        </aside>
    );
}
