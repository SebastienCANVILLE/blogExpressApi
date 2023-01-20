const client = require('../client');


class UsersService {
    /** class UsersService
     * * fonction addUser () création nouvel utilisateur dans Table Users SQL */

    async addUser(username, hash) {

        const data = await client.query('INSERT INTO users (username,password) VALUES ($1,$2) RETURNING * ', [username, hash]);
        if (data.rowCount) {

            return data.rows[0];
        }

        return undefined;

    };
    /** class UsersService
     * * fonction logUser() login utilisateur requête SELECT SQL */
    async logUser(username) {

        const data = await client.query('SELECT * FROM users WHERE username = $1', [username]);

        if (data.rowCount) {

            return data.rows[0]
        }

        return undefined

    };


}

module.exports = UsersService;