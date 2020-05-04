const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: String,
    socialId: String,
    imageURL: String,
});

// this creates a model
// it takes two parameter
// first is model name
// second is the structure of that model
const User = mongoose.model("user", userSchema);

module.exports = User;
