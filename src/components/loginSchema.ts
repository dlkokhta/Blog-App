import * as yup from "yup";

const registrationSchema = yup.object({
  email: yup
    .string().required(),

  password: yup
    .string().required(),

});

export default registrationSchema;
