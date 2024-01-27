import * as yup from 'yup';



const loginSchema = yup.object({
    username: yup.string().min(4, "username must be 4 or more characters").required("username is required"),
    email:yup.string().email("email must be a valid email").required("email is required"),
    password:yup.string().min(8, "password must be 8 or more characters").max(25,"password must contain 25 ot less charachters").required("password is required")
})

export default loginSchema;