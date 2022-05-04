const mongoose = require("mongoose");
const { Schema } = mongoose;
const UserSchema = new Schema({
    email: {
        type: "string",
        required: true,
    },
});
const User = mongoose.model("user", UserSchema);
module.exports = User;
