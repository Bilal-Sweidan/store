"use client"
import LanguageSwitcher from "@/components/shared/button/LangSwitcher";
import ThemeSwitcher from "@/components/shared/button/ThemeSwitcher";
import { SunMedium } from "lucide-react";
import { useTheme } from "next-themes";
export default function DashboardHeader() {

    return (
        <header className="w-full dark:text-white p-4 flex justify-between align-center border-b-2 ">
            <div className="text-[20px]">
                Lorenze
            </div>
            <div className="flex justify-center align-center gap-3 ">
                <ThemeSwitcher />
                <LanguageSwitcher />
            </div>
        </header>
    )
}