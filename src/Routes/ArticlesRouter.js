const express = require("express");
const authenticateJWT = require("../middleware/auth");
const articlesRouter = express.Router();


const ArticlesController = require('../Controllers/ArticlesController');
const articlesController = new ArticlesController();

//Routes

articlesRouter.post('/', authenticateJWT, articlesController.CreateArticle);

articlesRouter.get('/', articlesController.getAllArticles);

articlesRouter.get('/:id', articlesController.getByArticle);

articlesRouter.put('/:id', authenticateJWT, articlesController.updateArticle);

articlesRouter.delete('/:id', authenticateJWT, articlesController.deleteArticle);


module.exports = articlesRouter;