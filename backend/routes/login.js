const express = require('express');
const router = express.Router();
const db = require('../db')

router.post('/', function (req, res, next) {
  db.query('select * from user', [], (response, fields) => {
    const data = req.body;
    const { account: acc, password: psw } = data;
    if (data.channel == 'admin') {
      db.query(`select * from user where uid = 1`, [], (resp) => {
        const { account, password, money } = resp[0];
        if (acc == account && psw == password) {
          res.send({ status: 0, msg: "登陆成功", data: { uid: resp.uid, account, money } })
        } else {
          res.send({ status: 1, msg: "用户名或者密码错误", data: {} })
        }
      })
    } else {
      let isFind = false;
      let uid = -1;
      let account = '';
      let money = 0;
      response.forEach(item => {
        if (item.account == acc && item.password == psw) {
          uid = item.uid;
          account = item.account;
          isFind = true;
          money = item.money;
        }
      })
      if (isFind) {
        res.send({ status: 0, msg: "登陆成功", data: { uid, account, money } })
      } else {
        res.send({ status: 1, msg: "用户名或者密码错误", data: {} })
      }
    }
  })
});

module.exports = router;
