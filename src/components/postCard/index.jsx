import { Link } from "react-router-dom";

// import { ENDPOINT } from "../../constants";

import "./style.scss";

import postImg from "../../assets/images/png/postCardImg.jpg";
import getImage from "../../utils/getImage";

/* eslint-disable react/prop-types */

const PostCard = ({ data, actions, editPost, deletePost }) => {
  return (
    <section className="card-section">
      <div className="card-body">
        <Link to={`/blogpost/${data._id}`}>
          <img
            // src={`${ENDPOINT}upload/${data.photo._id}.jpg`}
            src={`${getImage(data.photo?._id)}.jpg` || postImg}
            alt="postImg"
          />
        </Link>

        <div className="card-title">
          <div className="card-header">
            <h3>{data.category?.name}</h3>
            {actions === true ? (
              <div className="actions">
                <button
                  className="action-btn edit"
                  onClick={() => editPost(data._id)}
                >
                  Edit
                </button>
                <button
                  className="action-btn delete"
                  onClick={() => deletePost(data._id)}
                >
                  Delete
                </button>
              </div>
            ) : (
              ""
            )}
          </div>
          <h5>{data.description.slice(0, 100)}...</h5>
          <p>{data.description.slice(0, 120)}...</p>
        </div>
      </div>
    </section>
  );
};

export default PostCard;
