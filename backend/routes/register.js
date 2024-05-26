const express = require('express');
const router = express.Router();
const db = require('../db')

router.post('/', function (req, res, next) {
  const { account, password } = req.body;
  db.query(`select * from user where account = '${account}'`, [], (response, fields) => {
    if (response.length != 0) {
      res.send({ status: 1, msg: "账户名已被注册" });
    } else {
      db.query(`insert into user(account,password,category,money) values ('${account}','${password}','ordinary',0.00)`, [], (response) => {
        res.send({ status: 0, msg: "注册成功", data: { uid: 4, account } });
      });
    }
  })
});

module.exports = router;
