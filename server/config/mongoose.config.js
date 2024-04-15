const mongoose = require('mongoose')
require('dotenv').config()
const DB_NAME = process.env.DB_NAME 

const connectDB = async () => {
    try {
        await mongoose.connect(("mongodb://127.0.0.1:27017/" + DB_NAME), {
        })
        console.log('Conexion a la base de datos establecida', DB_NAME);
    } catch (error) {
        console.log('Error al establecer la conexion', error);
        throw error;
    }

}



module.exports = connectDB;