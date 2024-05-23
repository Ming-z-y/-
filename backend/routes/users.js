var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/', function (req, res, next) {
  const data = req.body;
  console.log(data)
  const response = { "success": 100 }

  res.send(response)
});

module.exports = router;
