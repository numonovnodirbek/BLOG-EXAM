import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import "../../../FormsStyle/style.scss";
import loginSchema from "../../../schemas/loginSchema";
// import request from "../../../server";

const RegisterPage = () => {
  const {
    formState: { errors },
    register,
    handleSubmit,
    reset,
  } = useForm({
    resolver: yupResolver(loginSchema),
  });
  const onSubmit = async (data) => {
    // try {
    //   let {
    //     data: { token, role },
    //   } = await request.post("/auth/register", data);
    //   if (role === "user") {
    //     navigate("/myposts");
    //   } else if (role === "admin") {
    //     navigate("/dashboard");
    //   }
    //   setIsAuthenticated(true);
    //   setRole(role);
    //   Cookies.set(TOKEN, token);
    //   Cookies.set(ROLE, role);
    //   setIsAuthenticated(true);
    //   reset;
    // } catch (error) {
    //   toast.error("Error");
    // }
  };
  return (
    <section id="accountPage">
      <div className="form-container">
        <h1>Register</h1>
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register("first_name")}
            className="input"
            type="text"
            placeholder="Firstname"
          />
          <input
            {...register("last_name")}
            className="input"
            type="text"
            placeholder="Lastname"
          />
          <input
            {...register("username")}
            className="input"
            type="text"
            placeholder="Username"
          />
          <input
            {...register("password")}
            className="input"
            type="password"
            placeholder="Paswword"
          />
          <input
            className="input"
            type="password"
            placeholder="Confirm password"
          />
          <input className="button" type="submit" value="Register" />
        </form>
      </div>
    </section>
  );
};

export default RegisterPage;
