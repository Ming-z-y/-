const express = require('express');
const router = express.Router();
const db = require('../db')

/* GET users listing. */
router.get('/', function (req, res, next) {
  if (((req.query.keyword == '' || req.query.keyword == null) && (req.query.category == null || req.query.category == '')) || req.query.category == '全部') {
    db.query('select * from goods', [], (response) => {
      res.send(response)
    })
  } else if (req.query.keyword != '' && req.query.keyword != null) {
    const key = req.query.keyword;
    db.query(`select * from goods where locate("${key}",name)>0`, [], (response) => {
      res.send(response)
    })
  } else if (req.query.category != '' || req.query.category != null) {
    const category = req.query.category;
    db.query(`select * from goods where category = '${category}'`, [], (response) => {
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

router.get('/category', function (req, res) {
  db.query('select distinct category from goods', [], (response) => {
    const resdata = [];
    response.forEach(item => {
      resdata.push(item.category)
    })
    res.send({ resdata })
  })
})

router.post('/add', function (req, res) {
  const { uid, gid, g_number } = req.body;
  db.query(`select * from cart where uid = ${uid} AND gid = ${gid}`,
    [], (response) => {
      if (response.length == 0 && g_number > 0) {
        db.query(`insert into cart values (${uid},${gid},${g_number})`)
        res.send({ status: 0, msg: "操作成功" })
      } else {
        const rest_number = response[0].g_number + g_number;
        if (rest_number == 0) {
          db.query(`delete from cart where uid = ${uid} AND gid = ${gid}`)
          res.send({ status: 0, msg: "操作成功" })
        } else {
          db.query(`update cart set g_number = ${rest_number}
          where uid = ${uid} AND gid = ${gid}`)
          res.send({ status: 0, msg: "操作成功" })
        }
      }
    }
  )
})

router.post('/deletecart', function (req, res) {
  const { uid, gid } = req.body;
  db.query(`delete from cart where uid = ${uid} AND gid = ${gid}`, [], (response) => {
    res.send({ status: 0, msg: "操作成功" });
  })
})

router.post('/getcart', function (req, res) {
  const { uid } = req.body;
  db.query(`select gid,g_number from cart where uid = ${uid}`, [], (response) => {
    const resData = [];
    response.forEach((item, idx) => {
      db.query(`select * from goods where id = ${item.gid}`, [], (respon) => {
        resData.push({ ...respon[0], number: item.g_number });
        if (idx == response.length - 1)
          res.send({ status: 0, data: resData });
      })
    })
  })
})

router.post('/deletegoods', function (req, res) {
  const { gid } = req.body;
  db.query(`delete from goods where id = ${gid}`, [], () => {
    db.query(`delete from cart where gid = ${gid}`, [], () => {
      res.send({ status: 0, msg: "操作成功" })
    })
  })
})

router.post('/modifygoods', function (req, res) {
  const { gid, price, total_number, image, category } = req.body;
  db.query(`update goods set price = ${price}, total_number = ${total_number}, image = '${image}', category = '${category}' where id = ${gid}`, [], (response) => {
    res.send({ status: 0, msg: "修改成功" })
  })
})

router.post('/addgoods', function (req, res) {
  const { name, price, total_number, image, category } = req.body;
  db.query(`insert into goods(name,price,total_number,buy_number,canbe_delete,image,category) 
  values ('${name}',${price},${total_number},0,0,'${image}','${category}')`, [], (response) => {
    res.send({ status: 0, msg: "添加商品成功" })
  })
})

router.post('/buy', function (req, res) {
  const { uid, total_price, selectGoods } = req.body;
  db.query(`update user set money = money - ${total_price} where uid = ${uid}`, [], (rsp) => {
    selectGoods.forEach(item => {
      const { number, id, image, name } = item;
      db.query(`insert into orders VALUES (${uid},${number},${id},'${image}','${name}')`, [], () => {
        db.query(`update goods set buy_number = buy_number + ${number} where id = ${id}`, [], (response) => {
          db.query(`delete from cart where uid = ${uid}`, [], () => {
            res.send({ status: 0, msg: "购买成功" })
          })
        })
      })
    })
  })
})

module.exports = router;
