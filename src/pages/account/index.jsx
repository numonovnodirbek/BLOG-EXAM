import { Fragment } from "react";
import "../../FormsStyle/style.scss";

const AccountPage = () => {
  return (
    <Fragment>
      <section id="accountPage">
        <div className="form-container accountPage">
          <h1>Account</h1>
          <form className="form">
            <input className="input" type="text" placeholder="Firstname" />
            <input className="input" type="text" placeholder="Lastname" />
            <input className="input" type="text" placeholder="Username" />
            <input className="input" type="password" placeholder="Paswword" />
            <input
              className="input"
              type="password"
              placeholder="Confirm password"
            />
            <input className="button" type="submit" value="Save" />
          </form>
        </div>
      </section>
    </Fragment>
  );
};

export default AccountPage;
