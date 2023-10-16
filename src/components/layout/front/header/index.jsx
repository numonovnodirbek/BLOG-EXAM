import { AuthContext } from "../../../../contexts/AuthContext";
import Cookies from "js-cookie";
import { NavLink, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";

import { TOKEN } from "../../../../constants";

import "./style.scss";
import logo from "../../../../assets/images/svg/logo.svg";
import bars from "../../../../assets/images/png/bars.png";
import logoutIcon from "../../../../assets/images/svg/logout.svg"



const Header = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);
  const { setIsAuthenticated } = useContext(AuthContext);
  const [openBars, setOpenBars] = useState(false);

  const open = () => {
    if (openBars == true) {
      setOpenBars(false);
    } else {
      setOpenBars(true);
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    Cookies.remove(TOKEN);
    navigate("/");
  };
  return (
    <header>
      <nav className="container">
        <div className="wrap">
          {isAuthenticated ? (
            <div className="logo">
              <img onClick={logout} src={logoutIcon} alt="" title="Logout"/>
              <NavLink to="/myposts" style={{ color: "yellow" }}>
                My Posts
              </NavLink>
            </div>
          ) : (
            <NavLink to="/">
              <img src={logo} alt="" />
            </NavLink>
          )}
          <ul className={`nav-item ${openBars ? "open" : "close"}`}>
            <li className="nav-menu">
              <NavLink to="/">Home</NavLink>
            </li>

            <li className="nav-menu">
              <NavLink to="/all-posts">Blog</NavLink>
            </li>
            <li className="nav-menu">
              <NavLink to="/about-us">About Us</NavLink>
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
      </nav>
    </header>
  );
};

export default Header;
