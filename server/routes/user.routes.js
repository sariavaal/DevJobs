const express = require("express");

const userController = require("../controllers/user.controller");

const UserRouter = express.Router();

//api/user
UserRouter.get('/verify/:userId/:token', userController.confirmEmail);
UserRouter.post("/register", userController.createUser);
UserRouter.post('/forgot-password/:userId/:token', userController.resetPassword);
UserRouter.post("/forgot-password", userController.enviarEmailOlvidePassword);
UserRouter.post("/login", userController.login);
UserRouter.post("/logout", userController.logout);



module.exports = UserRouter;

