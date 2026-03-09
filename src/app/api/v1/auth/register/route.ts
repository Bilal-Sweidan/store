import { NextResponse } from "next/server";
import { NextApiResponse, NextApiRequest } from "next";

// libs
import { connectToDatabase } from "@/lib/connectToDatabase";
export async function POST(req: NextApiRequest) {
    try {
        await connectToDatabase()

        const reqBody = req.body()
        const { tradeName, } = reqBody

    } catch (err: any) {
        return NextResponse.json({ message: err.message }, { status: 500 })
    }

}