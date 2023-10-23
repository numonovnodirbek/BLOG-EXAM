import Slider from "react-slick";
// import useFetch from "../../hooks/useFetch";
import { Fragment, useEffect, useState } from "react";
import request from "../../server";
import { Link } from "react-router-dom";

import "./style.scss";

import busines from "../../assets/images/svg/busines.svg";
import Loading from "../share/Loading";

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  // autoplay: 100,
  slidesToScroll: 2,
  initialSlide: 0,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

const CategorySlider = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    try {
      const res = await request.get("/category");
      setData(res.data.data);
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
              <div className="category-slider" key={i}>
                <Link className="category-slider-item" to={`/category/${el._id}`}>
                  <div className="card-box">
                    <img src={busines} alt="" />
                    <p className="name">{el?.name}</p>
                    <p className="card-desc">{el?.description.slice(0, 50)}</p>
                  </div>
                </Link>
              </div>
            );
          })}
        </Slider>
      )}
    </Fragment>
  );
};

export default CategorySlider;
