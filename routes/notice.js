var express = require('express');
var router = express.Router();
var Notice = require("../models/notice");

router.get('/', (req, res, next) => {
  Notice.find((err, notices) => {
    if (err) console.log(err)
    else {
      res.json({
        code: 20000,
        message: notices
      })
    }
  })
})

router.get('/read', (req, res, next) => {
  const id = req.query.id
  const username = req.query.username
  Notice.findByIdAndUpdate(id, {'$addToSet': {'reader': username}}, (err, doc) => {
    if (err) console.log(err)
    else {
      res.json({
        code: 20000,
        message: doc
      })
    }
  })
})

router.post('/publish', (req, res, next) => {
  const time = req.body.time
  const publisher = req.body.publisher
  const content = req.body.content
  const notice = new Notice({
    time,
    publisher,
    content,
    reader: []
  })
  notice.save((err, doc) => {
    if (err) console.log(err)
    else {
      res.json({
        code: 20000,
        message: doc
      })
    }
  })
})

router.get('/delete', (req, res, next) => {
  const id = req.query.id
  Notice.findByIdAndRemove(id, (err, doc) => {
    if (err) console.log(err)
    else {
      res.json({
        code: 20000,
        message: doc
      })
    }
  })
})

module.exports = router;
