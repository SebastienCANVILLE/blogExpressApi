const express = require("express");
const commentairesRouter = express.Router();
const authenticateJWT = require('../middleware/auth');

const CommentairesController = require("../Controllers/CommentairesController");
const commentairesController = new CommentairesController();

commentairesRouter.post('/', authenticateJWT, commentairesController.createCommentaire);


module.exports = commentairesRouter;