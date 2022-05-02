const express = require("express");
const router = express.Router();
const Product = require("../Models/Product");

//save Products

router.post("/add", (req, res) => {
    console.log(req.body);
    const product = Product(req.body);
    product.save();
    res.send(req.body);
});
module.exports = router;
