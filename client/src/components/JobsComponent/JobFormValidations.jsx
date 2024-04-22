import * as Yup from 'yup';


export const jobSchema = Yup.object().shape({
    title: Yup.string()
        .required("Titulo es requerido")
        .min(3, "Titulo debe tener al menos 3 caracteres"),
    description: Yup.string()
        .required("Descripción es requerido")
        .min(10, "Descripción debe tener al menos 10 caracteres"),
    salary: Yup.number()
        .required("Salario es requerido")
        .min(5, "Salario debe ser al menos 5 dígitos"),
    lat: Yup.string(),
    lng: Yup.string(),
    street: Yup.string(),
    type: Yup.string()
        .required("Tipo es requerido")
    
}); 