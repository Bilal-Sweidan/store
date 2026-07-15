import { NextResponse, type NextRequest } from "next/server"

// models
import Product from "@/models/Product"

// connect to db
import { connectToDatabase } from "@/lib/connectToDatabase"

// middleware
import { withAdmin } from "@/middleware/authorize"

export const POST = withAdmin(async (req: NextRequest) => {
    try {
        await connectToDatabase()
        const body = await req.json()

        console.log(body)

        const newProduct = await Product.create(body)

        console.log(newProduct)

        return NextResponse.json({ message: "the Product successfuly added 👍", product: newProduct }, { status: 200 })

    }
    catch (err: any) {
        console.error(err.message)
        return NextResponse.json({ message: err.message }, { status: 500 })
    }
})

export const GET = async (req: NextRequest) => {
    try {
        await connectToDatabase()

        const products = await Product.find()

        console.log(products)

        return NextResponse.json({ products }, { status: 200 })
    } catch (err: any) {
        console.error(err.message)
        return NextResponse.json({ message: err.message }, { status: 500 })
    }
}