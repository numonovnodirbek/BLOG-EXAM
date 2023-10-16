import { Link } from "react-router-dom";

// import { ENDPOINT } from "../../constants";

import "./style.scss";

import postImg from "../../assets/images/png/postCardImg.jpg";

/* eslint-disable react/prop-types */

const PostCard = ({ data }) => {
  return (
    <Link to={`/blogpost/${data._id}`}>
      <section className="card-section">
        <div className="card-body">
          <img
            // src={`${ENDPOINT}upload/${data.photo._id}.jpg`}
            src={postImg}
            alt="postImg"
          />
          <div className="card-title">
            <h3>{data.category?.name}</h3>
            <h5>{data.description.slice(0, 100)}</h5>
            <p>{data.description.slice(0, 120)}</p>
          </div>
          {/* {btns === true ? (
            <div className="btns">
              <button className="edit" onClick={() => edit(data._id)}>
                Edit
              </button>
              <button
                className="delete"
                onClick={() => Categorydelet(data._id)}
              >
                Delete
              </button>
            </div>
          ) : (
            ""
          )} */}
        </div>
      </section>
    </Link>
  );
};

export default PostCard;
