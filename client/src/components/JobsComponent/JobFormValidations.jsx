import * as Yup from 'yup';


export const jobSchema = Yup.object().shape({
    title: Yup.string()
        .required("Title is required")
        .min(3, "Title must be at least 3 characters"),
    description: Yup.string()
        .required("Description is required")
        .min(10, "Description must be at least 10 characters"),
    salary: Yup.number()
        .required("Salary is required")
        .min(1, "Salary must be at least 1"),
    lat: Yup.number()
        .required("Latitude is required")
        .min(-90, "Latitude must be between -90 and 90")
        .max(90, "Latitude must be between -90 and 90"),
    lng: Yup.number()
        .required("Longitude is required")
        .min(-180, "Longitude must be between -180 and 180")
        .max(180, "Longitude must be between -180 and 180"),
    street: Yup.string()
        .required("Street is required")
        .min(3, "Street must be at least 3 characters"),
    type: Yup.string()
        .required("Type is required")
        .min(3, "Type must be at least 3 characters"),
    
});