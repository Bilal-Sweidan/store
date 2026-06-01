import { NextRequest, NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"]
const MAX_SIZE_MB = 10

export async function POST(req: NextRequest) {
    const formData = await req.formData()
    const file = formData.get("file") as File


    // validate 
    if (!file)
        return NextResponse.json({ message: "No File Prodided !!" }, { status: 400 })

    if (!ALLOWED_TYPES.includes(file.type))
        return NextResponse.json({ message: "Invalide file type !!" }, { status: 400 })

    if (file.size > MAX_SIZE_MB * 1024 * 1024)
        return NextResponse.json({ message: "File too large " }, { status: 400 })


    //  upload
    const buffer = Buffer.from(await file.arrayBuffer());
    const base64 = `data:${file.type};base64,${buffer.toString("base64")}`;

    const result = await cloudinary.uploader.upload(base64, {
        folder: "LORENZE/USER/PRODUCTS",
        transformation: [
            { width: 400, height: 400, crop: "fill" },
            { quality: "auto", fetch_format: "auto" }
        ]
    })

    // return only what the client needs
    return NextResponse.json({
        url: result.secure_url,
        puplicId: result.public_id
    })
}
