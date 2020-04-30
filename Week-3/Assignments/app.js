const express = require('express');
const app = express();
const port = 3000;
const cookieParser = require('cookie-parser');
const exphbs = require('express-handlebars');

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(express.static('public'));
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('Hello, My Server!');
});

// assignment 2
app.get('/getData', (req, res) => {

  if (!req.query.number) {
    // lack parameter
    return res.json({ error: 'Lack of Parameter' });
  }

  const number = +req.query.number;

  if (Number.isInteger(number) && number > 0) {
    // positive integer
    const sum = (1 + number) * number / 2;
    return res.json({ sum });
  } else {
    // wrong parameter
    return res.json({ error: 'Wrong Parameter' });
  }

});

// assignment 4
app.get('/myName', (req, res) => {

  const name = req.cookies.name;
  return res.render('myName', { name });
});

app.get('/trackName', (req, res) => {

  res.cookie('name', req.query.name);
  return res.redirect('/myName');
});

app.post('/goodbye', (req, res) => {

  res.clearCookie('name');
  return res.redirect('/myName');
});

app.listen(port, () => {
  console.log(`App is now running on localhost:${port}`);
});
