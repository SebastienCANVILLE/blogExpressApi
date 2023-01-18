const CommentairesService = require('../Services/CommentairesService');
const commentairesService = new CommentairesService();


class CommentairesController {

    async createCommentaire(req, res) {
        console.log(req.body);
        const commentaire = req.body.commentaire;
        const articleId = req.body.article_id;
        const userId = req.userId;

        if (typeof commentaire !== 'string') {
            res.status(400).json({
                status: 'FAIL',
                data: undefined,
                message: "Erreur de structure"
            });

            return;
        }

        try {
            const data = await commentairesService.addCommentaires(commentaire, userId, articleId);

            res.status(201).json({
                status: "OK",
                data: data,
                message: "Le commentaire a été crée"
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

    async getCommentaryById(req, res) {

        const id = req.params.id;

        try {
            const data = await commentairesService.getCommentaryById(id);

            if (data) {
                res.status(200).json({
                    status: "OK",
                    data: data,
                    message: "Voici le commentaires choisi",
                });

                return;
            }

            res.status(404).json({
                status: "FAIL",
                data: undefined,
                message: "Le commentaire n'existe pas !",
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
    async getAllCommentaryByArticle(req, res) {

        const articleId = req.params.id;

        try {
            const data = await commentairesService.getAllCommentaryByArticle(articleId);

            if (data) {
                res.status(200).json({
                    status: "OK",
                    data: data,
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

    async updateCommentary(req, res) {

        const id = req.body.id;
        const commentaire = req.body.commentaire;

        if (typeof id !== 'number' || typeof commentaire !== 'string') { // permet de vérifier que la structure est correct
            res.status(400).json({
                status: 'FAIL',
                data: undefined,
                message: "Erreur de structure"
            });
        }

        // check ticket
        const isCommentaireExist = await commentairesService.getCommentaryById(id); // permet de vérifier que l'id existe pour pouvoir modifier le ticket sinon il renvoi une erreur


        if (isCommentaireExist === 0) {
            res.status(404).json({
                status: 'FAIL',
                data: undefined,
                message: "Le ticket n'existe pas"
            });

            return;
        }

        const userId = req.userId;

        if (isCommentaireExist.rows.user_id !== userId) {
            res.status(404).json({
                status: 'FAIL',
                data: null,
                message: "Le Commentaire ne vous appartient pas, modification impossible"
            });

            return;
        }

        const data = await commentairesService.updateCommentary(id, commentaire);

        if (data.rowCount === 1) {
            res.json({
                status: 'OK',
                data: data,
                message: "Edition ok"
            })
        }
        else {
            res.json({ done: false })
        }
    };
}



module.exports = CommentairesController;