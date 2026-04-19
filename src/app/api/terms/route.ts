import { connectToDatabase } from "@/lib/connectToDatabase";
import TermsModel from "@/models/Terms.model";
import { NextResponse, type NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
    try {
        await connectToDatabase();
        const forValue = req.nextUrl.searchParams.get('for')

        if (!forValue) {
            return NextResponse.json({ message: "please choose the type of people to get the right terms " }, { status: 402 })
        }

        if (forValue !== "client" && forValue !== "supplier") {
            return NextResponse.json({ message: "this type of accounts not exict !!!!! " }, { status: 402 })
        }
        const terms = await TermsModel.findOne({ for: forValue })

        if (!terms) {
            return NextResponse.json({ message: "there are no terms for this type of people !!!!!" }, { status: 404 })
        }

        return NextResponse.json(terms, { status: 200 })
    } catch (err: any) {
        return NextResponse.json({ message: err.message }, { status: 500 })
    }
}