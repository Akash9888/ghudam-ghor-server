const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();
const User = require("../Models/User");
router.post(
    "/createuser",

    async (req, res) => {
        const user = new User(req.body);
        console.log(req.body);
        console.log(user);
        const accessToken = jwt.sign(req.body, process.env.JWT_SECRET, {
            expiresIn: "1d",
        });
        try {
            await user.save();
            res.send(accessToken);
        } catch (e) {
            res.status(500).send(e);
        }
    }
);
module.exports = router;
