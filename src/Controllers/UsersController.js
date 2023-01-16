const bcrypt = require('bcryptjs');
const client = require('../client');
const jwt = require('jsonwebtoken');
const accessTokenSecret = 'youraccesstokensecret';

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
                    data: undefined,
                    message: "erreur statut"

                });
            }

        });

    }

    async login(req, res) {
        const username = req.body.username;
        const password = req.body.password;

        try {

            const user = await userService.logUser(username); 
console.log(user);
            if (!user) {  // si l'identifiant est incorrect
                res.status(404).json({ 
                    status: "fail",
                    message: "Compte inexistant",
                    data: null
                })

                return;
            }
            
            bcrypt.compare(password, user.password, (err, result) => { 

                const accessToken = jwt.sign({ userId: user.user_id }, accessTokenSecret); 

                if (result === true) { 
                    res.status(200).json({
                        status: "succes",
                        message: "Authentification réussi",
                        data: accessToken 
                    })
                }
                else {
                    res.status(403).json({  
                        status: "fail",
                        message: "Authentification FAIL",
                        data: null
                    })
                }
            });
        }

        catch (err) {

            res.status(500).json({
                status: "FAIL",
                message: "erreur serveur",
                data: null
            })
        }
    };

}



module.exports = UsersControllers;