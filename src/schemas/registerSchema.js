import * as yup from "yup";

const registerSchema = yup.object().shape({
  first_name: yup
    .string("Fistname must be a string !")
    .required("Please enter firstname!"),
  last_name: yup
    .string("Lastame must be a string !")
    .required("Please enter lastname!"),
  username: yup
    .string("Username must be a string !")
    .required("Please enter username!"),
  password: yup
    .string("Password must be a string !")
    .required("Please enter password !")
    .min(4, `Password's minimal length must be 4`)
    .max(8, `Password's maximal length must be 8`),
  confirmPassword: yup
    .string("Name must be a string !")
    .required("Please enter password !")
    .min(4, `Password's minimal length must be 4`)
    .max(8, `Password's maximal length must be 8`),
});

export default registerSchema;
