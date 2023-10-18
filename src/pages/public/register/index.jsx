import { useContext } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import { AuthContext } from "../../../contexts/AuthContext";
import request from "../../../server";
import registerSchema from "../../../schemas/registerSchema";

import "../../../FormsStyle/style.scss";
import { ROLE, TOKEN } from "../../../constants";
import { toast } from "react-toastify";

const RegisterPage = () => {
  const { setIsAuthenticated, setRole } = useContext(AuthContext);
  const navigate = useNavigate();
  const {
    formState: { errors },
    register,
    handleSubmit,
    reset,
  } = useForm({
    resolver: yupResolver(registerSchema),
  });
  const onSubmit = async (data) => {
    if (data.password == data.confirmPassword) {
      try {
        console.log(data);
        let {
          data: { token, role },
        } = await request.post("/auth/register", data);
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
        toast.error("This user alresdy exist, plaese login!");
      }
    } else {
      toast.error("Confirm is not match!");
    }
  };
  return (
    <section id="accountPage">
      <div className="form-container">
        <h1>Register</h1>
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <div className="input-wrapper">
            <input
              {...register("first_name")}
              className="input"
              type="text"
              placeholder="Firstname"
            />
            {errors.first_name ? (
              <p className="text-danger">{errors.first_name.message}</p>
            ) : null}
          </div>
          <div className="input-wrapper">
            <input
              {...register("last_name")}
              className="input"
              type="text"
              placeholder="Lastname"
            />
            {errors.last_name ? (
              <p className="text-danger">{errors.last_name.message}</p>
            ) : null}
          </div>
          <div className="input-wrapper">
            <input
              {...register("username")}
              className="input"
              type="text"
              placeholder="Username"
            />
            {errors.username ? (
              <p className="text-danger">{errors.username.message}</p>
            ) : null}
          </div>
          <div className="input-wrapper">
            <input
              {...register("password")}
              className="input"
              type="password"
              placeholder="Paswword"
            />
            {errors.password ? (
              <p className="text-danger">{errors.password.message}</p>
            ) : null}
          </div>
          <div className="input-wrapper">
            <input
              {...register("confirmPassword")}
              className="input"
              type="password"
              placeholder="Confirm password"
            />
            {errors.confirmPassword ? (
              <p className="text-danger">{errors.confirmPassword.message}</p>
            ) : null}
          </div>

          <input className="button" type="submit" value="Register" />
        </form>
      </div>
    </section>
  );
};

export default RegisterPage;
