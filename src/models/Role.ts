import mongoose from "mongoose";


const RoleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true
    }
})

export default mongoose.models.Role || mongoose.model("Role", RoleSchema)