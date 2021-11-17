require('dotenv').config();

// Conect to DB and create model schemas
require('./models/schema')();

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', require('./routes/main.routes'));

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
});
