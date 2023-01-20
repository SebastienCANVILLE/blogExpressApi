const client = require('../client');


class ArticlesService {

/** addArticle : requête SQL pour création article dans TABLE articles */
    async addArticle(title, message, userId) {

        const article = await client.query("INSERT INTO articles (title,message,user_id) VALUES( $1,$2,$3 ) RETURNING * ", [title, message, userId]);

        if (article.rowCount) {

            return article.rows[0];
        }

        return undefined;

    }

    /**getArticles : requête SQL pour récupération des articles dans TABLE articles */
    async getArticles() {

        const data = await client.query("SELECT * FROM articles");

        if (data.rowCount) {

            return data.rows;
        }

        return [];

    }

/**getOneArticle : requête SQL récupération article par id  dans TABLE articles*/
    async getOneArticle(id) {

        const data = await client.query('SELECT * FROM articles WHERE id = $1', [id]);

        if (data.rowCount) {

            return data.rows[0];
        }

        return undefined;


    }
    /**updateArticle: requête SQL pour modification article dans TABLE articles */

    async updateArticle(id, title, message) {

        const data = await client.query("UPDATE articles SET  title = $2 , message = $3 WHERE id = $1 RETURNING * ", [id, title, message]);


        if (data.rowCount) {

            return data.rows[0];
        }

        return undefined;


    }

/**deleteArticle: requête SQL pour suppresion article dans TABLE articles */
    async deleteArticle(id) {

        const data = await client.query('DELETE FROM articles WHERE id= $1 RETURNING id', [id]);

        if (data.rowCount) {

            return data.rows[0];
        }

        return undefined;


    }


}

module.exports = ArticlesService;