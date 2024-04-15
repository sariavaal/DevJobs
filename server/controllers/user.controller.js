const { UserModel } = require("../models/User.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { mailConfig, emailOlvidePassword } = require("../config/mail.config");
const { validatePassword } = require("../config/validatePassword");
const { hashedPassword } = require("../config/hashedPassword");

module.exports = {
  createUser: async (req, res) => {
    const { password, confirmPassword, ...userData } = req.body;

    try {
      // Validar la contraseña
      validatePassword(password, confirmPassword);
      // Encriptar la contraseña
      const hashedPasswordResult = await hashedPassword(password);

      // Crear un nuevo usuario con la contraseña encriptada
      const user = new UserModel({ ...userData, password: hashedPasswordResult });

      // Generar y asignar un token JWT
      const token = jwt.sign({ email: user.email, userId: user._id }, 'mysecret');
      user.token = token;

      // Guardar el usuario en la base de datos
      await user.save();

      // Enviar correo de confirmación
      await mailConfig({
        email: user.email,
        nombre: user.firstName,
        token,
        userId: user._id,
      });

      // Devolver una respuesta exitosa al cliente
      res.json({ msg: "success!", user: { ...user.toObject(), token } });
    } catch (error) {
      // Manejar errores 
      res
        .status(400)
        .json({ msg: "Error creating user", error: error.message });
    }
  },
  logout: (req, res) => {
    // clear the cookie from the response
    res.clearCookie("usertoken");
    res.status(200).json({
      message: "You have successfully logged out of our system",
    });
  },

  login: (req, res) => {
    UserModel.findOne({ email: req.body.email })
      .then((user) => {
        if (user === null) {
          res.status(404).json({ message: "User not found" });
        } else {
          if (req.body.password === undefined) {
            res.status(400).json({ msg: "invalid login attempt" });
          }
          console.log(req.body);
          bcrypt
            .compare(req.body.password, user.password)
            .then((passwordIsValid) => {
              console.log("passwordIsValid: ", passwordIsValid);
              if (passwordIsValid) {
                const userInfo = {
                  _id: user._id,
                  firstName: user.firstName,
                  lastName: user.lastName,
                  email: user.email,
                };
                console.log("userInfo: ", userInfo);

                const secret = "mysecret";
                const newJWT = jwt.sign(userInfo, secret);
                console.log("newJWT: ", newJWT);
                res
                  .status(200)
                  .cookie("usertoken", newJWT, {
                    httpOnly: true,
                    expires: new Date(Date.now() + 900000000),
                  })
                  .json({ msg: "success!", user: userInfo, newJWT });
              } else {
                if (passwordIsValid === false) {
                  res.status(401).json({ msg: "Contraseña invalida" });
                }
                //res.status(401).json({ msg: "invalid login attempt" });
              }
            })
            .catch((err) =>
              res.status(401).json({ msg: "invalid login attempt", error: err })
            );
        }
      })
      .catch((err) => res.status(401).json({ error: err }));
  },

  confirmEmail: async (req, res) => {
    try {
        const userId = req.params.userId;
        const token = req.params.token;

        const user = await UserModel.findById(userId);

        if (!user) {
            return res.status(401).json({ msg: "Invalid user ID" });
        }

        if (user.token !== token && !user.confirmed) {
            return res.status(401).json({ msg: "Invalid token" });
        }
        if (user.confirmed) {
            return res.status(200).json({ msg: "Email already confirmed" });
        }

        user.confirmed = true;
        user.token = null;

        const updatedUser = await user.save();
        return res.json(updatedUser);
    } catch (error) {
        console.error("Error confirming email:", error);
        return res.status(500).json({ message: "Error confirming email", error: error.message });
    }
},
 enviarEmailOlvidePassword: async (req, res) => {
  const { email } = req.body;
  const user = await UserModel.findOne({ email });
  const userId = user._id;
  if (!user) {
    return res.status(404).json({ msg: 'Este correo no existe!' });
  }
  const secret = user._id + 'mysecret';
  const token = jwt.sign({ _id: user._id }, secret, { expiresIn: '10m' });
  const link = `http://localhost:5173/forgot-password/${userId}/${token}`;
  console.log(link);
  //mandar el email
  await emailOlvidePassword({
    email,
    nombre: user.firstName,
    token,
    userId
  });
  return res.status(200).json({ msg: 'Email enviado', data: link });
},

resetPassword: async (req, res) => {
  const {userId, token} = req.params;
  const {password} = req.body;
  console.log('userId: ', userId, 'token: ', token, 'password: ', password);
  //verificar el token
  const secret = userId + 'mysecret';
  const payload = jwt.verify(token, secret);
  if(!payload) {
    return res.status(401).json({ msg: 'Token no válido' });
  }

  if(password.length < 6) {
    return res.status(400).json({ msg: 'La contraseña debe tener al menos 6 caracteres' });
  }
  

  //actualizar el password del usuario
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await UserModel.findById(userId);
  if (!user) {
    return res.status(404).json({ msg: 'Usuario no encontrado' });
  }
  user.password = hashedPassword;
  await user.save();
  return res.status(200).json({ msg: 'Contraseña actualizada correctamente' });

},
  

 }
