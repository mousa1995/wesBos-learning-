const mongoose = require('mongoose');

// Make sure we are running node 7.6+
const [major, minor] = process.versions.node.split('.').map(parseFloat);
if (major < 7 || (major === 7 && minor <= 5)) {
  console.log('🛑 🌮 🐶 💪 💩\nHey You! \n\t ya you! \n\t\tBuster! \n\tYou\'re on an older version of node that doesn\'t support the latest and greatest things we are learning (Async + Await)! Please go to nodejs.org and download version 7.6 or greater. 👌\n ');
  process.exit();
}

// import environmental variables from our variables.env file
require('dotenv').config({ path: 'variables.env' });

// Connect to our Database and handle an bad connections
mongoose.connect(process.env.DATABASE);
//نکته ی مهم اینه که برای داشتن اطلاعات برای هر مودل نیازی نداریم که یک بار به پایگاه 
//داده وصل بشم یک بار که وصل بشم توی تموم م برنامه قابل دسترس است
mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises
mongoose.connection.on('error', (err) => {
  console.error(`🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 → ${err.message}`);
});

// READY?! Let's go!
//ایمپورت کردن مودل هایمان این جا نجام خواهد شد
//پس بطور کلی مونگوسو اوردیم و به پایگاه داده وصل شدیم و پرامیسو درست کردیم و اررور ها رو کنترل کردیم و بعد مودل هارو اوردیم
//اولین مودل رو از این جا میاریم
//یاد اوری میکنم که برای هر مودل میایم یک فیال درست میکنیم و بصورت یک ماجول اکسپورت میکنیم
const Store = require('./models/Store');

// Start our app!
const app = require('./app');
app.set('port', process.env.PORT || 7777);
const server = app.listen(app.get('port'), () => {
  console.log(`Express running → PORT ${server.address().port}`);
});
