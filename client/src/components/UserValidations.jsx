
import * as Yup from 'yup';

export const loginSchema = Yup.object().shape({
    email: Yup.string()
        .email("Direccion de correo no válida")
        .required("El email es obligatorio"),
    password: Yup.string()
        .required("La contraseña es obligatoria")
        .min(8, "La contraseña debe tener al menos 8 caracteres")
})

    

export const registerSchema = Yup.object().shape({
    firstName: Yup.string()
        .required("El nombre es obligatorio")
        .min(3, "El nombre debe tener al menos 3 caracteres"),
    lastName: Yup.string()
        .required("Apellido obligatorio")
        .min(3, "Apellido debe tener al menos 3 caracteres"),
    email: Yup.string()
        .email("Direccion de correo no válida")
        .required("El email es obligatorio"),
    password: Yup.string()
        .required("La contraseña es obligatoria")
        .min(8, "La contraseña debe tener al menos 8 caracteres")
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            "La contraseña debe tener al menos una letra mayúscula, una letra minúscula, un número y un caracter especial"
        ),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Las contraseñas no coinciden"),
    telefono: Yup.string()
        .required("El telefono es obligatorio")
        .min (8, "El telefono debe tener al menos 8 caracteres")
        //validar que sea numero
        .matches(/^[0-9]+$/, "El telefono debe ser un número"),
    direccion: Yup.string()
        .required("Dirección es obligatoria")
        .min(3, "Dirección debe tener al menos 3 caracteres")

    
});