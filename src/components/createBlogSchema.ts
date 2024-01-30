import * as yup from "yup";

const createBlogSchema = yup.object({
    title: yup
        .string(),


    description: yup
        .string(),


    avatar: yup.string().required("avatar is required"),
    author: yup
        .string(),


    categories: yup
        .string()

});

export default createBlogSchema;
