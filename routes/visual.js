var express = require('express');
var router = express.Router();
var Visual = require("../models/visual");

router.get('/', (req, res, next) => {
  res.send('visual')
})

router.get('/wash', (req, res, next) => {
  const name = req.query.name
  console.log(name)
  Visual.findOne({ name }, (err, doc) => {
    if (err) {
      res.json({code: 444, message: err.message})
    } else {
      if (doc) {
        res.json({
          code: 20000,
          message: doc
        })
      }
    }
  })
})



router.get('/map', (req, res, next) => {
  const name = req.query.name
  console.log(name)
  Visual.findOne({ name }, (err, doc) => {
    if (err) {
      res.json({code: 444, message: err.message})
    } else {
      if (doc) {
        res.json({
          code: 20000,
          message: doc.map
        })
      }
    }
  })
})

router.get('/requireTop10', (req, res, next) => {
  const name = req.query.name
  console.log(name)
  Visual.findOne({ name }, (err, doc) => {
    if (err) {
      res.json({code: 444, message: err.message})
    } else {
      if (doc) {
        res.json({
          code: 20000,
          message: doc.requireTop10
        })
      }
    }
  })
})

router.get('/education', (req, res, next) => {
  const name = req.query.name
  console.log(name)
  Visual.findOne({ name }, (err, doc) => {
    if (err) {
      res.json({code: 444, message: err.message})
    } else {
      if (doc) {
        res.json({
          code: 20000,
          message: doc.education
        })
      }
    }
  })
})

router.get('/workyear', (req, res, next) => {
  const name = req.query.name
  console.log(name)
  Visual.findOne({ name }, (err, doc) => {
    if (err) {
      res.json({code: 444, message: err.message})
    } else {
      if (doc) {
        res.json({
          code: 20000,
          message: doc.workyear
        })
      }
    }
  })
})

router.get('/companytype', (req, res, next) => {
  const name = req.query.name
  console.log(name)
  Visual.findOne({ name }, (err, doc) => {
    if (err) {
      res.json({code: 444, message: err.message})
    } else {
      if (doc) {
        res.json({
          code: 20000,
          message: doc.companytype
        })
      }
    }
  })
})

router.get('/companyscale', (req, res, next) => {
  const name = req.query.name
  console.log(name)
  Visual.findOne({ name }, (err, doc) => {
    if (err) {
      res.json({code: 444, message: err.message})
    } else {
      if (doc) {
        res.json({
          code: 20000,
          message: doc.companyscale
        })
      }
    }
  })
})

module.exports = router;
