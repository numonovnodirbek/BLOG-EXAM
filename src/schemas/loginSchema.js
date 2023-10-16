import * as yup from "yup";

const loginSchema = yup.object().shape({
  username: yup
    .string("Name must be a string !")
    .required("Please enter username!"),
  password: yup
    .string("Name must be a string !")
    .required("Please enter password!")
    .min(4, `Password's minimal length must be 4`)
    .max(8, `Password's maximal length must be 8`),
});

export default loginSchema;
