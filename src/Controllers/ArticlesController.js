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

        const { id, message } = req.body;
      
        if (typeof id !== "number" || typeof message !== "string") {
      
          res.status(400).json({
            status: "FAIL",
            data: undefined,
            message: "erreur de syntaxe"
          });
       
        }
      
        // check ticket
      
        if (id === 0) {
          res.status(404).json({
            status: "FAIL",
            data: undefined,
            message: "le ticket que vous tentez de modifier n'existe pas"
          });
      
          return;
        }
      
      
      try {
      
      
        if (req.userId !== userId) {
          res.status(401).json({
            status: "ERREUR",
            data: null,
            message: "non autorisé"
          });
      
          return;
      
        }
      
        const data = await ticketsService.updateMyTicket (id, message);
      
        if (data.rowCount === 1) {
          res.json({
            status: "OK",
            data: data.rows,
            message: "edition ok"
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
    async deleteAnArticle(req, res) {

    }



}


module.exports = ArticlesController;