const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const accessTokenSecret = 'youraccesstokensecret';

const ArticlesService = require('../Services/ArticlesService');
const articlesService = new ArticlesService();

/**
 * 
 */
class ArticlesController {


    /**
     * 
     * 
     */
    async CreateArticle(req, res) {

        const userId = req.userId;
        const message = req.body.message;
        const title = req.body.title;

        if (typeof message !== "string" || typeof title != "string") {

            res.status(400).json({
                status: "FAIL",
                data: undefined,
                message: "erreur de syntaxe"
            });

            return;

        }

        try {

            const article = await articlesService.addArticle(title, message, userId);


            res.status(201).json({
                status: "Created",
                data: article,
                message: "Article publié"
            });


        }
        catch (err) {

            res.status(500).json({
                status: "FAIL",
                data: undefined,
                message: "erreur serveur",
            });
        }
    }

    async getAllArticles(req, res) {


        try {

            const articles = await articlesService.getArticles();


            res.status(200).json({
                status: "OK",
                data: articles,
                message: "LISTE DES ARTICLES"
            });

        } catch (err) {

            res.status(500).json({
                status: "ERROR",
                data: undefined,
                message: "une erreur est survenue"
            });
        }

    }
    async getByArticle(req, res) {

        const id = req.params.id;

        try {

            const article = await articlesService.getOneArticle(id);

            if (id) {
                res.status(200).json({
                    status: "OK",
                    data: article,
                    message: "ARTICLE CLIENT",
                });

            } else {

                res.status(404).json({
                    status: "NOT FOUND",
                    data: undefined,
                    message: "l'article' n'existe pas",

                });
            }

        } catch (err) {

            res.status(500).json({
                status: "ERROR",
                data: undefined,
                message: "erreur serveur",
            });
        }

    }
    async updateArticle(req, res) {

        const userId = req.userId;
        const title = req.body.title;
        const message = req.body.message;
        const id = req.params.id;



        if (!message || typeof (message) !== "string") {

            res.status(400).json({
                status: "FAIL",
                data: undefined,
                message: "erreur de syntaxe"
            });
            return;
        }

        const articleExist = await articlesService.getOneArticle(id);

        if (!articleExist) {

            res.status(404).json({
                status: "NOT FOUND",
                data: undefined,
                message: "l'article n'existe pas"
            });

            return;
        }

        if (articleExist.user_id !== userId) {

            res.status(401).json({
                status: "FAIL",
                data: undefined,
                message: "non autorisé"
            });

            return;


        }
        try {

            const data = await articlesService.updateArticle(id, title, message);


            if (data) {
                res.status(200).json({
                    status: "UPDATED",
                    data: data,
                    message: "Modification effectuée"
                });
            }

        } catch (err) {

            res.status(500).json({
                status: "FAIL",
                data: undefined,
                message: "erreur serveur",
            });
        }

    }
    async deleteArticle(req, res) {

        const id = req.params.id;
        const userId = req.userId;

        const articleExist = await articlesService.getOneArticle(id);

        if (!articleExist) {

            res.status(404).json({

                status: "NOT FOUND",
                data: undefined,
                message: "l'article n'existe pas",
            });

            return;

        }

        if (articleExist.user_id !== userId) {

            res.status(401).json({
                status: "ERREUR",
                data: null,
                message: "non autorisé"
            });

            return;
        }

        try {

            const data = await articlesService.deleteArticle(id);

            if (data) {

                res.status(200).json({
                    status: "OK",
                    data: data,
                    message: "SUPPRESSION ARTICLE EFFECTUEE"
                });

            };

        } catch (err) {

            res.status(500).json({
                status: "FAIL",
                data: undefined,
                message: "erreur serveur",
            });
        }





    }



}


module.exports = ArticlesController;