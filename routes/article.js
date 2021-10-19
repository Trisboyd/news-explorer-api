const router = require('express').Router();
const { getArticles, postArticle, deleteArticle } = require('../controllers/article');

// ROUTES_________________________________________________________________________ROUTES
router.get('/articles', getArticles);

router.post('/articles', postArticle);

router.delete('/articles/:articleId', deleteArticle);