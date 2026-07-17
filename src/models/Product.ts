import mongoose, { Schema, model, models } from "mongoose";


const ProductSchema = new Schema({
    name: {
        ar: {
            type: String
        },
        en: {
            type: String
        }
    },
    description: {
        type: String,
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: "categoryProduct"
    },
    price: {
        withDiscount: {
            type: Number
        },
        withoutDiscount: {
            type: Number
        },
        old: {
            type: Number
        }
    },
    discount: {
        number: Number, // after 100 item
        value: Number // percent 14%
    },
    minAmount: {
        type: Number
    },
    details: [
        {
            key: {
                type: String
            },
            value: {
                type: String
            }
        }
    ],
    pictures: [{
        type: String
    }],
    transportationFees: {
        type: Number,    
    },
    transportationTime: {
        type: String,
        trim: true
    }
}, { timestamps: true })


export default models.Product || model("Product", ProductSchema)