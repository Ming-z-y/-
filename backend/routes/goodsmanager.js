const express = require('express');
const router = express.Router();
const db = require('../db')

/* GET users listing. */
router.get('/', function (req, res, next) {
  if (req.query.keyword == '' || req.query.keyword == null) {
    db.query('select * from goods', [], (response) => {
      res.send(response)
    })
  } else if (req.query.keyword != '') {
    const key = req.query.keyword;
    db.query(`select * from goods where name like '${key}%'`, [], (response) => {
      res.send(response)
    })
  }
});

router.get('/total_and_sell', function (req, res) {
  db.query('select name, total_number, buy_number from goods', [], (response) => {
    const resdata = {};
    response.map((item) => {
      for (let key in item) {
        if (resdata.hasOwnProperty(key)) {
          resdata[key].push(item[key])
        } else {
          resdata[key] = []
        }
      }
    })
    res.send({ status: 0, data: { resdata } })
  })
})

module.exports = router;
