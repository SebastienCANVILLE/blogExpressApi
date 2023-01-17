const express = require("express");
const authenticateJWT = require("../middleware/auth");
const articlesRouter = express.Router();


const ArticlesController = require ('../Controllers/ArticlesController')
const articlesController = new ArticlesController();





articlesRouter.post ('/', authenticateJWT, articlesController.CreateArticle);

articlesRouter.get ('/', articlesController.getAllArticles);

articlesRouter.get ('/:id', articlesController.getByArticle);

articlesRouter.put ('/', authenticateJWT, articlesController.updateAnArticle);

articlesRouter.delete ('/:id', authenticateJWT, articlesController.deleteAnArticle);




module.exports = articlesRouter;