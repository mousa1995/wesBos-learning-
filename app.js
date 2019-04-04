const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const passport = require('passport');
const promisify = require('es6-promisify');
const flash = require('connect-flash');
const expressValidator = require('express-validator');
const routes = require('./routes/index');
const helpers = require('./helpers');
const errorHandlers = require('./handlers/errorHandlers');

// create our Express app
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views')); // this is the folder where we keep our pug files
app.set('view engine', 'pug'); // we use the engine pug, mustache or EJS work great too

// serves up static files from the public folder. Anything in public/ will just be served up as the file it is
app.use(express.static(path.join(__dirname, 'public')));

// Takes the raw requests and turns them into usable properties on req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
///دارخ تفاوت ۲ تا چیز رو میگه 
//گلوبال و غیر گلوبال میدلور ها
//گلوبال ها اونهایی هستند که توی این فایل با یوز اومدند و روی تک تک ریکوست ها هستند
//اون هایی هم که مثلا توی استور کنترلر میان و یه چیزی رو کنترل میکنند مثلا ایا برای ورود به این صفحه لوگین کرده و فقط برای اون صفحه استفاده میشن 

// Exposes a bunch of methods for validating data. Used heavily on userController.validateRegister
app.use(expressValidator());

// populates req.cookies with any cookies that came along with the request
app.use(cookieParser());
//اکسپرس بطور عادی کاری با کوکی نداره اگه میخوای استفاده کنی باس اضافه کنی

// Sessions allow us to store data on visitors from request to request
// This keeps users logged in and allows us to send flash messages
app.use(session({
  secret: process.env.SECRET,
  key: process.env.KEY,
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}));
//سشن میاد اطلاعاتی رو که از دیکوست تا ریکوست هست و جابه جا میشه رو کنترل میکنه
//ما از سشن استفاده میکنیم تا طرف لوگین بمونه


// // Passport JS is what we use to handle our logins
app.use(passport.initialize());
app.use(passport.session());

// // The flash middleware let's us use req.flash('error', 'Shit!'), which will then pass that message to the next page the user requests
app.use(flash());
//این جا برای یار اول فلش رو میاریم که جزو میدلور ها باشه

// pass variables to our templates + all requests
//این چیزی که پایینه میاد و لوکالس رو روی تموم رسیپانس هایی که هست اضافه میکنه 
//بطور خلاصه ما هلپر ها رو اکسپورت کردیم
//بعد توی این فایل ایمپورت کردیم
//بعد توی میدلور زیر استفاده کردیم
// ولی نمیدونم چجوری میره توی تمپلیت انجین و دسترسی بهش هست مثلا از مومنت استفاده کرد
//جواب توی فایل ایندکس دات جی اس پیدا شد
//با لوکالس روی تموم ریسپانس ها این اطلاعات رو قرار میدیم و استفاده میکنیم
//بازم این سوال پیش میاد که خب مگه ما سرور ساید رندرینگ نمیکنیم؟ پس چرا توی رسیپانس میگذاریم
//و چجوری فایل پاگ میدونه این اطلاعات هست؟
//جواب توی رندر است دوباره
//الان فهمیدم چی شد
//ما با رس دات رندر اسم فایل تمپلت رو میگیم و ی سری چیز ها رو براش میفرستیم
//این هم میاد روی رس چیز میزر مثل با لوکالز میگذاره
//پس به عبارت دیگه تموم اینا به ریسپانس اضافه میشن
//ریسپانس برای فایل پاگ فرستاده میشه بقیشم که توضیحی نیاز نداره
app.use((req, res, next) => {
  res.locals.h = helpers;
  res.locals.flashes = req.flash();
  //این جا فلش رو میگذاریم تا روی ریکوست بعدی باشند و نشون داده بشن
  //ولی نمیفهمم چی  به چیه 
  //خب ما فلش رو میاریم و این جا وارد میکنیم بعدش چرا میایم و و این جا روی لوکالس میگذاریم
  //اصن لوکالس چیه؟ رفتم خوندمش این یه چیزیه که توی اکسپرس هست و گفتخ میتونید برای
  //درست کردن  فانکشن هلپر ازش استفاده کنید
  //الان برای فلش داستان چیه ؟
  //این جا میگذاریمش روی لوکالس یعنی یه جایی قبلش این اومده روی کدکجا؟
  //فلش دو تا ریکوستی هست فکر میکنم بعد از بادی پارسر میادش 
  //خب این یه مشکل که حل شد مشکل دوم اینه که چجوری میره روی ریکوست دوم؟
  //غلط نکنم فهمیدم زمانی که مثلا توی راه خانه میام یه فلش استفاده میکنیم بعدش 
  //میایم و ریدایرکت میکینم توی ریکوستی که ریدایرکت میشه این هستش 
  // چرا؟ از کجا میاد ؟ نمیفهمم.بگذار از رو جزوه بریم اول یه چیزی به ما داده میشه
  //این جا میریزیمش روی لوکالس
  //بعدش توی لوکالس هستش 
  //خب ینی میمونه تا ریکوست بعدی ؟اره فک کنم و زمانی که میرسه به اپ دات یوز فلش بالا فلش رو نشون میده
  // این جا میفهمیم که کیر فنی خوردیم رفت
  //یعنی کلا زبطی به بادی نداره و در طی این کیر فنی میفهمیم که با سشن کار میکنه تا 
  //توی ریکوسن بعدی هم بمونه خیلی ساده میگه که من با سشن کار میکنم و منو حتما ریدایرکت کنین و خودمو نشون میدم
  //پس الان میفهمم که نمیدونم سشن دقیقا چیه و چرا تا ریکوست بعدی میمونه 
  //و در ضمن نمیدونم دقیقا چه اتفاقاتی میفته توی ریکوست تا رسپانس
  res.locals.user = req.user || null;
  res.locals.currentPath = req.path;
  next();
});

// promisify some callback based APIs
app.use((req, res, next) => {
  req.login = promisify(req.login, req);
  next();
});

// After allllll that above middleware, we finally handle our own routes!
//این جا میگیم بهد اسلش هر چی اومد از فایل روت ها استفاده کن که توی اون بطور مفصل گفته چی به کجا وصله
//فقط نمیدونم یوز مستقیما از کجا میفهمه که این اسلش کدوم اسلش است؟
//رفتن سرچ کردم این یوزی که بیاد و مستقیما یه استرینگ بگیره میتونه ساب دایرکتوری برامون درست کنه
//خب در واقع این جا کلا برای خودمون یه دایرکتوری داریم ریشه هست
app.use('/', routes);

// If that above routes didnt work, we 404 them and forward to error handler
app.use(errorHandlers.notFound);

// One of our error handlers will see if these errors are just validation errors
app.use(errorHandlers.flashValidationErrors);

// Otherwise this was a really bad error we didn't expect! Shoot eh
if (app.get('env') === 'development') {
  /* Development Error Handler - Prints stack trace */
  app.use(errorHandlers.developmentErrors);
}

// production error handler
app.use(errorHandlers.productionErrors);

// done! we export it so we can start the site in start.js
//بطور کلی توی این فایل اون بالا یه ریکوست قرار میگیره و فیلتر میشه تا زمانی که به روت میرسه
//و نقطه خروچ ما همون روت هست
//ولی اگه روت مورد نظر پیدا نشد ۴۰۴ نشون میدیم یا ارور رو با توچه به نسخه توسعه یا نسخه ارایه بودن درست میکنیم
//توی نقطه خروج رسیپانس میفرستیم و تموم



module.exports = app;
