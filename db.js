const mongoose = require("mongoose");
require("dotenv").config();
const mongoUrl = `mongodb+srv://${process.env.DB_USER}:${process.env.MOGODB_PASS}@cluster0.33mjx.mongodb.net/gudam-ghor?retryWrites=true&w=majority`;

const connectToMongo = async () => {
    try {
        mongoose.connect(
            mongoUrl,
            { useNewUrlParser: true, useUnifiedTopology: true },
            () => console.log("connected")
        );
    } catch (error) {
        console.log("could not connect");
    }
};
module.exports = connectToMongo;
