const client = require('../client');


class CommentairesService {

    async addCommentaires(commentaire, userId, articleId) {

        const data = await client.query('INSERT INTO commentaires (commentaire, user_id, article_id) VALUES ($1, $2, $3) RETURNING *', [commentaire, userId, articleId]);

        if (data.rowCount) {

            return data.rows[0];
        }

        return undefined;

    };

    async getCommentaryById(id)
    {
        
        const data = await client.query('SELECT * FROM commentaires WHERE id = $1', [id]); 
        
        if (data.rowCount) {

            return data.rows[0];
        }

        return undefined
    }

    async getAllCommentaryByArticle(article_id)
    {
        
        const data = await client.query('SELECT * FROM commentaires WHERE article_id = $1', [article_id]); 
        
        if (data.rowCount) {

            return data.rows;
        }

        return undefined
    }

    async updateCommentary(id, commentaire)
    {
        
        const data = await client.query('UPDATE commentaires SET commentaire = $2, WHERE id = $1 RETURNING *;', [id, commentaire]);
        
        if (data.rowCount) {

            return data.rows[0];
        }

        return undefined
    }


}

module.exports = CommentairesService;