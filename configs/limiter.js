const rateLimit = require('express-rate-limit');
const { limiterErr } = require('./constants');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: limiterErr,
});

module.exports = limiter;
