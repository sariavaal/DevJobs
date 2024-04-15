
import * as Yup from 'yup';

export const loginSchema = Yup.object().shape({
    email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
    password: Yup.string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters"),
})
    

export const registerSchema = Yup.object().shape({
    firstName: Yup.string()
        .required("First name is required")
        .min(3, "First name must be at least 3 characters"),
    lastName: Yup.string()
        .required("Last name is required")
        .min(3, "Last name must be at least 3 characters"),
    email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
    password: Yup.string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters")
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
        ),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match"),
});