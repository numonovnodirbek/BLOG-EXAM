import "./style.scss";
import facebook from "../../../../assets/images/svg/facebook.svg";
import twitter from "../../../../assets/images/svg/twitter.svg";
import instagram from "../../../../assets/images/svg/instagram.svg";
import linkedin from "../../../../assets/images/svg/linkedin.svg";

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="wrapper">
          <div className="footer-text">
            <p>Finstreet 118 2561 Fintown</p>
            <p>Hello@finsweet.com 020 7993 2905</p>
          </div>
          <div className="social-media">
            <a href="https://facebook.com">
              <img src={facebook} />
            </a>
            <a href="https://twitter.com">
              <img src={twitter} />
            </a>
            <a href="https://instagram.com">
              <img src={instagram} />
            </a>
            <a href="https://linkedin.com">
              <img src={linkedin} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
