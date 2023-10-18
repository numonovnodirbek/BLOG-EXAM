import { useState } from "react";
import foto from "../../../assets/images/png/friends.png";
import foto2 from "../../../assets/images/png/three-friends.png";

import "./style.scss";

const AboutUsPage = () => {
  const [file, setFile] = useState();
  function handleChange(e) {
    console.log(e.target.files);
    setFile(URL.createObjectURL(e.target.files[0]));
  }
  const handleClear = () => {
    setFile("");
  };
  return (
    <section id="about">
      <div className="container">
        <div className="about-body">
          <div className="about-title-1">
            <h2>Our mision</h2>
            <h3>
              Creating valuable content for creatives all around the world
            </h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Non
              blandit massa enim nec. Scelerisque viverra mauris in aliquam sem.
              At risus viverra adipiscing at in tellus.
            </p>
          </div>
          <div className="about-title-1">
            <h2>Our Vision</h2>
            <h3>A platform that empowers individuals to improve</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Non
              blandit massa enim nec. Scelerisque viverra mauris in aliquam sem.
              At risus viverra adipiscing at in tellus.
            </p>
          </div>
        </div>
        <div className="about-main">
          <div className="about-texts">
            <h2>Our team of creatives</h2>
            <h4>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt.
            </h4>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat.
            </p>
          </div>
          <div className="about-image">
            <img src={foto} alt="" />
          </div>
        </div>
        <div className="about-footer">
          <div className="about-image">
            <img src={foto2} alt="" />
          </div>
          <div className="about-texts">
            <h2>Our team of creatives</h2>
            <h4>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt.
            </h4>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat.
            </p>
          </div>
        </div>
      </div>

      <div className="App">
        <h2>Add Image:</h2>
        <input type="file" onChange={handleChange} />
        <img src={file} />
        <button onClick={handleClear}>Clear</button>
      </div>
    </section>
  );
};

export default AboutUsPage;
