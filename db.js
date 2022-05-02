const mongoose = require("mongoose");
const mongoUrl = `mongodb+srv://akash-mongo:process.env.MOGODB_PASS@cluster0.33mjx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const connectToMongo = async () => {
    mongoose.connect(mongoUrl, () => {
        console.log("Connect to the mongodb server");
    });
};
module.exports = connectToMongo;
