var mongoose = require("mongoose");
var userSchema = new mongoose.Schema({
    username: String,
    password: String,
    token: String,
    info: Object
});

module.exports = mongoose.model("User", userSchema);