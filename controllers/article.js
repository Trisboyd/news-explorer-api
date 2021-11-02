const Article = require('../models/article');
const RequestError = require('../middleware/errors/requestError');
const NotFoundError = require('../middleware/errors/notFoundError');
const ForbiddenError = require('../middleware/errors/forbiddenError');
const { invalidArticleInfo, notFound, owner } = require('../utilities/errorMessages');

module.exports.getArticles = (req, res, next) => {
  Article.find({})
    .then((articles) => res.send({ articles }))
    .catch(next);
};

module.exports.createArticle = (req, res, next) => {
  const {
    keyword, title, text, date, source, link, image,
  } = req.body;
  Article.create({
    keyword, title, text, date, source, link, image, owner: req.user._id,
  })
    .then((article) => {
      if (!article) {
        throw new RequestError(invalidArticleInfo);
      }
      res.send({ article });
    })
    .catch(next);
};

module.exports.deleteArticle = (req, res, next) => {
  Article.findByIdAndRemove(req.params.articleId)
    .then((article) => {
      if (!article) {
        throw new NotFoundError(notFound);
      } else if (article.owner.toString() !== req.user._id) {
        throw new ForbiddenError(owner);
      }
      res.status(200).send({ data: article });
    })
    .catch(next);
};
