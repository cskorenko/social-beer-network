const express = require('express');
const routes = require('./routes')
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use('/', routes);

app.listen(3000, () => {
  console.log('Listening on port 3000');
});

module.exports = app;
