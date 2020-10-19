const { celebrate, Joi, CelebrateError } = require('celebrate');
const validator = require('validator');

const urlValidation = (value) => {
  if (!validator.isURL(value)) {
    throw new CelebrateError('Некорректный URL');
  }
  return value;
};

const validateArticle = celebrate({
  body: Joi.object()
      .keys({
        keyword: Joi.string()
            .required()
            .min(2).max(30)
            .messages({
              'any.required': 'Заполните поле "keyword"',
              'string.empty': 'Поле "keyword" не должно быть пустым',
            }),
        title: Joi.string()
            .required()
            .messages({
              'any.required': 'Заполните поле "title"',
              'string.empty': 'Поле "title" не должно быть пустым',
            }),
        text: Joi.string()
            .required()
            .messages({
              'any.required': 'Заполните поле "text"',
              'string.empty': 'Поле "text" не должно быть пустым',
            }),
        date: Joi.string()
            .required()
            .messages({
              'any.required': 'Заполните поле "date"',
              'string.empty': 'Поле "date" не должно быть пустым',
            }),
        source: Joi.string()
            .required()
            .messages({
              'any.required': 'Заполните поле "source"',
              'string.empty': 'Поле "source" не должно быть пустым',
            }),
        link: Joi.string()
            .custom(urlValidation)
            .required()
            .messages({
              'any.required': 'Заполните поле "image"',
              'string.empty': 'Поле "image" не должно быть пустым',
            }),
        image: Joi.string()
            .custom(urlValidation)
            .required()
            .messages({
              'any.required': 'Заполните поле "image"',
              'string.empty': 'Поле "image" не должно быть пустым',
            }),
      }),
});


const validateId = celebrate({
  params: Joi.object().keys({
    id: Joi.string().alphanum().length(24).hex(),
  }),
});

const validateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
  }),
});

const validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
  }),
});

module.exports = {
  validateArticle,
  validateId,
  validateUser,
  validateLogin,
};
