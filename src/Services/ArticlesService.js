const client = require('../client');


class ArticlesService {

    async addArticle(message, userId) {

        const article = await client.query("INSERT INTO articles (message,user_id) VALUES( $1,$2 ) RETURNING * ", [message, userId]);

        if (article.rowCount) {

            return article.rows[0];
        }

        return undefined;

    }

    async getArticles() {

        const data = await client.query("SELECT * FROM articles");

        if (data.rowCount) {

            return data.rows[0];
        }

        return undefined;

    }


    async getOneArticle(article_id) {

        const data = await client.query('SELECT * FROM articles WHERE article_id =$1', [article_id]);

        if (data.rowCount) {

            return data.rows[0];
        }

        return undefined;


    }

    async updateArticle(article_id, message) {

        const data = await client.query("UPDATE articles SET  message = $2, WHERE article_id = $1 RETURNING * ", [article_id, message]);


        if (data.rowCount) {

            return data.rows[0];
        }

        return undefined;


    }


    async deleteArticle(article_id) {

        const data= await client.query ('DELETE FROM articles WHERE article_id= $1'[article_id]);

        if (data.rowCount) {

            return data.rows[0];
        }

        return undefined;


    }


}

module.exports = ArticlesService;