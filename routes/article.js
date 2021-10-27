const router = require('express').Router();
const { getArticles, createArticle, deleteArticle } = require('../controllers/article');

// ROUTES_________________________________________________________________________ROUTES
router.get('/articles', getArticles);

router.post('/articles', createArticle);

router.delete('/articles/:articleId', deleteArticle);

module.exports = router;
