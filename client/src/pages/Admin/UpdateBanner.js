import React, { useState, useEffect } from "react";
import Layout from "./../../components/Layout/Layout";
import AdminMenu from "./../../components/Layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";
const { Option } = Select;

const UpdateBanner = () => {
  const navigate = useNavigate();
  const params = useParams();

  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [background, setBackground] = useState("");
  const [isActive, setIsActive] = useState("");
  const [order, setOrder] = useState("");
  const [status, setStatus] = useState("Active");
  const [position, setPosition] = useState("Top");
  const [id, setId] = useState("");
  const [banners, setBanners] = useState([]);

  //get single banner
  const getSingleBanner = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/banners/get-banner/${params.slug}`
      );
      setId(data.banner._id);
      setName(data.banner.name);
      setContent(data.banner.content);
      setIsActive(data.banner.isActive);
      setOrder(data.banner.order);
      setStatus(data.banner.status);
      setPosition(data.banner.position);
    } catch (error) {
      console.log(error);
    }
  };
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
    getSingleBanner();
    //eslint-disable-next-line
  }, []);

  //create banner function
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const bannerData = new FormData();
      bannerData.set("name", name);
      bannerData.set("content", content);
      bannerData.set("isActive", isActive);
      bannerData.set("order", order);
      bannerData.set("background", background);
      bannerData.set("position", position);

      console.log(bannerData);
      const { data } = await axios.put(
        `/api/v1/banners/update-banner/${id}`,
        bannerData
      );

      if (data.success) {
        toast.success("Banner Updated Successfully");
        navigate("/dashboard/admin/banner");
      } else {
        toast.error(data.message);
        console.log(data);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
    getAllBanners();
  };

  return (
    <Layout title={"Dashboard - Update Banner"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Update Banner</h1>
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
                  {background ? background.name : "Upload Photo"}
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => setBackground(e.target.files[0])}
                    hidden
                  />
                </label>
              </div>
              <div className="mb-3">
                {background ? (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(background)}
                      alt="background"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                ) : (
                  <div className="text-center">
                    <img
                      src={`/api/v1/banners/background/${id}`}
                      alt="background"
                      height={"100px"}
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
                  showSearch
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
                <button className="btn btn-primary" onClick={handleUpdate}>
                  UPDATE BANNER
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateBanner;
