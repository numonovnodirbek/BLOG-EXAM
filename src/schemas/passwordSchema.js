import * as yup from "yup";

const changePasswordSchema = yup.object().shape({
  currentPassword: yup
    .string()
    .required("Please enter password !")
    .min(4, `Password's minimal length must be 4`)
    .max(8, `Password's maximal length must be 8`),
  newPassword: yup
    .string()
    .required("Please enter password !")
    .min(4, `Password's minimal length must be 4`)
    .max(8, `Password's maximal length must be 8`),
});

export default changePasswordSchema;
