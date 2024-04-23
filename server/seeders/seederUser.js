const connectDB = require("../config/mongoose.config");
const {UserModel} = require("../models/User.model");
const bcrypt = require("bcrypt");

//seeder para insertar usuarios

      const users = [
        {
          firstName: "Sara",
          lastName: "Armoa",
          email: "sara@me.com",
          password: "Mona123*",
          email: "sara@quickjobs.com",
          telefono: "123456789",
          direccion: "Calle falsa 123",
          profilePic:
            "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50",
          descripcion: "Soy Sara y busco una nueva oportunidad laboral",
          role: "user",
          confirmed: true,
          token: null,
        },

        {
          firstName: "Momo",
          lastName: "DeTuais",
          email: "momo@quickjobs.com",
          password: "Mona123*",
          telefono: "123456789",
          direccion: "Calle falsa 123",
          profilePic:
            "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50",
          descripcion: "Soy Momo y busco una nueva oportunidad laboral",
          role: "user",
          confirmed: true,
          token: null,
        },
        {
          firstName: "Seulgi",
          lastName: "deRV",
          email: "seulgi@quickjobs.com",
          password: "Mona123*",
          telefono: "123456789",
          direccion: "Calle falsa 123",
          profilePic:
            "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50",
          descripcion: "Soy Seulgi y busco una nueva oportunidad laboral",
          role: "user",
          confirmed: true,
          token: null,
        },
        {
          firstName: "Elizabeth",
          lastName: "Grant",
          email: "elizabeth@quickjobs.com",
          password: "Mona123*",
          telefono: "123456789",
          direccion: "Calle falsa 123",
          profilePic:
            "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50",
          descripcion: "Soy Elizabeth y busco una nueva oportunidad laboral",
          role: "user",
          confirmed: true,
          token: null,
        },
        {
          firstName: "Jiafei",
          lastName: "DaiDai",
          email: "jiafei@quickjobs.com",
          password: "Mona123*",
          telefono: "123456789",
          direccion: "Calle falsa 123",
          profilePic:
            "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50",
          descripcion: "Soy Jiafei y busco una nueva oportunidad laboral",
          role: "user",
          confirmed: true,
          token: null,
        },
      ];


//encriptar contraseñas
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};


//insertar los usuarios a la base de datos
async function insertUsers(users) {
    try {
      // Conectarse a la base de datos
      await connectDB();
  
      // Iterar sobre cada usuario y guardarlo en la base de datos
      for (const userData of users) {
        const user = new UserModel(userData);
        user.password = await hashPassword(userData.password);
        await user.save();
        console.log(`Usuario ${userData.firstName} insertado.`);
      }
  
      console.log("Todos los usuarios han sido insertados correctamente.");
    } catch (error) {
      console.error("Error al insertar usuarios:", error);
    }
  }
  
  // Llamar a la función para insertar usuarios
  insertUsers(users);