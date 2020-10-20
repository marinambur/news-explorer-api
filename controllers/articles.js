const Article = require('../models/article');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');

const createArticle = (req, res, next) => {
  const {
    keyword, title, text, date, source, link, image,
  } = req.body;
  Article.create({
    keyword, title, text, date, source, link, image, owner: req.user._id,
  })

    .catch((err) => {
      throw new BadRequestError({ message: `Запрос некорректен: ${err.message}` });
    })
    .then((article) => res.status(200)
      .send({ data: article }))
    .catch(next);
};

const getArticles = (req, res, next) => {
  Article.find({})
    .then((cards) => res.send(cards))
    .catch(next);
};

const deleteArticleById = (req, res, next) => {
  const owner = req.user._id;
  Article.findOne({ _id: req.params.id })
    .select('+owner')
    .orFail(() => new NotFoundError('Нет карточки с таким id'))
    .then((card) => {
      if (String(card.owner) !== owner) throw new ForbiddenError('Недостаточно прав для удаления этой карточки');
      return Article.findByIdAndDelete(card._id);
    })
    .then((success) => res.send(success))
    .catch(next);
};

module.exports = {
  createArticle,
  getArticles,
  deleteArticleById,
};
