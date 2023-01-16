// imports
const express = require('express');
require('dotenv').config()

// declarations
const app = express();
const port = 8000;

// routes
app.use(express.json());

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.use('/api/tickets', commentairesRouter);
app.use('/api/tickets', articlesRouter);
app.use('/api/users', usersRouter);


// ecoute le port 8000
app.listen(port, () =>
{
    console.log(`Example app listening on port http://localhost:${port}`)
})