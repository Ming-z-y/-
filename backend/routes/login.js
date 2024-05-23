const express = require('express');
const router = express.Router();
const db = require('../db')

/* GET users listing. */
router.post('/', function (req, res, next) {
  db.query('select * from user', [], (response, fields) => {
    const data = req.body;
    if (response[0].account == data.account && response[0].password == data.password) {
      res.send({ status: 0, msg: "登陆成功", data: {} })
    } else {
      res.send({ status: 1, msg: "用户名或者密码错误", data: {} })
    }
  })
});

module.exports = router;
