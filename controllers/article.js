const Article = require('../models/article');
const RequestError = require('../middleware/errors/requestError');
const NotFoundError = require('../middleware/errors/notFoundError');
const ForbiddenError = require('../middleware/errors/forbiddenError');

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
        throw new RequestError('Invalid article information');
      }
      res.send({ article });
    })
    .catch(next);
};

module.exports.deleteArticle = (req, res, next) => {
  Article.findById(req.params.cardId)
    .then((article) => {
      if (article.owner.toString() === req.user._id) {
        article.findByIdAndRemove(req.params.cardId)
          .orFail(() => { throw new NotFoundError('Card does not exist'); })
          .then((cards) => res.send({ data: cards }))
          .catch(next);
      } else throw ForbiddenError('Only card owners may delete their cards');
    });
};
