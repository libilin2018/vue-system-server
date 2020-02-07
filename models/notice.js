var mongoose = require("mongoose");
var noticeSchema = new mongoose.Schema({
    time: String,
    publisher: String,
    content: String,
    reader: Array
});

module.exports = mongoose.model("Notice", noticeSchema);