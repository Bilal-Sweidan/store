"use client"
import { useLocale } from "next-intl";
import Link from "next/link";
import { useState } from "react";

import { usePathname } from "next/navigation";
export default function Sidebar() {
const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname()
  const locale = useLocale()

  const menuItems = [
    { label: "Dashboard" , href: "/dashboard" },
    { label: "Users" ,  href: "/dashboard/user"},
    { label: "Analytics" , href: "/dashboard/analytic" },
    { label: "Settings" , href: "/dashboard/setting"},
  ];

  return (
    <aside
      className={`h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white transition-all duration-300 flex flex-col justify-between ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      <div>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-700">
          {!collapsed && (
            <h1 className="text-xl font-bold tracking-wide">AdminPro</h1>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-2 rounded-lg hover:bg-slate-700 transition"
          >
            {collapsed ? (
              <span>»</span>
            ) : (
              <span>«</span>
            )}
          </button>
        </div>

        {/* Menu */}
        <nav className="mt-6 space-y-2 px-3">
          {menuItems.map((item) => {
          const isActive = pathname === `/${locale}${item.href}`;
            
            return (
              <Link
                key={item.label}
                href={`/${locale}/${item.href}`}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-white text-slate-900 shadow-lg"
                    : "hover:bg-slate-700"
                }`}
              >
                {/* Simple Dot Icon */}
                <span className="w-2 h-2 bg-current rounded-full"></span>

                {!collapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-slate-700">
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium hover:bg-red-500 hover:text-white transition-all duration-200">
          <span className="w-2 h-2 bg-current rounded-full"></span>
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
}
