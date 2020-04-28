const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('public'));

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

  if (number % 1 === 0 && number > 0) {
    // positive integer
    const sum = (1 + number) * number / 2;
    return res.json({ sum });
  } else {
    // wrong parameter
    return res.json({ error: 'Wrong Parameter' });
  }

});

app.listen(port, () => {
  console.log(`App is now running on localhost:${port}`);
});
