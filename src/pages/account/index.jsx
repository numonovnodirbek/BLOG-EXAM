import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Fragment, useContext, useEffect, useState } from "react";
import dayjs from "dayjs";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { Button, Col, DatePicker, Form, Input, Row, Spin, Upload, message } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";

import getImage from "../../utils/getImage";

import { AuthContext } from "../../contexts/AuthContext";
import request from "../../server";

import "react-tabs/style/react-tabs.css";
import "../../FormsStyle/style.scss";
import "./style.scss";
import changePasswordSchema from "../../schemas/passwordSchema";

const AccountPage = () => {
  const { user, loading, getUser, setLoading } = useContext(AuthContext);
  const [photoLoading, setPhotoLoading] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    const newUser = { ...user, birthday: dayjs(user?.birthday) };
    form.setFieldsValue(newUser);
    setPhoto(user?.photo);
  }, [form, user]);

  const save = async (values) => {
    try {
      setBtnLoading(true);
      values.birthday = dayjs(values.birthday).toISOString();
      await request.put("auth/details", values);
      getUser();
    } finally {
      setBtnLoading(false);
    }
  };

  const uploadPhoto = async (e) => {
    try {
      setPhotoLoading(true);
      let formData = new FormData();
      formData.append("file", e.file.originFileObj);
      await request.post("auth/upload", formData);
      // window.location.reload(false);
      getUser();
    } finally {
      setPhotoLoading(false);
    }
  };

  const {
    formState: { errors },
    register,
    handleSubmit,
    reset,
  } = useForm({
    resolver: yupResolver(changePasswordSchema),
  });

  const onSubmit = async (data) => {
    console.log(data);
    try {
      setLoading(true)
      await request.put("/auth/password", data);
      reset;
      message.success("Password has changed succesfully!")
    } finally{
      setLoading(false)
    }
  };
  return (
    <Fragment>
      <section id="accountPage">
        <div className="accountPage container">
          <Tabs>
            <div>
              <TabList>
                <Tab>User informations</Tab>
                <Tab>Change password</Tab>
              </TabList>
            </div>
            <div className="tabContent">
              <div className="user-container">
                <TabPanel>
                  <Spin spinning={loading}>
                    <Row gutter={36}>
                      <Col span={10}>
                        <Upload
                          name="avatar"
                          listType="picture-card"
                          className="avatar-uploader"
                          showUploadList={false}
                          onChange={uploadPhoto}
                        >
                          {photo ? (
                            <img
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                              }}
                              src={getImage(photo)}
                              alt="avatar"
                            />
                          ) : (
                            <div>
                              {photoLoading ? (
                                <LoadingOutlined />
                              ) : (
                                <PlusOutlined />
                              )}
                              <div
                                style={{
                                  marginTop: 8,
                                }}
                              >
                                Upload
                              </div>
                            </div>
                          )}
                        </Upload>
                      </Col>
                      <Col span={14}>
                        <Form
                          name="account"
                          autoComplete="off"
                          labelCol={{
                            span: 24,
                          }}
                          wrapperCol={{
                            span: 24,
                          }}
                          form={form}
                          onFinish={save}
                        >
                          <div className="inputWrapper">
                            <Form.Item
                              label="Firstname"
                              name="first_name"
                              rules={[
                                {
                                  required: true,
                                  message: "Please fill !",
                                },
                              ]}
                            >
                              <Input />
                            </Form.Item>
                            <Form.Item
                              label="Lastname"
                              name="last_name"
                              rules={[
                                {
                                  required: true,
                                  message: "Please fill !",
                                },
                              ]}
                            >
                              <Input />
                            </Form.Item>
                          </div>
                          <div className="inputWrapper">
                            <Form.Item
                              label="Username"
                              name="username"
                              rules={[
                                {
                                  required: true,
                                  message: "Please fill !",
                                },
                              ]}
                            >
                              <Input />
                            </Form.Item>
                            <Form.Item label="Phone number" name="phoneNumber">
                              <Input />
                            </Form.Item>
                          </div>
                          <Form.Item label="Email" name="email">
                            <Input />
                          </Form.Item>

                          <Form.Item label="Address" name="address">
                            <Input />
                          </Form.Item>
                          <Form.Item label="Info" name="info">
                            <Input.TextArea />
                          </Form.Item>
                          <Form.Item label="Birthday" name="birthday">
                            <DatePicker />
                          </Form.Item>
                          <Button
                            loading={btnLoading}
                            type="primary"
                            htmlType="submit"
                          >
                            Save
                          </Button>
                        </Form>
                      </Col>
                    </Row>
                  </Spin>
                </TabPanel>
              </div>
              <div className="form-container">
                <TabPanel>
                  <form className="form" onSubmit={handleSubmit(onSubmit)}>
                    <div className="passwordBox">
                      <label htmlFor="currentPassword">Current password</label>
                      <input
                        {...register("currentPassword")}
                        type="password"
                        className="input"
                        id="currentPassword"
                        placeholder="Current password"
                      />
                      {errors.currentPassword ? (
                        <p className="text-danger">{errors.currentPassword.message}</p>
                      ) : null}
                    </div>
                    <div className="passwordBox">
                      <label htmlFor="newPassword">New password</label>
                      <input
                        {...register("newPassword")}
                        type="password"
                        className="input"
                        id="newPassword"
                        placeholder="New password"
                      />
                      {errors.newPassword ? (
                        <p className="text-danger">{errors.newPassword.message}</p>
                      ) : null}
                    </div>
                    <input className="button" type="submit" value="Save" />
                  </form>
                </TabPanel>
              </div>
            </div>
          </Tabs>
        </div>
      </section>
    </Fragment>
  );
};

export default AccountPage;
