const express = require('express');
const {
  createArticle, getArticles, deleteArticleById,
} = require('../controllers/articles');
const { validateArticle, validateId } = require('../middlewares/requestValidation');

const articleRouter = express.Router();
articleRouter.get('/', getArticles);
articleRouter.delete('/:id', validateId, deleteArticleById);
articleRouter.post('/', validateArticle, createArticle);
module.exports = articleRouter;
