import mongoose from "mongoose";
const schema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter Name"],
    },
    photo: {
        type: String,
        required: [true, "Please ENter Photo"]
    },
    price: {
        type: Number,
        required: [true, "Please Enter price"],
    },
    stock: {
        type: Number,
        required: [true, "Please Enter Stock"],
    },
    category: {
        type: String,
        required: [true, "Please ENTer Category"],
    },
}, {
    timestamps: true,
});
export const Product = mongoose.model("Product", schema);
