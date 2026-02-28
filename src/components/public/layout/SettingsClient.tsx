"use client"
// icons
import { Globe, Palette } from "lucide-react"

// language
import { useTranslations } from "next-intl";
// component
import LanguageSwitcher from "@/components/shared/button/LangSwitcher";
import ThemeSwitcher from "@/components/shared/button/ThemeSwitcher";

export default function SettingsClient() {
    const t = useTranslations("SettingPage")
    return (
        <div className="px-5 pt-20 py-10 mx-5 mt-25 bg-card space-y-5 border-3 border-[#E2E8F0] rounded-2xl min-h-100">
            <nav className="flex gap-2 justify-between capitalize">
                <div className="flex items-center gap-2 font-bold">
                    <Globe size={25} />
                    {t("language")}
                </div>
                <LanguageSwitcher />
            </nav>

            <nav className="flex gap-2 justify-between capitalize">
                <div className="flex items-center gap-2 font-bold capitalize">
                    <Palette size={25} />
                    {t("theme")}
                </div>
                <ThemeSwitcher />
            </nav>
        </div>
    )
}