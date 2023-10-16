import { Fragment, useEffect, useState } from "react";
import request from "../../../server";
import Card from "../../../components/postCard";

import "./style.scss";
import Loading from "../../../components/share/Loading";

const BlogPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const handleInput = (e) => {
    setSearch(e.target.value);
  };

  const getData = async (page, search) => {
    try {
      const response = await request.get(`/post?search=${search}&page=${page}`);
      // console.log(response);
      setData(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getData(currentPage, search);
  }, [search, currentPage]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // const itemsPerPage = 5;
  // const startIndex = (currentPage - 1) * itemsPerPage;
  // const endIndex = startIndex + itemsPerPage;
  // const currentPageData = data.slice(startIndex, endIndex);

  console.log(data.length);
  console.log(data.pagination?.total);

  const totalPages = Math.ceil(data.pagination?.total / 10);

  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const goToNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  return (
    <section id="blogPage">
      <div className="container">
        {loading ? (
          <Loading />
        ) : (
          <Fragment>
            <form>
              <input
                className="search__input"
                onChange={handleInput}
                type="text"
                placeholder="Searching ..."
              />
            </form>
            <h1>All Posts</h1>
            <hr />

            {data.length === 0 ? (
              <h2 className="not-found">Card Not Found</h2>
            ) : (
              data.data.map((el, index) => <Card key={index} data={el} />)
            )}

            {/* {totalPages > 1 && ( */}
              <div className="pagination">
                <button
                  className={`pagination__button ${
                    currentPage === 1 ? "disabled" : ""
                  }`}
                  onClick={goToPreviousPage}
                  disabled={currentPage === 1}
                >
                  Prev
                </button>
                {Array.from({ length: totalPages }, (_, index) => (
                  <button
                    key={index}
                    className={`pagination__button ${
                      currentPage === index + 1 ? "active" : ""
                    }`}
                    onClick={() => handlePageChange(index + 1)}
                  >
                    {index + 1}
                  </button>
                ))}
                <button
                  className={`pagination__button ${
                    currentPage === totalPages ? "disabled" : ""
                  }`}
                  onClick={goToNextPage}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            {/* )} */}
          </Fragment>
        )}
      </div>
    </section>
  );
};

export default BlogPage;
