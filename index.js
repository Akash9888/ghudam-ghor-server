const express = require("express");
const connectToMongo = require("./db");
var cors = require("cors");
const app = express();
app.use(express.json());
const port = process.env.PORT || 5000;

app.use(cors());
connectToMongo();

// app.get("/", (req, res) => {
//     res.send("Hello World!");
// });
//products route
app.use("/api/products", require("./Routes/productRoutes"));

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
