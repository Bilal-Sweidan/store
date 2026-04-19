import { connectToDatabase } from "@/lib/connectToDatabase";
import { withAdmin } from "@/middleware/authorize";
import User from "@/models/User";
import { NextResponse, type NextRequest } from "next/server";

export const GET = withAdmin(async (req: NextRequest) => {
    try {
        await connectToDatabase()
        const users = await User.find()
        return NextResponse.json(users, { status: 200 })
    } catch (err: any) {
        return NextResponse.json({ message: err.message }, { status: 500 })
    }
})