const express = require("express");
const commentairesRouter = express.Router();
const authenticateJWT = require('../middleware/auth');

const CommentairesController = require("../Controllers/CommentairesController");
const commentairesController = new CommentairesController();

commentairesRouter.post('/', authenticateJWT, commentairesController.createCommentaire); // authentification
commentairesRouter.get('/:id', commentairesController.getCommentaryById); // pas d'authentification
commentairesRouter.get('/ofArticle/:id', commentairesController.getAllCommentaryByArticle); // pas d'authentification
commentairesRouter.put('/:id', authenticateJWT, commentairesController.updateCommentary); // authentification

module.exports = commentairesRouter;