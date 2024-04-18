const express = require("express");

const upload = require("../config/subirImagen");

const userController = require("../controllers/user.controller");
const { authenticate } = require("../config/jwt.config");

const UserRouter = express.Router();

//api/user
UserRouter.get('/verify/:userId/:token', userController.confirmEmail);
UserRouter.post("/register", userController.createUser);
UserRouter.post('/forgot-password/:userId/:token', userController.resetPassword);
UserRouter.post("/forgot-password", userController.enviarEmailOlvidePassword);
UserRouter.post("/login", userController.login);
UserRouter.post("/logout", userController.logout);
//rutas para usuario autenticado
UserRouter.post("/myprofile/update/:id", userController.updateProfile);
UserRouter.get("/myprofile/update/:id", userController.findUserById);
//subida de foto de perfil
UserRouter.post('/upload/:id', upload.single('file'), userController.uploadProfilePic);









module.exports = UserRouter;

