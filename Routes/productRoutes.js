const express = require("express");
const router = express.Router();
const Product = require("../Models/Product");

const { body, validationResult } = require("express-validator");

//save Products
router.post(
    "/add",
    [
        body("productName", "Product name must be a string").isString(),
        body("description", "Product description must be a string").isString(),
        body("price", "Product price must be a number").isInt(),
        body("quantity", "Product quantity must be a number").isInt(),
        body("photo", "Enter valid product photo url").isURL(),
        body("supplier", "Supplier name must be a string").isString(),
    ],
    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const product = new Product(req.body);
        try {
            await product.save();
            res.send(product);
        } catch (e) {
            res.status(500).send(e);
        }
    }
);
module.exports = router;
