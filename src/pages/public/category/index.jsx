import { Fragment, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import request from "../../../server";

import Card from "../../../components/postCard";

import "./style.scss";
import Loading from "../../../components/share/Loading";

const CategoryPage = () => {
  const { cateId } = useParams();
  const [data, setData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const handleInput = (e) => {
    setSearch(e.target.value);
    fetchData(e.target.value);
  };

  useEffect(() => {
    getCategoryData();
  }, []);

  async function getCategoryData() {
    try {
      const res = await request.get(`/category/${cateId}`);
      // console.log(res);
      setCategoryData(res.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  }

  const fetchData = async (search) => {
    try {
      const response = await request.get(
        `/post?search=${search}&category=${cateId}`
      );
      setData(response.data.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  console.log(data);

  useEffect(() => {
    fetchData(search);
  }, [search]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <Fragment>
      <section id="about-category">
        <div className="container">
          {loading ? (
            <Loading />
          ) : (
            <div className="about-category-content">
              <h1>{categoryData?.name}</h1>
              <p>{categoryData?.description}</p>
              <div className="breadCrumb">
                <Link to={"/all-posts"}>BLOG</Link>
                {" > "}
                {categoryData?.name}
              </div>
            </div>
          )}
        </div>
      </section>

      <section id="categoryCards">
        <div className="container categoryCards">
          <input
            className="search__input"
            onChange={handleInput}
            type="text"
            placeholder="Searching ..."
          />
          {data.length === 0 ? (
            <h2 style={{ textAlign: "center" }}>Not Found Card</h2>
          ) : (
            data.map((el, index) => <Card key={index} data={el} />)
          )}
        </div>
      </section>
    </Fragment>
  );
};

export default CategoryPage;
