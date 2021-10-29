const router = require('express').Router();
const { Joi, celebrate } = require('celebrate');
const validator = require('validator');
const { getArticles, createArticle, deleteArticle } = require('../controllers/article');

// ____________________________function for validating URL
function validateUrl(string) {
  if (!validator.isURL(string)) {
    throw new Error('Invalid URL');
  }
  return string;
}

// ROUTES_________________________________________________________________________ROUTES
router.get('/articles', getArticles);

router.post('/articles', celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required(),
    title: Joi.string().required(),
    text: Joi.string().required(),
    date: Joi.string().required(),
    source: Joi.string().required(),
    link: Joi.string().required().custom(validateUrl),
    image: Joi.string().required().custom(validateUrl),
  }),
}), createArticle);

router.delete('/articles/:articleId', celebrate({
  body: Joi.object().keys({
    params: Joi.object().keys({
      articleId: Joi.string().hex().length(24),
    }),
  }),
}), deleteArticle);

module.exports = router;
