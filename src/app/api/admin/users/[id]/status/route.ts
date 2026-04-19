import { withAdmin } from "@/middleware/authorize";
import User from "@/models/User";
import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod"
import { USER_ACTIVE_STATUS } from "@/models/User";
import { auth } from "@/auth";
// validation Schema
const adminActionSchema = z.object({
    action: z.enum(['accept', 'reject']),
    reason: z.string().optional(),
    note: z.string().optional()
})


export const PATCH = withAdmin(async (req: NextRequest, { params }: { params: userId: string }) => {
    try {
        const userId = params.id
        const body = await req.json()
        const validation = adminActionSchema.safeParse(body)


        const session = await auth()
        const admin = session?.user

        if (!validation.success) {
            return NextResponse.json({
                message: `Invalide request : ${validation.error.errors}`,
            }, { status: 400 })
        }


        const { action, reason, note } = validation.data

        const user = await User.findById(userId)
        if (!user) {
            return NextResponse.json({
                message: "user not found"
            }, { status: 404 })
        }

        if (user.active !== "pending") {
            return NextResponse.json({
                message: "this user is already active"
            }, { status: 400 })
        }

        // const newStatus = "verified" | "rejected"
        if (action === 'accept') {
            await User.findByIdAndUpdate(userId, {
                status: {
                    active: USER_ACTIVE_STATUS[2],
                    reviewedBy: admin?.id,
                    reviewedAt: Date.now(),
                }
            })
        } else if (action === 'reject') {
            await User.findByIdAndUpdate(userId, {
                status: {
                    active: USER_ACTIVE_STATUS[1],
                    reviewedBy: admin?.id,
                    reviewedAt: Date.now(),
                    reason,
                    note
                }
            })
        }

        return NextResponse.json({ message: "The user has updated 👍" }, { status: 200 })

    } catch (err: any) {
        return NextResponse.json({ message: err.message }, { status: 500 })
    }
})