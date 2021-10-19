const router = require('express').Router();

// ROUTES_________________________________________________________________________ROUTES
router.get('/articles', getArticles);

router.post('/articles', postArticle);

router.delete('/articles/:articleId', deleteArticle);