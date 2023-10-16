import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { AuthContext } from "../../../contexts/AuthContext";
import loginSchema from "../../../schemas/loginSchema";
import request from "../../../server";

import "../../../FormsStyle/style.scss";

import Cookies from "js-cookie";
import { ROLE, TOKEN } from "../../../constants";
import { toast } from "react-toastify";

const LoginPage = () => {
  const { setIsAuthenticated, setRole } = useContext(AuthContext);
  const navigate = useNavigate();
  const {
    formState: { errors },
    register,
    handleSubmit,
    reset,
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    try {
      let {
        data: { token, role },
      } = await request.post("/auth/login", data);
      if (role === "user") {
        navigate("/myposts");
      } else if (role === "admin") {
        navigate("/dashboard");
      }
      setIsAuthenticated(true);
      setRole(role);
      Cookies.set(TOKEN, token);
      Cookies.set(ROLE, role);
      setIsAuthenticated(true);
      reset;
    } catch (error) {
      toast.error("Error");
    }
  };
  return (
    <section id="loginPage">
      <div className="form-container">
        <h1>Login</h1>
        <form
          className="form
        "
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="input-wrapper">
            <input
              className="input"
              {...register("username")}
              placeholder="Username"
              type="text"
            />
            {errors.username ? (
              <p className="text-danger">{errors.username.message}</p>
            ) : null}
          </div>
          <div className="input-wrapper">
            <input
              className="input"
              {...register("password")}
              placeholder="Password"
              type="password"
            />
            {errors.password ? (
              <p className="text-danger">{errors.password.message}</p>
            ) : null}
          </div>
          <input className="button" type="submit" value="Login"/>
        </form>
      </div>
    </section>
  );
};

export default LoginPage;
