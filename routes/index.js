const express = require('express');
const router = express.Router();
const storeController = require('../controllers/storeController');

// Do work here
router.get('/', storeController.homePage);
  // (req, res) => {
  // res.send('Hey! It works!');
  // const asd = { name: 'adlksa', age: 786, bool: true }
  // res.json(asd);
  //میتونیم جی سون هم بفرستیم
  //ولی فقط میتونیم یک ریسپانس بفرستیم و گرنه ارور میده و میگه هدر ارسال شده

  //حالا فرض کن میخوایم اطلاعات داخل یو ار ال رو بهش دسترسی پیدا کنیم جاش کجاست؟
  // req.query
  //خب دلیل این که ما اصلا این کوری یا پارامس رو داریم چیه ؟ 
  //دلیلش برمیگرده به بادیپارسر که میدلوری هست قبل از این که حتی به راه ها برسیم
  //میاد کل بادی ریکوست رو تبدیل به جیسون میکنه
// });
    // router.get('/reverse/:name', (req, res) => {
    //   const reverse = [...req.params.name];
    //   res.json(req.params);
    // });
    //ما توی بالا اومدیم صاف اطلعات رو توی روتر نوشتیم و گفتیم ریورز کن و هر چیزی توی اپلیکیشن های بزرگ تر کار به گند کشیده میشه ئ این جا باید 
    // کد رو مرتب کنیم و در نتیجه کنترلر میاد وسط و تمام این اتفاقات رو توی کنترلر مینویسیم

// router.get('/pug', (req, res) => {
//   res.render('Home', { 
//     name: 'dog',
//     dog: 'snickers'
//    });
  //به پسوند پاگ نیازی نداره
  //قبلا توی کانفیگ جاش مشخص شده
  //با رندر میتونیم یک فایل رو رندر کنیم
// });
router.get('/add', storeController.addStore);
router.post('/add', storeController.createStore);

module.exports = router;
