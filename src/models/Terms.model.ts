import mongoose from "mongoose";
// import user model
import "@/models/User";

const TERMS_FOR = {
    0: "client",
    1: "supplier"
}
const TermsSchema = new mongoose.Schema({
    title: {
        ar: {
            type: String,
        },
        en: {
            type: String,
        }
    },
    describtion: {
        ar: {
            type: String,
            lowercase: true
        },
        en: {
            type: String,
            lowercase: true
        }
    },
    terms: [{
        title: {
            ar: {
                type: String
            },
            en: {
                type: String
            }
        },
        term: {
            ar: {
                type: String
            },
            en: {
                type: String
            }
        }
    }],
    for: {
        type: String,
        enum: Object.values(TERMS_FOR)
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, { timestamps: true })

export default mongoose.models.Terms || mongoose.model("Terms", TermsSchema)