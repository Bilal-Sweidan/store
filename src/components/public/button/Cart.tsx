
import Link from "next/link"
// icons
import { House, Settings, ShoppingCart, LayoutGrid, Heart, Divide } from "lucide-react"


export default function CartButton() {

    return (
        <Link href={"/client/cart"}>
            <ShoppingCart className="hover:cursor-pointer flex items-center scale-x-[-1]" />
        </Link>
    )
}