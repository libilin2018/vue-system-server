var mongoose = require("mongoose");
var rawSchema = new mongoose.Schema({
    name: String,
    counts: Number,
    jobs: Array,
    updateTime: String
});

module.exports = mongoose.model("Raw", rawSchema);