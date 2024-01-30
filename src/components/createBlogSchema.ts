import * as yup from "yup";

const createBlogSchema = yup.object({
    title: yup
        .string()
        .min(4, "Title must be 4 or more characters")
        .required("Title is required"),

    description: yup
        .string()
        .min(4, "Description must be 4 or more characters")
        .required("Description is required"),

    avatar: yup
        .mixed()
        .required("Avatar is required")
        .test("fileSize", "File size is too large", (value) => {
            // Adjust the file size limit according to your needs
            return value && value[0].size <= 1024 * 1024 * 5; // 5 MB
        })
        .test("fileType", "Invalid file type", (value) => {
            return value && value[0].type.startsWith("image/");
        }),

    author: yup
        .string()
        .min(4, "Author must be 4 or more characters")
        .required("Author is required"),

    categories: yup
        .string()
        .min(4, "Categories must be 4 or more characters")
        .required("Categories is required"),
});

export default createBlogSchema;
