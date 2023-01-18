const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const accessTokenSecret = 'youraccesstokensecret';

const ArticlesService = require('../Services/ArticlesService');
const articlesService = new ArticlesService();

/**
 * @class ArticlesController
 */
class ArticlesController {


    /**
     * 
     * @param {*} req 
     * @param {*} res 
     * @returns void
     */
    async CreateArticle(req, res) {

        const userId = req.userId;
        const message = req.body.message;
        const title = req.body.title;
        console.log('REQ USER ID', req.userId);

        if (typeof message !== "string" || typeof title != "string") {
            console.log("test")
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
            console.log(err.stack);
            res.status(404).json({
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
            console.log(err.stack);
            res.status(500).json({
                status: "FAIL",
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
                    status: "FAIL",
                    data: undefined,
                    message: "l'article' n'existe pas",

                });
            }

        } catch (err) {
            console.log(err.stack);
            res.status(404).json({
                status: "FAIL",
                data: undefined,
                message: "erreur serveur",
            });
        }

    }
    async updateAnArticle(req, res) {

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

        if (!articleExist || articleExist.user_id !== userId) {

            res.status(404).json({
                status: "FAIL",
                data: undefined,
                message: "l'article n'existe pas"
            });

            return;
        }

        try {

            const data = await articlesService.updateArticle(id, title, message);

            console.log(data);

            if (data) {
                res.json({
                    status: "OK",
                    data: data,
                    message: "edition ok"
                });
            }

        } catch (err) {

            console.log(err.stack);
            res.status(500).json({
                status: "FAIL",
                data: undefined,
                message: "erreur serveur",
            });
        }

    }
    async deleteAnArticle(req, res) {

    }



}


module.exports = ArticlesController;