const bcrypt = require('bcryptjs');
const client = require('../client');
const jwt = require('jsonwebtoken');
const accessTokenSecret = 'youraccesstokensecret';

const UsersService = require('../Services/UsersService');
const userService = new UsersService();

/**@class UsersControllers
 * * Création compte pour accès à la databse PostgreSQL : function createUser
 * * Authentification pour accès à la database postgreSQL : function login */
class UsersControllers {
    /** Création compte pour accès à la databse PostgreSQL 
    * * Utilsation package bcrypt.hash pour générer une string représentant le password utilisateur ( string ) */
    async createUser(req, res) {

        const username = req.body.username;
        const password = req.body.password;

        bcrypt.hash(password, 10, async function (err, hash) {

            /** @return String - the bcrypt hash password*/

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
    /**  Permet d'accéder à la database postgreSQL
     * * @param password string of the endpoint to connect to
     * * @param user string of the user to be connected with
     * * @param token string of the user
     * * Utilisation bcrypt.compare : compare si les hashs générés proviennent du même utilisateur
     * *  Si true : Utilisation jwt.sign (jsonwebtoken) et authentification*/
    async login(req, res) {
        const username = req.body.username;
        const password = req.body.password;

        try {
            const user = await userService.logUser(username);

            if (!user) {  // si l'identifiant est incorrect
                res.status(404).json({
                    status: "fail",
                    message: "Compte inexistant",
                    data: null
                })

                return;
            }
            bcrypt.compare(password, user.password, (err, result) => {
                /**@ params password string */
                const accessToken = jwt.sign({ userId: user.id }, accessTokenSecret);
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