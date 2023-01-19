const CommentairesService = require('../Services/CommentairesService');
const commentairesService = new CommentairesService();

/**
 * @class CommentairesController :
 * Une classe de méthodes :
 * * Interpréter l'action envoyées par l'user
 * * Contrôler les requêtes, 
 * * Contrôler ses droits et de générer des codes erreurs. 
 */
class CommentairesController {

    /** 
     * @method insertCommentaire :
     * * Method controller pour insertion de commentaire. 
     */
    async insertCommentaire(req, res) {
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
            const data = await commentairesService.insertCommentaire(commentaire, userId, articleId);

            res.status(201).json({
                status: "OK",
                data: data,
                message: "Le commentaire a été crée"
            });

        }
        catch (err) {
            console.log(err.stack)
            res.status(500).json({
                status: 'Fail',
                data: undefined,
                message: "Erreur de status"
            });

        }
    };

    /** 
     * @method getCommentaryById :
     * * Method controller pour recupérer un commentaire par son id. 
     */
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
            res.status(500).json({
                status: "FAIL",
                data: undefined,
                message: "erreur serveur",
            });
        }
    };

    /** 
     * @method getAllCommentaryByArticle :
     * * Method controller pour recupérer tous les commentaires d'un article (id). 
     */
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
            res.status(500).json({
                status: "FAIL",
                data: undefined,
                message: "erreur serveur",
            });
        }
    };

    /** 
     * @method updateCommentary :
     * * Method controller pour modifier (update) un commentaires via son id. 
     */
    async updateCommentary(req, res) {

        const id = req.body.id;
        const commentaire = req.body.commentaire;

        try {


            if (typeof (id) !== 'number' && typeof (commentaire) !== 'string') { // permet de vérifier que la structure est correct
                res.status(400).json({
                    status: 'FAIL',
                    data: undefined,
                    message: "Erreur de structure"
                });
            }

            // check Commentaire
            const isCommentaireExist = await commentairesService.getCommentaryById(id); // permet de vérifier que l'id existe pour pouvoir modifier le ticket sinon il renvoi une erreur
            console.log('TEST 1', isCommentaireExist);

            if (isCommentaireExist === undefined) {
                res.status(404).json({
                    status: 'FAIL',
                    data: undefined,
                    message: "Le ticket n'existe pas"
                });

                return;
            }

            const userId = req.userId;

            if (isCommentaireExist.user_id !== userId) {
                res.status(404).json({
                    status: 'FAIL',
                    data: null,
                    message: "Le Commentaire ne vous appartient pas, modification impossible"
                });

                return;
            }

            const data = await commentairesService.updateCommentary(id, commentaire);

            if (data) {
                res.status(200).json({
                    status: 'OK',
                    data: data,
                    message: "Edition ok"
                })
            }
            else {
                res.status(404).json({
                    status: 'FAIL',
                    data: null,
                    message: "Erreur"
                })
            }

        } catch (error) {
            res.status(500)({
                status: "FAIL",
                data: undefined,
                message: "erreur serveur",
            });
        }
    };

    /** 
     * @method deleteCommentary :
     * * Method controller pour supprimer un commentaires via son id. 
     */
    async deleteCommentary(req, res) {

        const id = req.params.id;
        const userId = req.userId;

        try {
            // check commentaire
            const commentaireExist = await commentairesService.getCommentaryById(id);


            if (commentaireExist === undefined) {
                res.status(404).json({
                    status: 'FAIL',
                    data: undefined,
                    message: "Le commentaire n'existe pas"
                });

                return;
            }

            if (commentaireExist.user_id !== userId) {
                res.status(401).json({
                    status: 'FAIL',
                    data: null,
                    message: "Le commentaire ne vous appartient pas, suppression impossible"
                });

                return;
            }

            const data = await commentairesService.deleteCommentary(id);

            if (data) {
                //res.json({ deleted: true });
                res.status(200).json({
                    status: 'OK',
                    data: data,
                    message: "Commentaire supprimé"
                });
            }

        } catch (error) {
            res.status(500)({
                status: "FAIL",
                data: undefined,
                message: "Erreur serveur",
            });

        }
    };
}

module.exports = CommentairesController;