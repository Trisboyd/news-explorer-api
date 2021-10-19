const Article = require('../models/article');

module.exports.getArticles = (req, res, next) => {
  Article.find({})
  .then((articles) => res.send({articles}))
  .catch(next);
};

module.exports.createArticle = (req, res, next) => {
  const { keyword, title, text, date, source, link, image } = req.body;
  Article.create({ keyword, title, text, date, source, link, image, owner: req.user._id})
  .then((article) => {
    if(!article) {
      throw new RequestError('Invalid article information');
    }
    res.send({ article });
  })
  .catch(next);
}

module.exports.deleteArticle = (req, res, next) => {
  Article.findByIdAndRemove(req.params.articleId)
  .orFail(() => { throw new NotFoundError('Article does not exist'); })
  .then((article) => res.send({ article }))
  .catch(next);
}
