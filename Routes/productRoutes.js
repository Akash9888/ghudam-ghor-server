const express = require("express");
const router = express.Router();
const Product = require("../Models/Product");
const ObjectId = require("mongodb").ObjectId;

const { body, validationResult } = require("express-validator");
const verifyJwt = require("../Middleware/VerifyJwt");

//add Products
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

//fetch all products
router.get("/fetch", verifyJwt, async (req, res) => {
    const products = await Product.find();
    try {
        res.send(products);
    } catch (e) {
        res.status(500).send(e);
    }
});

//fetch products for home section
router.get("/fetch/home", verifyJwt, async (req, res) => {
    const products = await Product.find({}).limit(6);

    try {
        res.send(products);
    } catch (e) {
        res.status(500).send(e);
    }
});
//all products count
// router.get("/fetch/count", verifyJwt, async (req, res) => {
//     console.log("-----------------------");
//     // const products = await Product.estimatedDocumentCount().exec();

//     Product.countDocuments({}).exec((err, count) => {
//         if (err) {
//             res.send(err);
//             return;
//         }

//         res.json({ count: count });
//     });

//     // console.log(products);

//     // try {
//     //     res.send(products);
//     // } catch (e) {
//     //     console.log("err");
//     //     res.status(500).send(e);
//     // }
// });

//find products by email
router.get("/filter/:email", verifyJwt, async (req, res) => {
    try {
        const products = await Product.find(req.params);

        res.send(products);
    } catch (e) {
        res.status(500).send(e);
    }
});

//find product by id
router.get("/filter/single/:_id", verifyJwt, async (req, res) => {
    const query = { _id: ObjectId(req.params._id) };

    const products = await Product.find(query);
    try {
        res.send(products);
    } catch (e) {
        res.status(500).send(e);
    }
});

//update product
router.put("/update/:_id", async (req, res) => {
    const query = { _id: ObjectId(req.params._id) };

    Product.findOneAndUpdate(
        query,
        req.body,
        { upsert: true },
        function (err, doc) {
            if (err) return res.send(500, { error: err });
            return res.send("Succesfully saved.");
        }
    );
});

//product delete
router.delete("/delete/:_id", verifyJwt, async (req, res) => {
    const query = { _id: ObjectId(req.params._id) };
    try {
        const result = await Product.findOneAndDelete(query);
        if (!result) res.status(404).send("No item found");
        res.status(200).send();
    } catch (e) {
        res.status(500).send(e);
    }
});

module.exports = router;
