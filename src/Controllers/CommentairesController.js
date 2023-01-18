const bcrypt = require('bcryptjs');
const client = require('../client');
const jwt = require('jsonwebtoken');
const accessTokenSecret = 'youraccesstokensecret';

const CommentairesService = require('../Services/CommentairesService');
const commentairesService = new CommentairesService();


class CommentairesController {

    async createCommentaire(req, res) {

        const commentaire = req.body.commentaire;
        const articleId= req.body.article_id;
        const userId = req.userId;

        if (typeof commentaire !== 'string') {
            res.status(400).json({
                status: 'FAIL',
                data: undefined,
                message: "erreur de structure"
            });

            return;
        }

        try {
            const data = await commentairesService.addCommentaires(commentaire, userId, articleId);

            res.status(201).json({
                status: "OK",
                data: data,
                message: "le commentaire a été crée"
            });

        }
        catch (err) {
            console.log(err.stack)
            res.status(404).json({
                status: 'Fail',
                data: undefined,
                message: "Erreur de status"
            });

        }
    };

    async getCommentaire(req, res) {
        
        const id = req.params.id;

        try {
            const data = await client.query.getAllCommentaryByArticle(article_id);

            if (data.rowCount > 0) {
                res.status(200).json({
                    status: "OK",
                    data: data.rows[0],
                    message: "Voici les commentaires de l'article",
                });

                return;
            }

            res.status(404).json({
                status: "FAIL",
                data: undefined,
                message: "Il n'y a pas de commentaires !",
            });


        } catch (err) {
            console.log(err.stack);
            res.status(404).json({
                status: "FAIL",
                data: undefined,
                message: "erreur serveur",
            });
        }
    };

}

module.exports = CommentairesController;