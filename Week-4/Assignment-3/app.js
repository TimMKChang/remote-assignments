const express = require('express');
const app = express();
const port = 3000;
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('connect-flash');

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))

app.use(flash());

const { User } = require('./models');

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

// test race_condition
app.use('/race_condition', require('./routes/race_condition'));

app.listen(port, () => {
  console.log(`App is now running on localhost:${port}`);
});
