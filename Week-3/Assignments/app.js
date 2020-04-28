const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello, My Server!');
});

// assignment 2
app.get('/getData', (req, res) => {

  if (!req.query.number) {
    // lack parameter
    return res.send('<h1>Lack of Parameter</h1>');
  }

  const number = +req.query.number;

  if (number % 1 === 0 && number > 0) {
    // positive integer
    const result = (1 + number) * number / 2;
    res.send(`<h1>1+2+...+${number} = ${result}</h1>`);
  } else {
    // wrong parameter
    res.send('<h1>Wrong Parameter</h1>');
  }

});

app.listen(port, () => {
  console.log(`App is now running on localhost:${port}`);
});
