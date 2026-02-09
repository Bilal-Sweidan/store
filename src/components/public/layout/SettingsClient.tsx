"use client"
// icons
import { Globe, Palette } from "lucide-react"
import DropdownList from "@/components/shared/input/DropdownList";
import { useTheme } from "@/context/ThemeContext";
import { Link } from "@/i18n/navigation";
import { usePathname } from "next/navigation";
import LanguageSwitcher from "@/components/shared/button/LangSwitcher";

export default function SettingsClient() {
    const { theme, setTheme } = useTheme()
    const pathname = usePathname()
    return (
        <>
            <div className="px-5 py-10 bg-card space-y-5">
                <nav className="flex gap-2 justify-between capitalize">
                    <div className="flex items-center gap-2 font-bold">
                        <Globe size={25} />
                        language
                    </div>
                    <LanguageSwitcher />
                </nav>

                <nav className="flex gap-2 justify-between capitalize">
                    <div className="flex items-center gap-2 font-bold capitalize">
                        <Palette size={25} />
                        Theme
                    </div>
                    <DropdownList
                        data={["dark", "light", "system"]}
                        selectedValue={theme}
                        onChange={setTheme}
                    />
                </nav>
            </div>
        </>
    )
}