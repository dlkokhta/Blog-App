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

  avatar: yup.mixed().required("Avatar is required"),

  author: yup
    .string()
    .min(4, "Author must be 4 or more characters")
    .required("Author is required")
    .test(
      "two-words",
      "Author must be at least two words",
      (value: string | undefined) => {
        if (!value) return false;
        return value.trim().split(/\s+/).length >= 2;
      }
    )
    .test(
      "english-letters",
      "Author can only contain English letters",
      (value: string | undefined) => {
        if (!value) return false;
        return /^[A-Za-z\s]+$/.test(value);
      }
    ),

  categories: yup
    .string()
    .min(4, "Categories must be 4 or more characters")
    .required("Categories is required"),
});

export default createBlogSchema;
