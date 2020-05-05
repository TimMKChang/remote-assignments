const express = require('express');
const app = express();
const port = 3000;
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('connect-flash');
const { Op } = require('sequelize');

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))

app.use(flash());

const { User } = require('./models')

app.use((req, res, next) => {
  res.locals.errorMsg = req.flash('errorMsg');
  next();
})

app.get('/', (req, res) => {
  return res.redirect('/login');
})

app.get('/index', (req, res) => {
  return res.render('index');
})

app.get('/login', (req, res) => {
  return res.render('login');
})

app.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    req.flash('errorMsg', 'Please enter your email and password!');
    return res.redirect('/login');
  }

  User.findOne({ where: { email: email } })
    .then(user => {
      if (user) {
        if (user.password === password) {
          return res.redirect('index');
        }
        req.flash('errorMsg', 'Please check your password!');
        return res.redirect('/login');
      }
      req.flash('errorMsg', 'The email is not registered!');
      return res.redirect('/login');
    })

})

app.get('/register', (req, res) => {
  return res.render('register');
})

app.post('/register', (req, res) => {
  const { email, password, password2 } = req.body;

  if (!email || !password || !password2) {
    req.flash('errorMsg', 'Please enter your email and password!');
    return res.redirect('/register');
  }

  if (password !== password2) {
    req.flash('errorMsg', 'Inconsistent Passwords!');
    return res.redirect('/register');
  }

  User.findOne({ where: { email: email } })
    .then(user => {
      if (!user) {
        User.create({ email, password });
        return res.redirect('/index');
      }
      req.flash('errorMsg', 'The email is already registered!');
      return res.redirect('/register');
    })

})

// race condition test
app.use((req, res, next) => {
  res.locals.rcMsg = req.flash('rcMsg');
  next();
})

app.get('/race_condition', (req, res) => {

  return res.render('race_condition');
})

app.post('/race_condition_insert', (req, res) => {

  for (let i = 1; i <= 10; i += 1) {

    const email = `user${i}@test.race.condition`;
    const password = 1111;

    User.findOne({ where: { email: email } })
      .then(async (user) => {
        if (!user) {
          try {
            await User.create({ email, password }).then(() => { console.log(`user${i} First Insert Done`) });
          } catch (err) {
            console.error('\x1b[41m%s\x1b[0m', err.parent.sqlMessage);
          }
        } else {
          console.log(`user${i} First Insert Failed`);
        }
      })

    User.findOne({ where: { email: email } })
      .then(async (user) => {
        if (!user) {
          try {
            await User.create({ email, password }).then(() => { console.log(`user${i} Second Insert Done`) });
          } catch (err) {
            console.error('\x1b[41m%s\x1b[0m', err.parent.sqlMessage);
          }
        } else {
          console.log(`user${i} Second Insert Failed`);
        }
      })
  }

  req.flash('rcMsg', 'Insert completed!');
  return res.redirect('/race_condition');
})

app.post('/race_condition_delete', (req, res) => {

  User.destroy({
    where: {
      email: {
        [Op.like]: '%@test.race.condition'
      }
    }
  })

  req.flash('rcMsg', 'Delete completed!');
  return res.redirect('/race_condition');
})

app.listen(port, () => {
  console.log(`App is now running on localhost:${port}`);
});
