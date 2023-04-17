import React, { useState, useRef, useEffect } from "react";
import Layout from "./../../components/Layout/Layout";
import AdminMenu from "./../../components/Layout/AdminMenu";
import axios from "axios";
import toast from "react-hot-toast";
import { Select } from "antd";
const { Option } = Select;
const SliderSettings = () => {
  const [formData, setFormData] = useState({
    name: "",
    content: "",
    arrows: "false",
    status: "on",
  });
  const fileInput = useRef(null);
  const [slides, setSlides] = useState([]);
  const [bgImg, setBgImg] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = new FormData();
    form.append("name", formData.name);
    form.append("content", formData.content);
    form.append("arrows", formData.arrows);
    form.append("status", formData.status);
    if (formData.bgImg) {
      form.append("bgImg", formData.bgImg);
    }
    try {
      const response = await axios.post("/api/v1/slider/create-slide", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log(response.data);
      // code to handle successful form submission
      getSlides();
    } catch (error) {
      console.log(error.response.data);
      // code to handle form submission error
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    // setFormData({ ...formData, [name]: value });
    setFormData((formData) => ({
      ...formData,
      [name]: value,
    }));
  };

  const handleFileChange = (event) => {
    setFormData({ ...formData, bgImg: event.target.files[0] });
  };

  //get
  const getSlides = async () => {
    try {
      const { data } = await axios.get("/api/v1/slider/get-slides");
      if (data?.success) {
        setSlides(data?.slides);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something wwent wrong in getting catgeory");
    }
  };

  //delete
  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(`/api/v1/slider/delete-slide/${id}`);
      if (data.success) {
        toast.success(`slide is deleted`);

        getSlides();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    getSlides();
  }, []);

  return (
    <Layout title={"Slider - Create Slide"}>
      <div className="container-fluid m-3 p-3 dashboard">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Setup Slider</h1>
            <h2>Add slide</h2>
            slides here
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="content">Content</label>
                <textarea
                  id="content"
                  name="content"
                  value={formData.content}
                  onChange={(e) => handleChange("content", e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="arrows">Arrows</label>
                {/* <input
                  type="text"
                  id="arrows"
                  name="arrows"
                  value={formData.arrows}
                  onChange={handleChange}
                /> */}
                <Select
                  bordered={false}
                  placeholder="false"
                  size="large"
                  showSearch
                  className="form-select mb-3"
                  onChange={(value) => handleChange("arrows", value)}
                >
                  <Option value="true">true</Option>
                  <Option value="false">false</Option>
                </Select>
              </div>
              <div className="mb-3">
                <h5>Status</h5>
                <Select
                  bordered={false}
                  placeholder="Select Status "
                  size="large"
                  showSearch
                  className="form-select mb-3"
                  onChange={(value) => handleChange("status", value)}
                >
                  <Option value="on">on</Option>
                  <Option value="on">off</Option>
                </Select>
              </div>
              <div className="mb-3">
                <label className="btn btn-outline-secondary col-md-12">
                  {bgImg ? bgImg.name : "Upload Background"}
                  <input
                    type="file"
                    name="background"
                    accept="image/*"
                    onChange={(e) => setBgImg(e.target.files[0])}
                    hidden
                  />
                </label>
              </div>
              <div className="mb-3">
                {bgImg && (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(bgImg)}
                      alt="banner_bg"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                )}
              </div>
              <div className="mb-3">
                <button className="btn btn-primary" type="submit">
                  CREATE SLIDE
                </button>
              </div>
            </form>
            <div className="w-75">
              <h2>InfoPages:</h2>
              <table className="table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Content</th>
                    <th>Arrows</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {slides?.map((i) => (
                    <>
                      <tr key={i._id}>
                        <td>{i.name}</td>
                        <td>{i.status}</td>
                        <td>
                          <img
                            src={`/api/v1/slider/slide-bg/${i._id}`}
                            alt={i.name}
                            style={{ maxHeight: "40px" }}
                          />
                        </td>
                        <td>
                          <button
                            className="btn btn-primary ms-2"
                            onClick={() => {
                              // setVisible(true);
                              // setUpdatedName(c.name);
                              // setUpdatedDescription(c.description);
                              // setSelected(c);
                            }}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-danger ms-2"
                            onClick={() => {
                              handleDelete(i._id);
                            }}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SliderSettings;
