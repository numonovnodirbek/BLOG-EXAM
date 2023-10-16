import { Fragment, useState, useEffect } from "react";
import request from "../../../server";

import { Link } from "react-router-dom";
import Loading from "../../../components/share/Loading";
import "./style.scss";
import PopularSlider from "../../../components/popularCard";
import CategorySlider from "../../../components/categoryCard";

const HomePage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    try {
      setLoading(true);
      const res = await request.get("/post/lastone");
      setData(res.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  }
  // console.log(data);

  return (
    <Fragment>
      <section id="hero">
        <div className="hero-section">
          <div className="container">
            {loading ? (
              <Loading />
            ) : (
              <Fragment>
                <div className="hero-text">
                  <p className="postedOn">
                    POSTED ON <span>{data.category?.name}</span>
                  </p>
                  <p className="desc">
                    {data.category?.description.slice(0, 50)}...
                  </p>
                  <p className="fullname">
                    By{" "}
                    <span>
                      {data.user?.first_name} {data.user?.last_name}
                    </span>{" "}
                    | October 15, 2023
                  </p>
                  <p className="desc-2">{data?.description}</p>
                </div>
                <Link to={`/blogpost/${data._id}`}>
                  <button>
                    <span>Read More</span>
                  </button>
                </Link>
              </Fragment>
            )}
          </div>
        </div>
      </section>
      <section id="popular">
        <div className="popular container">
          <h1>Popular blogs</h1>
          <PopularSlider />
        </div>
      </section>
      <section id="category">
        <div className="category container">
          <h1>Choose A Catagory</h1>
          <CategorySlider />
        </div>
      </section>
      {/* <section id="category">{loading ? <Loading /> : <div></div>}</section> */}
    </Fragment>
  );
};

export default HomePage;
