var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");
var qiniu = require('qiniu')

// var User = require("../models/users");

//连接MongoDB数据库
mongoose.connect('mongodb://127.0.0.1:27017/visual-system', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on("connected", function() {
    console.log("MongoDB connected success.")
});

mongoose.connection.on("error", function() {
    console.log("MongoDB connected fail.")
});

mongoose.connection.on("disconnected", function() {
    console.log("MongoDB connected disconnected.")
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/token', (req, res, next) => {
    const accessKey = 'lWmw26YUDMtgxsJnirmQ6mRVQsaJnFT5fsKQscuh'
    const secretKey = 'OhjpVwAobJsaUv9z_OhtXSbwbQgQbybA6R9ZhA60'
    const mac = new qiniu.auth.digest.Mac(accessKey, secretKey)
    const options = {
        scope: 'vue-visual-system',
        expires: 7200
    }
    const putPolicy = new qiniu.rs.PutPolicy(options)
    const uploadToken = putPolicy.uploadToken(mac)
    res.json({
        code: 20000,
        message: uploadToken
    })
})

module.exports = router;
