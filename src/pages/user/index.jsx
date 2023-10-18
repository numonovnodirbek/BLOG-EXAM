import { Fragment, useEffect, useState } from "react";
import { Button, Form, Input, Modal, Select, Upload, message } from "antd";
// import { ExclamationCircleFilled } from "@ant-design/icons";

import request from "../../server";
import Card from "../../components/postCard";
import Loading from "../../components/share/Loading";
import { LIMIT } from "../../constants";

import "../public/blog/style.scss";

const MyPostsPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tags, setTags] = useState();
  const [selected, setSelected] = useState(null);
  const [categories, setCategories] = useState([]);
  const [photoId, setPhotoId] = useState(null);
  const [editFormData, setEditFormData] = useState(null);
  const [sortedCategories, setSortedCategories] = useState([]);
  const [categoryId, setCategoryId] = useState()
  const [form] = Form.useForm();
  const [actions] = useState(true);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const hideModal = () => {
    setIsModalOpen(false);
    form.resetFields();
    setimgSrc(null);
  };

  //GET CATEGORIES
  useEffect(() => {
    let options;
    options = categories?.map((category) => {
      return {
        value: category?._id,
        label: category?.name,
      };
    });
    setSortedCategories(options);
    request.get("category").then((response) => {
      setCategories(response.data.data);
    });
  }, [setCategories, categories]);
  const handleInput = (e) => {
    setSearch(e.target.value);
  };
  const handleChange = (value) => {
    console.log(`selected ${value}`);
    setCategoryId(value);
    console.log(categoryId);
  };
  useEffect(() => {
    getData(currentPage, search);
  }, [search, currentPage]);

  //------------------------------//


  //GET DATA
  const getData = async (page, search) => {
    try {
      const response = await request.get(
        `post/user?page=${page}&limit=${LIMIT}&search=${search}`
      );
      setData(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  //UPLOAD PHOTO
  const uploadPhoto = async (e) => {
    try {
      let formData = new FormData();
      formData.append("file", e.file.originFileObj);
      console.log(e.file.originFileObj);
      let response = await request.post("auth/upload", formData);
      setPhotoId(response?.data.split(".")[0].split("_")[1]);
    } catch (err) {
      console.log(err.response.data);
    }
  };

  //EDIT

  const setFormFieldsForEditing = (data) => {
    form.setFieldsValue({
      title: data.title,
      category: data.category,
      tags: data.tags.join(","),
      description: data.description,
      uploadedImage: data.photo._id,
    });
    // const imageUrl = `${IMG_URl + data.photo._id}.${
    //   data.photo.name.split(".")[1]
    // }`;
    // setImagePreviewUrl(imageUrl);
  };
  async function editPost(id) {
    try {
      let { data } = await request.get(`post/${id}`);
      setEditFormData(data);
      console.log(data);
      setSelected(id);
      setFormFieldsForEditing(data);
      showModal();
    } catch (err) {
      console.error("Error fetching post data:", err);
      message.error(
        "An error occurred while fetching post data. Please try again."
      );
    }
  }

  const deletePost = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (confirmDelete) {
      await request.delete(`post/${id}`);
      getData(currentPage);
    }
  };

  //ON-FINISH
  const onFinish = async (values) => {
    try {
      const { title, description, tags, category, photo } = values;
      const tagsArray = tags ? tags.split(",").map((tag) => tag.trim()) : [];
      const postData = {
        title,
        description,
        tags: tagsArray,
        category,
        photo: photoId,
      };

      if (selected) {
        let response = await request.put(`post/${selected}`, postData);
        if (response.status === 200) {
          getData();
          message.success("Post edited successfully!");
          hideModal();
        } else {
          message.error("Post creation failed. Please try again.");
        }
        console.log("succes");
      } else {
        const response = await request.post("post", postData);

        getData();

        if (response.status === 201) {
          message.success("Post created successfully!");
          hideModal();
        } else {
          message.error("Post creation failed. Please try again.");
        }
      }
      window.location.reload(false);
    } catch (error) {
      console.error("Error creating post:", error);
      message.error(
        "An error occurred while creating the post. Please try again."
      );
    }
  };


  //======================= PAGINATION ======================//

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(data.pagination?.total / 10);

  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const goToNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  //======================= PAGINATION ======================//

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
            <div className="blog-nav">
              <h1>My Posts</h1>
              <Button type="primary" className="addPostBtn" onClick={showModal}>
                + Add post
              </Button>
            </div>
            <hr />

            <div className="modal_wrapper">
              <Modal
                title={selected ? "Editing Post" : "Add New Post"}
                open={isModalOpen}
                onCancel={hideModal}
                footer={false}
              >
                <Form
                  id="addPostForm"
                  layout="vertical"
                  autoComplete="off"
                  onFinish={onFinish}
                  form={form}
                  initialValues={{
                    category: categories[0]?.name,
                  }}
                >
                  <Form.Item
                    name="title"
                    label="Title"
                    rules={[
                      {
                        required: true,
                        message: "Please enter a title!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    name="category"
                    id="category"
                    label="Category"
                    rules={[
                      {
                        required: true,
                        message: "Please select a category!",
                      },
                    ]}
                  >
                    <Select
                      // defaultValue={categories[0]?.name}
                      style={{
                        width: 120,
                      }}
                      onChange={handleChange}
                      options={sortedCategories}
                    />
                  </Form.Item>
                  <Form.Item
                    name="tags"
                    label="Tags"
                    rules={[
                      {
                        required: true,
                        message: "Please enter at least one tag!",
                      },
                    ]}
                  >
                    <Input
                      value={tags}
                      onChange={(e) => setTags(e.target.value)}
                      placeholder="Enter tags (comma-separated)"
                    />
                  </Form.Item>
                  <Form.Item
                    name="description"
                    label="Description"
                    rules={[
                      {
                        required: true,
                        message: "Please enter a description!",
                      },
                    ]}
                  >
                    <Input.TextArea rows={4} />
                  </Form.Item>
                  <Form.Item label="Upload an image" name="photo">
                    <Upload
                      name="avatar"
                      className="avatar-uploader"
                      showUploadList={false}
                      onChange={uploadPhoto}
                    >
                      Upload
                    </Upload>
                  </Form.Item>
                  <Button danger type="primary" onClick={hideModal}>
                    Close
                  </Button>
                  <Button type="primary" htmlType="submit">
                    {selected ? "Save Post" : "Add Post"}
                  </Button>
                </Form>
              </Modal>
            </div>

            {data.length === 0 ? (
              <h2 className="not-found">Card Not Found</h2>
            ) : (
              data.data.map((el, index) => (
                <Card
                  editPost={editPost}
                  deletePost={deletePost}
                  actions={actions}
                  key={index}
                  data={el}
                />
              ))
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

export default MyPostsPage;
