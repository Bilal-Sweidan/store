import { connectToDatabase } from "@/lib/connectToDatabase";
import Role from "@/models/Role";
import { NextResponse, type NextRequest } from "next/server";

import { withAdmin } from "@/middleware/authorize";

export const POST = withAdmin(async (req: NextRequest) => {
    try {
        await connectToDatabase()

        await Role.create({
            name: "admin"
        })

        return NextResponse.json({ message: "role has created" }, { status: 200 })
    } catch (err: any) {
        return NextResponse.json({ message: err.message }, { status: 200 })
    }
})