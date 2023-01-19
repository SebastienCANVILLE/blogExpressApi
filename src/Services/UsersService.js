const client = require('../client');


class UsersService {
    /** class UsersService
     * * addUser () création nouvel utilisateur dans Table Users SQL
     * * logUser() login utilisateur 
     */

    async addUser(username,hash) {
        
        console.log(username,hash);
        const data = await client.query('INSERT INTO users (username,password) VALUES ($1,$2) RETURNING * ', [username,hash]);//* à modifier car le password ne doit pas etre affiché
        console.log(data.rows);
        if (data.rowCount) {

            return data.rows[0];
        }

        return undefined;

    };

    async logUser(username){

        const data = await client.query('SELECT * FROM users WHERE username = $1', [username]);

        if (data.rowCount) {

            return data.rows[0]
        }

        return undefined

    };


}

module.exports = UsersService;