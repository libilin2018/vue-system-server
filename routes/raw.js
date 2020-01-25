var express = require('express');
var router = express.Router();
var Raw = require("../models/raw");

/* GET users listing. */
router.get('/', function(req, res, next) {
  const name = req.query.name
  const pageSize = req.query.pageSize ? req.query.pageSize : 30
  const page = req.query.page
  const query = Raw.findOne({name})
  query.select('jobs counts')
  query.exec((err, msg) => {
    if (err) {
      res.json({
        code: 444,
        message: err.message
      })
    } else {
      const skip = (page - 1) * pageSize
      const message = {
        counts: msg.counts,
        jobs: msg.jobs.slice(skip).slice(0, pageSize)
      }
      res.json({
        code: 20000,
        message
      })
    }
  })
});

router.get('/query', (req, res, next) => {
  const name = req.query.name
  const keyword = req.query.keyword
  const pageSize = req.query.pageSize
  const page = req.query.page
  const query = Raw.findOne({name})
  query.select('jobs')
  query.exec((err, msg) => {
    if (err) console.log(err)
    else {
      const queryRes = []
      msg.jobs.forEach((item, index) => {
        if (item.companyname.indexOf(keyword) > -1 || item.job.indexOf(keyword) > -1) {
          queryRes.push(item)
        }
      })
      const skip = (page - 1) * pageSize
      const message = {
        counts: queryRes.length,
        jobs: queryRes.slice(skip).slice(0, pageSize)
      }
      res.json({
        code: 20000,
        message
      })
    }
  })
})

router.get('/delete', (req, res, next) => {
  const name = req.query.name
  const id = req.query.id
  console.log(name, id)
  Raw.findOne({ name }, (err, doc) => {
    doc = doc.toObject()
    const jobs = []
    doc.jobs.forEach(item => {
      if ((item.jobId) !== id) {
        jobs.push(item)
      } else {
        console.log(true)
      }
    })
    const result = {
      name,
      counts: jobs.length,
      jobs: jobs,
      updateTime: doc.updateTime
    }
    Raw.update({name}, result, (err, doc) => {
      if (err) console.log(err)
      else {
        res.json({
          code: 20000,
          message: 'success'
        })
      }
    })
  })
})

module.exports = router;
