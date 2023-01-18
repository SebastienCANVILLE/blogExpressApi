const client = require('../client');


class ArticlesService {
/** addArticle: création d'un article dans TABLE articles
 * * 
 * *
 */
    async addArticle(title, message, userId) {

        const article = await client.query("INSERT INTO articles (title,message,user_id) VALUES( $1,$2,$3 ) RETURNING * ", [title, message, userId]);

        if (article.rowCount) {

            return article.rows[0];
        }

        return undefined;

    }

    async getArticles() {

        const data = await client.query("SELECT * FROM articles");

        if (data.rowCount) {

            return data.rows;
        }

        return undefined;

    }


    async getOneArticle(id) {

        const data = await client.query('SELECT * FROM articles WHERE id = $1', [id]);

        if (data.rowCount) {

            return data.rows[0];
        }

        return undefined;


    }

    async updateArticle(id, title, message) {

        const data = await client.query("UPDATE articles SET  title = $2 , message = $3 WHERE id = $1 RETURNING * ", [id, title, message]);


        if (data.rowCount) {

            return data.rows[0];
        }

        return undefined;


    }


    async deleteArticle(article_id) {

        const data = await client.query('DELETE FROM articles WHERE article_id= $1'[article_id]);

        if (data.rowCount) {

            return data.rows[0];
        }

        return undefined;


    }


}

module.exports = ArticlesService;