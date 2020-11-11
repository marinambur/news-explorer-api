const router = require('express').Router();
const userRouter = require('./users');
const articleRouter = require('./articles');
const { createUser } = require('../controllers/users');
const { login } = require('../controllers/users');
const auth = require('../middlewares/auth');
const { validateUser, validateLogin } = require('../middlewares/requestValidation');
const NotFoundError = require('../errors/NotFoundError');

router.post('/signup', validateUser, createUser);
router.post('/signin', validateLogin, login);
router.use('/users', auth, userRouter);
router.use('/users', userRouter);
router.use('/articles', auth, articleRouter);
router.use('/articles', articleRouter);

router.all('*', (req, res, next) => {
  next(new NotFoundError('Запрашиваемый ресурс не найден'));
});

module.exports = router;
