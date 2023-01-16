const express = require("express");
const usersRouter = express.Router();

const UsersControllers = require("../Controllers/UsersController");
const userController = new UsersControllers();


usersRouter.post('/register', userController.createUser);
usersRouter.post('/login', userController.login);


module.exports = usersRouter;