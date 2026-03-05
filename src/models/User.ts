import mongoose, { Schema, model, models } from "mongoose";

const USER_ACTIVE_STATUS = {
    0: "pending",
    1: "rejected",
    2: "verified"
}
const UserSchema = new Schema({
    companyName: {
        type: String,
        required: true,
        trim: true
    },
    manager: {
        name: {
            type: String,
            required: true
        },
        contact: {
            email: String,
            Number: String,
            prefix: {
                type: String,
                default: "963"
            }
        }
    },
    email: {
        type: String,
        required: true
    },
    address: {
        type: String,
        trim: true
    },
    agencyStatement: {
        type: String,
    },
    commercialRegister: {
        type: String,
        trim: true,
        required: true
    },
    termsAccepted: {
        type: Boolean,
        default: false,
        required: true
    },
    location: {
        type: {
            type: String,
            enum: ["Point"],
            required: true,
            default: ["Point"]
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    active: {
        type: String,
        enum: Object.values(USER_ACTIVE_STATUS),
        default: USER_ACTIVE_STATUS[0]
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