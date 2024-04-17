import * as Yup from 'yup';


export const updateSchema = Yup.object().shape({
    firstName: Yup.string()
        .required("First name is required")
        .min(3, "First name must be at least 3 characters"),
    lastName: Yup.string()
        .required("Last name is required")
        .min(3, "Last name must be at least 3 characters"),
    telefono: Yup.number()
        .required("Phone number is required")
        .min (8, "Phone number must be at least 8 characters"),
    direccion: Yup.string()
        .required("Address is required")
        .min(10, "Address must be at least 10 characters"),
    profilePic: Yup.string(),
    email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
    descripcion: Yup.string()
        .required("Description is required")
        .min(100, "Description must be at least 100 characters"),

});

    
    