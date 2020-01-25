var mongoose = require("mongoose");
var visualSchema = new mongoose.Schema({
    name: String,
    total: Number,
    valid: Number,
    updateTime: String,
    map: Object,
    requireTop10: Object,
    education: Object,
    workyear: Object,
    companytype: Object,
    companyscale: Object,

});

module.exports = mongoose.model("Visual", visualSchema);