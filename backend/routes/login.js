const express = require('express');
const router = express.Router();
const db = require('../db')

/* GET users listing. */
router.post('/', function (req, res, next) {
  db.query('select * from user', [], (response, fields) => {
    const data = req.body;
    let isFind = false;
    let uid = -1;
    response.forEach(item => {
      if (item.account == data.account && item.password == data.password) {
        uid = item.uid;
        isFind = true;
      }
    })
    if (isFind) {
      res.send({ status: 0, msg: "登陆成功", data: { uid } })
    } else {
      res.send({ status: 1, msg: "用户名或者密码错误", data: {} })
    }
  })
});

module.exports = router;
