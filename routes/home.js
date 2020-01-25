var express = require('express');
var router = express.Router();
var Home = require("../models/home");

router.get('/', (req, res, next) => {
  Home.findOne({}, (err, doc) => {
    if (err) {
      res.json({
        code: 444,
        message: err.message
      })
    } else {
      if(doc) {
        res.json({
          code: 20000,
          message: doc
        })
      }
    }
  })
})

module.exports = router;
