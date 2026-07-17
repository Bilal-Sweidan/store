import { NextResponse, type NextRequest } from "next/server"
import mongoose from "mongoose"

// Database
import Product from "@/models/Product"

// connect to db
import { connectToDatabase } from "@/lib/connectToDatabase"
export const GET = async (req: NextRequest, { params }: { params: { id: string } }) => {
    try {
        await connectToDatabase()
        const { id: productId } = await params

        console.log(productId)

        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return NextResponse.json({ message: "invalid product id " }, { status: 401 })
        }

        const product = await Product.findById(productId)

        if (!product) {
            return NextResponse.json({ message: "this product is not exict" }, { status: 404 })
        }

        return NextResponse.json({ product }, { status: 200 })
    } catch (err: any) {
        console.log(err.message)
        return NextResponse.json({ message: err.message }, { status: 500 })
    }
}