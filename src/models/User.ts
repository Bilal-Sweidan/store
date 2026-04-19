import mongoose, { Schema, model, models } from "mongoose";
import "@/models/Role";
import { unique } from "next/dist/build/utils";

export const USER_ACTIVE_STATUS = {
    0: "pending",
    1: "rejected",
    2: "verified"
}

const USER_ROLES = {
    0: "client",
    1: "supplier",
    2: "admin"
}

const UserSchema = new Schema({
    tradeName: {
        type: String,
        required: true,
        trim: true
    },
    phone: {
        Number: String,
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        select: false,
        required: true
    },
    logo: {
        type: String,
    },
    address: {
        type: String,
        trim: true
    },
    status: {
        active: {
            type: String,
            enum: Object.values(USER_ACTIVE_STATUS),
            default: USER_ACTIVE_STATUS[0]
        },
        reviewedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        reviewedAt: {
            type: Date,
            default: new Date()
        },
        note: {
            type: String,
        },
        reason: {
            type: String,
        }
    },
    role: {
        type: String,
        enum: Object.values(USER_ROLES),
        default: USER_ROLES[0],
        unique: true,
        lowercase: true
    },
    createdAt: {
        type: Number,
        default: () => Date.now()
    },
    updatedAt: {
        type: Number,
    }
})

// geospatial index
UserSchema.index({ location: "2dsphere" });


export default models.User || model("User", UserSchema)