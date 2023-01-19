const client = require('../client');

/**
 * @class CommentairesService :
 * * Une classe de méthodes qui permet de créer des requêtes SQL 
 */
class CommentairesService {

/** 
 * @method insertCommentaire :
 * * Method qui permet de créer une requête SQL insérer un commentaire à un article. 
 */
    async insertCommentaire(commentaire, userId, articleId) {

        const data = await client.query('INSERT INTO commentaires (commentaire, user_id, article_id) VALUES ($1, $2, $3) RETURNING *', [commentaire, userId, articleId]);

        if (data.rowCount) {

            return data.rows[0];
        }

        return undefined;

    };

/**
 * @method getCommentaryById :
 * * Method qui permet de créer une requête SQL qui récupère tous les commentaires par Id. 
 */
    async getCommentaryById(id) {

        const data = await client.query('SELECT * FROM commentaires WHERE id = $1', [id]);

        if (data.rowCount) {

            return data.rows[0];
        }

        return undefined
    }

/**
 * @method getAllCommentaryByArticle :
 * * Method qui permet de créer une requête SQL qui récupère tous les commentaires d'un article. 
 */
    async getAllCommentaryByArticle(article_id) {

        const data = await client.query('SELECT * FROM commentaires WHERE article_id = $1', [article_id]);

        if (data.rowCount) {

            return data.rows;
        }

        return undefined
    }

/**
 * @method updateCommentary :
 * * Method qui permet de créer une requête SQL qui modifie un commentaire déjà existant. 
 */
    async updateCommentary(id, commentaire) {

        const data = await client.query('UPDATE commentaires SET commentaire = $2 WHERE id = $1 RETURNING *;', [id, commentaire]);

        if (data.rowCount) {

            return data.rows[0];
        }

        return undefined
    }

/**
 * @method deleteCommentary :
 * * Method qui permet de créer une requête SQL qui supprime un commentaire grâce à son Id. 
 */
    async deleteCommentary(id) {

        const data = await client.query('DELETE FROM commentaires WHERE id = $1 RETURNING *;', [id]);

        if (data.rowCount) {

            return data.rows[0];
        }

        return undefined
    }

}

module.exports = CommentairesService;