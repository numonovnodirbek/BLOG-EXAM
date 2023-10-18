/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import request from "../../../server";
import getImage from "../../../utils/getImage";

// import { ENDPOINT } from "../../../constants";

import backgound from "../../../assets/images/png/BMW.jpg";
import avatar from "../../../assets/images/png/avatar.png";
import "./style.scss";
import Loading from "../../../components/share/Loading";

const BlogPostsPage = () => {
  const { blogId } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    try {
      const res = await request.get(`/post/${blogId}`);
      setData(res.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  }

  console.log(data);

  return (
    <section id="blogPost">
      <div className="container">
        {loading ? (
          <Loading />
        ) : (
          <div className="blog-info">
            <img
              className="background"
              width="100%"
              // src={`${ENDPOINT}upload/${data.photo._id}.${
              //   data.photo.name.split(".")[1]
              // }`}
              src={backgound || `${getImage(data.photo._id)}.jpg`}
              alt="Photo Not Found"
            />
            <div className="blog-content">
              <div className="blog-avatar">
                <img
                  width="50"
                  height="50"
                  src={avatar}
                  // src={avatar}
                  alt="Photo Not Found"
                />
                <div className="ava-info">
                  <p className="full-name">
                    {data.user.first_name} {data.user.last_name}
                  </p>
                  <p className="data">
                    Posted on {data.updatedAt.split("T")[0]}
                  </p>
                </div>
              </div>
              <div className="blog-hero">
                <p className="blog-title">{data.description}</p>
              </div>
              <div className="blog-start">
                <p className="blog-biznes">
                  Startup (
                  {data?.tags.map((el, i) => (
                    <span key={i}>#{el},</span>
                  ))}
                  )
                </p>
              </div>
              <div className="blog-lorem">
                <p>{data.description}</p>
                <p>{data.description}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogPostsPage;
