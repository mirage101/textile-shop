import React, { useState, useEffect } from "react";
import Layout from "./../../components/Layout/Layout";
import { Link } from "react-router-dom";
import AdminMenu from "./../../components/Layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";
const { Option } = Select;

const CreateBanner = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [background, setBackground] = useState("");
  const [isActive, setIsActive] = useState("");
  const [order, setOrder] = useState("");
  const [banners, setBanners] = useState([]);
  const [status, setStatus] = useState("Active");
  const [position, setPosition] = useState("Top");
  const [updatedName, setUpdatedName] = useState("");
  const [updatedContent, setUpdatedContent] = useState("");

  //get all cat
  const getAllBanners = async () => {
    try {
      const { data } = await axios.get("/api/v1/banners");
      if (data?.success) {
        setBanners(data?.banners);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something wwent wrong in getting catgeory");
    }
  };

  useEffect(() => {
    getAllBanners();
  }, []);

  //create product function
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const bannerData = new FormData();
      bannerData.append("name", name);
      bannerData.append("content", content);
      bannerData.append("isActive", isActive);
      bannerData.append("order", order);
      bannerData.append("background", background);
      bannerData.append("position", position);
      const { data } = axios.post("/api/v1/banners/create-banner", bannerData);
      if (data?.success) {
        toast.error(data?.message);
      } else {
        toast.success("Banner Created Successfully");
        navigate("/dashboard/admin/banner");
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
    getAllBanners();
  };

  const handleDelete = async (bId) => {
    try {
      const { data } = await axios.delete(`/api/v1/banners/${bId}`);
      if (data.success) {
        toast.success(`banner is deleted`);

        getAllBanners();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Somtihing went wrong");
    }
  };

  return (
    <Layout title={"Dashboard - Create Banner"}>
      <div className="container-fluid m-3 p-3 dashboard">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Create Banner</h1>
            <div className="m-1 w-75">
              <div className="mb-3">
                <h5>Banner name</h5>
                <input
                  type="text"
                  value={name}
                  placeholder="write a name"
                  className="form-control"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <h5>Content:</h5>
                <textarea
                  type="text"
                  value={content}
                  placeholder="write a content"
                  className="form-control"
                  onChange={(e) => setContent(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="btn btn-outline-secondary col-md-12">
                  {background ? background.name : "Upload Background"}
                  <input
                    type="file"
                    name="background"
                    accept="image/*"
                    onChange={(e) => setBackground(e.target.files[0])}
                    hidden
                  />
                </label>
              </div>
              <div className="mb-3">
                {background && (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(background)}
                      alt="banner_bg"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                )}
              </div>
              <div className="mb-3">
                <h5>Status</h5>
                <Select
                  bordered={false}
                  placeholder="Select Status "
                  size="large"
                  className="form-select mb-3"
                  onChange={(value) => {
                    setIsActive(value);
                  }}
                >
                  <Option value="Active">Active</Option>
                  <Option value="Not Active">Not Active</Option>
                </Select>
              </div>
              <div className="mb-3">
                <h5>Position</h5>
                <Select
                  bordered={false}
                  placeholder="Select Position "
                  size="large"
                  value={position}
                  showSearch
                  className="form-select mb-3"
                  onChange={(value) => {
                    setPosition(value);
                  }}
                >
                  <Option value="Top">Top</Option>
                  <Option value="Bottom">Bottom</Option>
                  <Option value="Left">Left</Option>
                  <Option value="Right">Right</Option>
                </Select>
              </div>
              <div className="mb-3">
                <h5>Order: </h5>
                <Select
                  bordered={false}
                  placeholder="1"
                  size="large"
                  showSearch
                  className="form-select mb-3"
                  onChange={(value) => {
                    setOrder(value);
                  }}
                >
                  <Option value="1">1</Option>
                  <Option value="2">2</Option>
                  <Option value="3">3</Option>
                  <Option value="4">4</Option>
                  <Option value="5">5</Option>
                </Select>
              </div>
              <div className="mb-3">
                <button className="btn btn-primary" onClick={handleCreate}>
                  Create Banner
                </button>
              </div>
            </div>
            <div className="d-flex flex-wrap">
              Banner list
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">background</th>
                    <th scope="col">Content</th>
                    <th scope="col">isActive</th>
                    <th scope="col">Position</th>
                    <th scope="col">Order</th>
                  </tr>
                </thead>
                <tbody>
                  {banners?.map((b) => (
                    <tr key={b._id}>
                      <td>{b.name}</td>
                      <td>
                        <img
                          src={`/api/v1/banners/background/${b._id}`}
                          alt={b.name}
                          style={{ maxHeight: "40px" }}
                        />
                      </td>
                      <td>{b.content}</td>
                      <td>{b.isActive}</td>
                      <td>{b.position}</td>
                      <td>{b.order}</td>
                      <td>
                        <Link
                          key={b._id}
                          to={`/dashboard/admin/banner/${b._id}`}
                          className="product-link"
                        >
                          Edit
                        </Link>

                        <button
                          className="btn btn-danger ms-2"
                          onClick={() => {
                            handleDelete(b._id);
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
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

export default CreateBanner;
