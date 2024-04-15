const nodeMailer = require("nodemailer");
require('dotenv').config()


const mailConfig = async (datos) => {
    const transport = nodeMailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        }
    });
    const {email, nombre, token, userId} = datos
    console.log(datos)
    //enviar el email
    await transport.sendMail({
        from: 'DevJobs.com',
        to: email,
        subject: 'Confirma tu cuenta en DevJobs.com',
        text: 'Confirma tu cuenta en DevJobs.com',
        html: `
            <p>Hola ${nombre}, comprueba tu cuenta en DevJobs.com</p>

            <p>Tu cuenta ya esta lista solo debes confirmarla en el siguiente enlace:
            <a href="http://localhost:5173/verify/${userId}/${token}">Confirmar Cuenta</a></p>

            <p>Si tu no creaste esta cuenta puedes ignorar el mensaje</p>
        `
    })
}

const emailOlvidePassword = async (datos) => {
    const transport = nodeMailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        }
    });
    const {email, nombre, token, userId} = datos
    console.log(datos)
    //enviar el email
    await transport.sendMail({
        from: 'DevJobs.com',
        to: email,
        subject: 'Reestablece tu password en DevJobs.com',
        text: 'Reestablece tu password en DevJobs.com',
        html: `
            <p>Hola ${nombre}, has solicitado reestablecer tu password en DevJobs.com</p>

            <p>Sigue el siguiente enlace para generar un nuevo password:
            <a href="http://localhost:5173/forgot-password/${userId}/${token}">Reestablecer Password</a></p>

            <p>Si tu no solicitaste este cambio puedes ignorar el mensaje</p>
        `
    })
}

module.exports = { mailConfig, emailOlvidePassword };
