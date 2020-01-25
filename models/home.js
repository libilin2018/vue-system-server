var mongoose = require("mongoose");
var homeSchema = new mongoose.Schema({
    total: Number,
    jobs: Array
});

module.exports = mongoose.model("Home", homeSchema);