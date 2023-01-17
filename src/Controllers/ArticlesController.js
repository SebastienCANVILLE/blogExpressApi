const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const accessTokenSecret = 'youraccesstokensecret';

const ArticlesService = require('../Services/ArticlesService');
const articlesService = new ArticlesService();


class ArticlesController {


    async CreateArticle(req, res) {

        const userId = req.userId;
        const message = req.body.message;


        if (typeof message !== "string") {
            console.log("test")
            res.status(400).json({
                status: "FAIL",
                data: undefined,
                message: "erreur de syntaxe"
            });

            return;

        }

        try {

            const article = await articlesService.addArticle(message,userId);


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

    }
    async getByArticle(req, res) {

    }
    async updateAnArticle(req, res) {

    }
    async deleteAnArticle(req, res) {

    }



}


module.exports = ArticlesController;