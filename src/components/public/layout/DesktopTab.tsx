
import { ReactNode } from "react"
import { usePathname } from "next/navigation"
import { useLocale } from "next-intl"
import { useTranslations } from "use-intl"
import Link from "next/link"
import Image from "next/image"

// lucide icons
import { House, Settings, BaggageClaim, LayoutGrid, Heart, Divide, ShoppingCart } from "lucide-react"
// images
import logo from "@/../public/3D2.png"

// componenets
import ThemeSwitcher from "@/components/shared/button/ThemeSwitcher"
import LanguageSwitcher from "@/components/shared/button/LangSwitcher"
import CartButton from "../button/Cart"
import ProfileDropDown from "@/components/shared/drop/Profile"
import { useSession } from "next-auth/react"

export default function DesktopTab() {
    const t = useTranslations("Tab")
    const locale = useLocale()
    const pathname = usePathname()
    const { data: session } = useSession()

    const tabs = [
        { href: "/client", label: "home", icon: House },
        { href: "/client/favorit", label: "favorit", icon: Heart },
        { href: "/client/category", label: "category", icon: LayoutGrid },
        { href: "/client/cart", label: "cart", icon: BaggageClaim },
        { href: "/client/setting", label: "setting", icon: Settings },
    ]
    console.log(pathname)
    return (
        <nav className="w-full bg-header fixed top-0 py-3 px-5 flex justify-between align-center align-middle max-sm:hidden">
            <Link href={"/client"}>
                <Image src={logo} width={50} height={50} alt="Lorenze" />
            </Link>
            <nav className="flex gap-8 items-center">
                <div className="flex items-center gap-3">
                    <CartButton />
                    <ThemeSwitcher />
                    <LanguageSwitcher className="flex items-center" />
                </div>
                {
                    !session ? <Link href={'/client/auth/login'}>Log in</Link> :
                        <ProfileDropDown />
                }
            </nav>
            {/* {tabs.map(({ href, label, icon: Icon }) => {
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
            })} */}
        </nav>
    )
}