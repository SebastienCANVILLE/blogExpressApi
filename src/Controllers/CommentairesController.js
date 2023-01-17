const bcrypt = require('bcryptjs');
const client = require('../client');
const jwt = require('jsonwebtoken');
const accessTokenSecret = 'youraccesstokensecret';

const CommentairesService = require('../Services/CommentairesService');
const commentairesService = new CommentairesService();


class CommentairesController {

async createCommentaire(req, res) {

        const message = req.body.message;
        const userId = req.userId;

        if (typeof message !== 'string') {
            res.status(400).json({
                status: 'FAIL',
                data: undefined,
                message: "erreur de structure"
            });

            return;
        }

        try {
            const data = await client.query.addCommentaires(commentaire, user_id, article_id);

            res.status(201).json({
                status: "OK",
                data: data.rows[0],
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

}

module.exports = CommentairesController;