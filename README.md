                                            Contexte du projet

Créer un backend API pour un blog. Création de trois tables sur PostgreSQL: USERS, ARTICLES, COMMENTAIRES.
La consultation des articles et commentaires ne demandera pas d'authentification. Par contre, la création, l'édition et la suppression d'un article ou d'un commentaire demande d'etre authentifié : Requêtes REGISTER et LOGIN nécessaires. 



ROUTES :localhost/8000



** USERS **

- REGISTER :
/api/users
body { username, password }

- LOGIN :
/api/login
body { username, password }



** ARTICLES **

- POST : création article
 /api/articles/
body : { message, title, userId }

- GET ALL ARTICLES : récupération tous les articles
 /api/articles/

- GET ARTICLE BY ID : récupération d'un article
 /api/articles/:id

- PUT : modification article
 /api/articles/
body : { id , title, message }

- DELETE ARTICLE :
/api/articles/:id

