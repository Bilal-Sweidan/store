
import { EllipsisVertical, User } from "lucide-react"
export default function MainHeader() {
    return (
        <header className="m-1 flex justify-between p-[15px]">
            <EllipsisVertical />
            <User />
        </header>
    )
}