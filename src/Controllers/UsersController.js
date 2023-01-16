const bcrypt = require('bcryptjs');
const client = require('../client');
const JWT = require('json-web-token');

const UsersService = require('../Services/UsersService');
const userService = new UsersService();




class UsersControllers {

    async createUser(req, res) {

        const username = req.body.username;
        const password = req.body.password;


        bcrypt.hash(password, 10, async function (err, hash) {

            try {

                const user = await userService.addUser(username, hash);


                res.status(201).json({
                    status: "OK",
                    data: user,
                    message: "Votre compte a été crée avec succès"
                });


            } catch (err) {

                res.status(404).json({
                    status: "FAIL",
                        data : undefined,
                    message: "erreur statut"

                });
            }

        });

    }

}
module.exports = UsersControllers;