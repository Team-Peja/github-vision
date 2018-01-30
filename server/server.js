const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const favicon = require('serve-favicon');

const app = express();

app.use(bodyParser.json());
app.use(favicon(path.join(__dirname, '../build/assets/images', 'glasses.ico')));
app.use('/build', express.static(path.join(__dirname, '/../', 'build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'));
});

app.listen(process.env.PORT || 1234, () => {
  console.log('listening on port 1234!');
});
