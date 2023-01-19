

ROUTES :localhost/8000


*** USERS ***

- REGISTER :
/api/users
body { username, password }

- LOGIN :
/api/login
body { username, password }



*** ARTICLES ***

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


*** COMMENTAIRES ***

- POST : créer un commentaire
/api/commentaires/
body { commentaire, userId, articleId }

- GET : Récupérer un commentaire via son id.
/api/commentaires/
params { id }

- GET : Récuperer tous les commentaires d'un article.
/api/commentaires/ofArticle/
params { id }

- PUT : Mofifier un commentaire.
/api/commentaires/
body { commentaire, id }

- DELETE : Supprimer un commentaire via son id.
/api/commentaires/delete/
params { id }


