import { useContext, useState } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { NavLink } from "react-router-dom";

import logo from "../../../assets/images/svg/logo.svg";
import bars from "../../../assets/images/png/bars.png";

const AdminHeader = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const [openBars, setOpenBars] = useState(false);
  const open = () => {
    if (openBars == true) {
      setOpenBars(false);
    } else {
      setOpenBars(true);
    }
  };
  return (
    <header>
      <div className="container">
        <div className="wrap">
          {isAuthenticated ? (
            <NavLink to="/myposts" style={{ color: "yellow" }}>
              My Posts
            </NavLink>
          ) : (
            <NavLink to="/">
              <img src={logo} alt="" />
            </NavLink>
          )}
          <ul className={`nav-item ${openBars ? "open" : "close"}`}>
            <li className="nav-menu">
              <NavLink to="/categories">Category</NavLink>
            </li>

            <li className="nav-menu">
              <NavLink to="/users">Users</NavLink>
            </li>
            <li className="nav-menu">
              <NavLink to="/aboutus">About Us</NavLink>
            </li>
            <li className="nav-menu">
              <NavLink to="/register">Register</NavLink>
            </li>
            <li className="nav-menu">
              {isAuthenticated ? (
                <NavLink to="/account">
                  <button>Account</button>
                </NavLink>
              ) : (
                <NavLink to="/login">
                  <button>Login</button>
                </NavLink>
              )}
            </li>
          </ul>
          <div className="bars" onClick={open}>
            <img src={bars} alt="" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
