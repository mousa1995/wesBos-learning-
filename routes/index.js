const express = require('express');
const router = express.Router();

// Do work here
router.get('/', (req, res) => {
  res.send('Hey! It works!');
  // const asd = { name: 'adlksa', age: 786, bool: true }
  // res.json(asd);
  //میتونیم جی سون هم بفرستیم
  //ولی فقط میتونیم یک ریسپانس بفرستیم و گرنه ارور میده و میگه هدر ارسال شده

  //حالا فرض کن میخوایم اطلاعات داخل یو ار ال رو بهش دسترسی پیدا کنیم جاش کجاست؟
  // req.query
  //خب دلیل این که ما اصلا این کوری یا پارامس رو داریم چیه ؟ 
  //دلیلش برمیگرده به بادیپارسر که میدلوری هست قبل از این که حتی به راه ها برسیم
  //میاد کل بادی ریکوست رو تبدیل به جیسون میکنه
});
    router.get('/reverse/:name', (req, res) => {
      const reverse = [...req.params.name];
      res.json(req.params);
    });

router.get('/pug', (req, res) => {
  res.render('Home');
  //به پسوند پاگ نیازی نداره
  //قبلا توی کانفیگ جاش مشخص شده
  //با رندر میتونیم یک فایل رو رندر کنیم
});

module.exports = router;
