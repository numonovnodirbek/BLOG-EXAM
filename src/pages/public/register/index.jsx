import "../../../FormsStyle/style.scss";

const RegisterPage = () => {
  return (
    <section id="accountPage">
      <div className="form-container">
        <h1>Register</h1>
        <form className="form">
          <input className="input" type="text" placeholder="Firstname" />
          <input className="input" type="text" placeholder="Lastname" />
          <input className="input" type="text" placeholder="Username" />
          <input className="input" type="password" placeholder="Paswword" />
          <input className="input" type="password" placeholder="Confirm password" />
          <input className="button" type="submit" value="Register"/>
        </form>
      </div>
    </section>
  );
};

export default RegisterPage;
