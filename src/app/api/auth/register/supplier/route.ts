import { NextRequest, NextResponse } from "next/server";
// libs
import { connectToDatabase } from "@/lib/connectToDatabase";
import User from "@/models/User";
import { hash } from "@/lib/hashing.lib";

export async function POST(req: NextRequest) {
    try {
        await connectToDatabase()

        const reqBody = await req.json()
        const { tradeName, phone, email, address, password, termsAccepted } = reqBody

        console.log(reqBody)
        if (!termsAccepted) {
            return NextResponse.json({ message: "You should accepte the terms to create an account" }, { status: 403 })
        }

        const newUser = await User.create({
            ...reqBody,
            password: await hash(password)
        })

        return NextResponse.json({ message: "your request in process" }, { status: 201 })

    } catch (err: any) {
        console.log(err.message)
        return NextResponse.json({ message: err.message }, { status: 500 })
    }
}