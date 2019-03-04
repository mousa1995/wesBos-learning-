const express = require('express');
const router = express.Router();

// Do work here
router.get('/', (req, res) => {
  // res.send('Hey! It works!');
  // const asd = { name: 'adlksa', age: 786, bool: true }
  // res.json(asd);
  //میتونیم جی سون هم بفرستیم
  //ولی فقط میتونیم یک ریسپانس بفرستیم و گرنه ارور میده و میگه هدر ارسال شده

  //حالا فرض کن میخوایم اطلاعات داخل یو ار ال رو بهش دسترسی پیدا کنیم جاش کجاست؟
  req.query
});

module.exports = router;
