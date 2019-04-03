const mongoose = require('mongoose');
//هر موقع که نیاز باشه با پایگاه داده کار کنیم باید مونگوسو ریکوایر کنیم
// لازم به ذکر است که مونگوس اینترفیسی هست که برای کار با پایگاه داده ازش استفاده کردیم

//نکته ی مهم الان نیازی نیست که مدلی که توی فایل مودل ساختیم رو ریگوایر کنیم
//چونکه مونگوس از یه چیزی استفاده میکنه بنام سینگل تون و زمانی که یک بار مودل ما ریکوایر بشه دیگه همش هست 
//الان هم توی فایل اپ ریکوایر شده
//پس اینجوری نمیاریمش بعنوان یکی از زیرمجموعه های مونگوس میاریمش
const Store = mongoose.model('Store');
//یاد اوری میکنم که مودا داخل فایل مودا میومد و یک کپی از جیزی که ساخته بودیم میگرفت

exports.homePage = (req, res) => {
  res.render('index');
}

exports.addStore = (req, res, next) => {
  //الان من نکست نوشتم در حالی که نداره این نشون میده من هنوز درک درستی از نکست ندارم
  //خب سوالی که پیش میاد اینه که کی از نکست اسفاده میکنیم
  // خب زمانی استفاده میکنیم که بخوایم بندازیم برای یک میدلور بعدی 
  //الان این چیزی که ما داریم رد میکنیم اخرین میدلور است و قراره ریسپانس بفرسته پس نیازری به نکست نیست 
  res.render('editStore', { titel: 'addStore'});
}

exports.createStore = (req, res) => { //پوستی که به ادد میاد این فانکشن هندل میکنه
  //نکست نداره چونکه ریسپانس داره
  //زمانی که با پایگاه داده کار میکنیم میایم و از جیسون استفاده میکنیم
  // res.json(req.body);

  //حالا میخوایم استور بسازیم
  //برای ساختن استور باید بدونیم که اصلا چی هست
  //خب استور چیزی هست که ما اومدیم و برای یه چهارچوب تعریف کردیم
  //اونو اکسپ.رت کردیم و این بالا اینپورت کردیم پس هر استوری که میخوایم استفاده کنیم
  //باید محتویات چهار چوب رو داشت باشه و اونو از بادی خواه نا خواه میگیره
  //چه جایی این ویژگی ها رو داره؟ خب معلومه چیزی که از طرف کار بر میاد 
  //پس ما باید بادی رو جوری تنظیم کنه تموم اینها رو داشته باشه
  //روش ساختنش رو نمیدونم
  const Store = new Store(req.body);
  //خب ساختار انی کد برام نا اشناس
  //الان این کدی که ساختیمش فک میکنم یه ابجکته چون استور یک ابجکت میسازه نهایتا
  //با یک ابجکت سر و کار داریم پس یک ابجکت نو میسازیم و نهایتا اوکی میشه هر بار که این فانکشن 
  //صدا زدا بشه یک بار یک ابجکت جدید ساخته میشه


  //توی فانکشن اسینک اویتی میریم جلوی فانکشن مینویسیم اسینک 
  //بعد جلوی اون قسمتی که قراره پرامیس برگردونه مینویسیم اویت
  //الان از این میخوایم استفاده کنیم


  //بطور کلی پیشرفت اینا این جوری بوده که در ابتدا میومدن و توی چیزی که بوده کارشونو انجام میدادن
  // مثل کدی که الان مینویسمش
  // Store.save(function(err, store){
  //   if(!err) {
  //     //یه چیزی اگرم نه که هر چی بعدشم میومپن ارور رو کچ میکیردن
  //   }
  // }).catch(err=> {})


  //بعدا اومد و پیشرفته تر شد
  //پرامیس ها اومدن و ما تونستیم از اون ها استفاده کنیم و چند تا کار رو ازش بخوایم
  // Store
  //     .save()
  //     .then()
  //     .then()
  //     .catch(err=> {})
  //با این ساختار کار ما کمی راحتتر شد

  //نکته ای که در مورد اسینک اویت هست اینه که فامکشنی که اسینک میشه زمانی که جاواساکریپت  به اویت میرسه نمیره خط بعدی
  //و صبر میکنه که مار اویتی تموم بشه و بعدش اوکیش میکنه
}