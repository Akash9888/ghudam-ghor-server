const express = require("express");
const connectToMongo = require("./db");
var cors = require("cors");
const app = express();
app.use(express.json());
const port = process.env.PORT || 5000;

app.use(cors());
connectToMongo();

//products route
app.use("/api/products", require("./Routes/productRoutes"));

//users route
app.use("/api/users", require("./Routes/UserRoutes"));

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
