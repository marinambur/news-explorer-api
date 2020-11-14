const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const routes = require('./routes');
const helmet = require('helmet');
const cors = require('cors');
const app = express();
app.use(cors({ origin: true }));
const { requestLogger, errorLogger } = require('./middlewares/logger');
const limiter = require('./configs/limiter');


const {
  PORT = 3000,
} = process.env;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/newsexplorerdb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});
app.use(requestLogger);
app.use(routes);
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(errorLogger); // подключаем логгер ошибок

app.use(errors()); // обработчик ошибок celebrate*/

app.use((err, req, res, next) => {
  if (err.status) {
    res.status(err.status).send(err.message);
    return;
  }
  res.status(500).send({ message: `На сервере произошла ошибка: ${err.message}` });
  next();
});
app.use(helmet());
app.use(limiter);
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
