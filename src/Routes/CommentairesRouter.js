const express = require("express");
const commentairesRouter = express.Router();
const authenticateJWT = require('../middleware/auth');

const CommentairesController = require("../Controllers/CommentairesController");
const commentairesController = new CommentairesController();


/**
 * @constant commentairesRouter :
 * * Elles permettent de rediriger les method et de les rendres fonctionnelles sur une reqête http//
 * * authenticateJWT ()
 */
commentairesRouter.post('/', authenticateJWT, commentairesController.insertCommentaire); // authentification
commentairesRouter.get('/:id', commentairesController.getCommentaryById); // pas d'authentification
commentairesRouter.get('/:id', commentairesController.getAllCommentaryByArticle); // pas d'authentification
commentairesRouter.put('/', authenticateJWT, commentairesController.updateCommentary); // authentification
commentairesRouter.delete('/:id', authenticateJWT, commentairesController.deleteCommentary); // authentification

module.exports = commentairesRouter;