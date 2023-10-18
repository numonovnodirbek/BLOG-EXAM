import { Fragment, useEffect, useState } from "react";
import { Button, Form, Input, Modal, Select, message } from "antd";
import { ExclamationCircleFilled } from "@ant-design/icons";

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
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
  const [tags, setTags] = useState("");
  const [selected, setSelected] = useState(null);
  const [categories, setCategories] = useState([]);
  const [photoId, setPhotoId] = useState(null);
  const [form] = Form.useForm();
  const [actions] = useState(true);
  // const [, setEditFormData] = useState(null);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const hideModal = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  useEffect(() => {
    request.get("category").then((response) => {
      setCategories(response.data.data);
    });
  }, [setCategories]);

  const handleInput = (e) => {
    setSearch(e.target.value);
  };
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  useEffect(() => {
    getData(currentPage, search);
  }, [search, currentPage]);


  const getData = async (page, search) => {
    try {
      const response = await request.get(
        `post/user?page=${page}&limit=${LIMIT}&search=${search}`
      );
      // console.log(response);
      setData(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const uploadPhoto = async (e) => {
    try {
      let formData = new FormData();
      formData.append("file", e.file.originFileObj);
      let response = await request.post("auth/upload", formData);
      setImagePreviewUrl(response.data.split(".")[0]);
    } catch (err) {
      console.log(err); 
    }
  };

  const onFinish = async (values) => {
    try {
      const { title, description, tags, category, photo } = values;
      console.log(values);
      const tagsArray = tags ? tags.split(",").map((tag) => tag.trim()) : [];
      const postData = {
        title,
        description,
        tags: tagsArray,
        category,
        photo: photoId,
      };
      console.log(photo);

      // let res = await request.post("post", postData);
      // console.log(res);
      // if (selected === null) {
      //   await request.post("post", postData);
      //   setLoading(false);
      // } else {
      //   await request.put(`post/${selected}`, postData);
      //   setLoading(false);
      // }

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
      hideModal();
    } catch (error) {
      console.error("Error creating post:", error);
      message.error(
        "An error occurred while creating the post. Please try again."
      );
    }
  };

  const setFormFieldsForEditing = (data) => {
    form.setFieldsValue({
      title: data.title,
      category: data.category._id,
      tags: data.tags.join(","),
      description: data.description,
      uploadedImage: data.photo._id,
    });
    const imageUrl = `${IMG_URl + data.photo._id}.${
      data.photo.name.split(".")[1]
    }`;
    setImagePreviewUrl(imageUrl);
  };

  const clearFormFields = () => {
    form.resetFields();
    setImagePreviewUrl(null);
    setPhotoId(null);
  };

  const openModal = () => {
    setIsModalOpen(true);
    clearFormFields();
  };

  async function editPost(id) {
    try {
      let { data } = await request.get(`post/${id}`);
      setEditFormData(data);
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

  async function deletePost(id) {
    try {
      Modal.confirm({
        title: "Confirm",
        icon: <ExclamationCircleFilled />,
        content: "Are you sure you want to delete this post?",
        okText: "Delete",
        cancelText: "Cancel",
        onOk: async () => {
          await request.delete(`post/${id}`);
          message.success("Post deleted successfully!");
          getData();
          window.location.reload(false);
        },
        onCancel: () => {
          console.log("Deletion canceled.");
        },

      });
    } catch (err) {
      console.error("Error deleting post:", err);
      message.error(
        "An error occurred while deleting the post. Please try again."
      );
    }
  }

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
              <Button type="primary" className="addPostBtn" onClick={openModal}>
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
                      options={categories.map((category) => ({
                        value: category?._id,
                        label: category?.name,
                      }))}
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
                  <Form.Item
                    name="photo"
                    label="Image"
                    rules={[
                      {
                        required: false,
                        message: "Please upload an image!",
                      },
                    ]}
                  >
                    <input type="file" onChange={uploadPhoto} />
                    {imagePreviewUrl && (
                      <div className="image-preview">
                        <img
                          style={{
                            width: "150px",
                            borderRadius: "10%",
                            marginTop: "15px",
                          }}
                          src={imagePreviewUrl}
                          alt="Preview"
                        />
                      </div>
                    )}
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
                <Card editPost={editPost} deletePost={deletePost} actions={actions} key={index} data={el} />
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
