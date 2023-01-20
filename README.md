                                                  *** CONTEXTE DU PROJET ***

Créer un backend API pour un blog. Création de trois tables sur PostgreSQL: USERS, ARTICLES, COMMENTAIRES.
La consultation des articles et commentaires ne demandera pas d'authentification. Par contre, la création, l'édition et la suppression d'un article ou d'un commentaire demande d'etre authentifié : Requêtes REGISTER et LOGIN nécessaires. 

CRUD REST API: npm, Node.js, Express, PostgreSQL

*** Dépendances:    nodemon
                    bcrypt.js
                    jsonwebtoken
                    pg
                    dotenv




ROUTES :localhost/8000

Routes reprises dans index.js

*** USERS ***

- REGISTER :
*  /api/users/register
*  body { username, password }

- LOGIN :
*  /api/users/login
*  body { username, password }



*** ARTICLES ***

- POST : création article
*  /api/articles/
*  body : { message, title, userId }

- GET ALL ARTICLES : récupération de tous les articles
*  /api/articles/

- GET ARTICLE BY ID : récupération d'un article via son id
*  /api/articles/:id
*  params {id}

- PUT : modification article
*  /api/articles/
*  body : { id , title, message }

- DELETE ARTICLE : suppression article via son id
*  /api/articles/:id
*  params {id}


*** COMMENTAIRES ***

- POST : créer un commentaire
*  /api/commentaires/
*  body { commentaire, userId, articleId }

- GET : Récupérer un commentaire via son id.
*  /api/commentaires/
*  params { id }

- GET : Récuperer tous les commentaires d'un article.
*  /api/commentaires/ofArticle/
*  params { id }

- PUT : Mofifier un commentaire.
*  /api/commentaires/
*  body { commentaire, id }

- DELETE : Supprimer un commentaire via son id.
*  /api/commentaires/delete/
*  params { id }


