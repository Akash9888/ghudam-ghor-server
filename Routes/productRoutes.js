const express = require("express");
const router = express.Router();
const Product = require("../Models/Product");
const ObjectId = require("mongodb").ObjectId;

const { body, validationResult } = require("express-validator");

//get Products
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

//read products
router.get("/fetch", async (req, res) => {
    const products = await Product.find({});

    try {
        res.send(products);
    } catch (e) {
        res.status(500).send(e);
    }
});

//find products by email

router.get("/filter/:email", async (req, res) => {
    const products = await Product.find(req.params);

    try {
        res.send(products);
    } catch (e) {
        res.status(500).send(e);
    }
});

//find product by id
router.get("/filter/single/:_id", async (req, res) => {
    console.log(req.params._id);
    const query = { _id: ObjectId(req.params._id) };
    console.log(query);

    const products = await Product.find(query);
    try {
        res.send(products);
    } catch (e) {
        res.status(500).send(e);
    }
});

//update product count
router.put("/update/:_id", async (req, res) => {
    const query = { _id: ObjectId(req.params._id) };
    console.log(query);
    console.log(req.body);

    try {
        await Product.findOneAndUpdate(query, req.body, { new: true });
        await Product.save();
    } catch (e) {
        res.status(500).send(e);
    }
});

//product delete
router.delete("/delete/:_id", async (req, res) => {
    const query = { _id: ObjectId(req.params._id) };
    try {
        console.log("delete");
        const result = await Product.findOneAndDelete(query);
        if (!result) res.status(404).send("No item found");
        res.status(200).send();
    } catch (e) {
        res.status(500).send(e);
    }
});

module.exports = router;
