const jwt = require('jsonwebtoken');
const accessTokenSecret = 'youraccesstokensecret';

/**
 * @constant authenticateJWT :
 * * Permet de créer un système d'authentification de l'user pour pouvoir manipuler des requêtes (CREATE, UPDATE, DELETE, READ).
 */
const authenticateJWT = (req, res, next) => {

    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, accessTokenSecret, (err, token) => {
            if (err) {
                return res.sendStatus(403);
            }

            req.userId = token.userId;
            next();
        });
    } else {
        res.status(403).json({
            status: "FAIL",
            data: undefined,
            message: "Veuillez vous authentifier"
            });
    }

};

module.exports = authenticateJWT;