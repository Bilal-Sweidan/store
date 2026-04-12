import mongoose from "mongoose";
// import user model
import "@/models/User";

const SupplierTermsSchema = new mongoose.Schema({
    name: {
        type: String
    },
    terms: [{
        title: {
            type: String
        },
        term: {
            type: String
        }
    }],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
},{timestamps: true})

export default mongoose.models.SupplierTerms || mongoose.model("SupplierTerms", SupplierTermsSchema)