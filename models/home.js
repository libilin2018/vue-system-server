var mongoose = require("mongoose");
var homeSchema = new mongoose.Schema(
    {
        total: Number,
        jobs: Array
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Home", homeSchema);