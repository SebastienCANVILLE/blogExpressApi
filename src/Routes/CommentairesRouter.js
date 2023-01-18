const express = require("express");
const commentairesRouter = express.Router();
const authenticateJWT = require('../middleware/auth');

const CommentairesController = require("../Controllers/CommentairesController");
const commentairesController = new CommentairesController();

commentairesRouter.post('/', authenticateJWT, commentairesController.createCommentaire); // authentification
commentairesRouter.get('/:id', commentairesController.getCommentaryById); // pas d'authentification
commentairesRouter.get('/ofArticle/:id', commentairesController.getAllCommentaryByArticle); // pas d'authentification
commentairesRouter.put('/', authenticateJWT, commentairesController.updateCommentary); // authentification
commentairesRouter.delete('/delete/:id', authenticateJWT, commentairesController.deleteCommentary); // authentification

module.exports = commentairesRouter;