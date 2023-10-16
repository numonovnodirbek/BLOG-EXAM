import Slider from "react-slick";
// import useFetch from "../../hooks/useFetch";
import { Fragment, useEffect, useState } from "react";
import request from "../../server";
import { Link } from "react-router-dom";

import "./style.scss";

import foto from "../../assets/images/png/cardImg.jpg";
import Loading from "../share/Loading";

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  // autoplay: 100,
  slidesToScroll: 3,
  initialSlide: 0,
  responsive: [
    {
      breakpoint: 960,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: false,
      },
    },
  ],
};

const PopularSlider = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    try {
      const res = await request.get("/post/lastones");
      setData(res.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  }

  // console.log(data);

  return (
    <Fragment>
      {loading ? (
        <Loading />
      ) : (
        <Slider {...settings}>
          {data.map((el, i) => {
            // console.log(el);
            return (
              <div className="slider-item" key={i}>
                <Link to={`/blogpost/${el._id}`}>
                  <img src={foto} alt="img" />
                </Link>
                <p className="info">
                  By <span>{el.user.first_name}</span> | {el.createdAt.split("T")[0]}
                </p>
                <p className="lor">{el.title}</p>
                <p className="lor-2">{el.description.slice(0, 120)}...</p>
              </div>
            );
          })}
        </Slider>
      )}
    </Fragment>
  );
};

export default PopularSlider;
