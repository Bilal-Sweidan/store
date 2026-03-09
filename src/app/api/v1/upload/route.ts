import type { NextApiRequest, NextApiResponse } from "next";
import cloudinary from "@/lib/cloudinary";
import multer from "multer";
import streamifier from "streamifier";

const storage = multer.memoryStorage();
const upload = multer({ storage });

function runMiddleware(req: any, res: any, fn: any) {
    return new Promise((resolve, reject) => {
        fn(req, res, (result: any) => {
            if (result instanceof Error) return reject(result);
            return resolve(result);
        });
    });
}

export const config = {
    api: {
        bodyParser: false,
    },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await runMiddleware(req, res, upload.single("file"));

    const file = (req as any).file;

    if (!file) {
        return res.status(400).json({ error: "No file uploaded" });
    }

    const streamUpload = () =>
        new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                { folder: "agency-documents" },
                (error, result) => {
                    if (result) resolve(result);
                    else reject(error);
                }
            );

            streamifier.createReadStream(file.buffer).pipe(stream);
        });

    try {
        const result: any = await streamUpload();

        res.status(200).json({
            url: result.secure_url,
            public_id: result.public_id,
        });
    } catch (error) {
        res.status(500).json({ error: "Upload failed" });
    }
}