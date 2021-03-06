const mongoose = require("mongoose");
const { Schema } = mongoose;
const ProductSchema = new Schema({
    productName: {
        type: "string",
        required: true,
    },
    description: {
        type: "string",
        required: true,
    },
    price: {
        type: "number",
        required: true,
    },
    quantity: {
        type: "number",
        required: true,
    },
    quantity: {
        type: "number",
        required: true,
    },

    email: {
        type: "string",
        required: true,
    },
    photo: {
        type: "string",
        required: true,
    },
    supplier: {
        type: "string",
        required: true,
    },
});
const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;
