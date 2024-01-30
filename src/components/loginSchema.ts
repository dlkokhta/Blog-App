import * as yup from "yup";

const registrationSchema = yup.object({
  email: yup
    .string(),

  password: yup
    .string()

});

export default registrationSchema;
