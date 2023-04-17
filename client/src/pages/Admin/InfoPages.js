import React, { useState, useEffect } from "react";
import Layout from "./../../components/Layout/Layout";
import AdminMenu from "./../../components/Layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import InfopageForm from "../../components/Form/InfopageForm";
import "react-quill/dist/quill.snow.css";
import { Modal } from "antd";
const { Option } = Select;

const InfoPages = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [infopages, setInfopages] = useState([]);
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");
  const [updatedContent, setUpdatedContent] = useState("");

  useEffect(() => {}, []);

  //create product function
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const data = { name, content, isActive };
      axios.post("/api/v1/infopages/create-infopage", data);
      if (data?.success) {
        toast.error(data?.message);
        console.log(data);
      } else {
        toast.success(`Info page ${name} Created Successfully`);
        navigate("/dashboard/admin/infopages");
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `/api/v1/infopages/update-infopage/${selected._id}`,
        { name: updatedName, content: updatedContent }
      );
      if (data?.success) {
        toast.success(`${updatedName} is updated`);
        setSelected(null);
        setUpdatedName("");
        setUpdatedContent("");
        setVisible(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getInfoPages = async () => {
    try {
      const { data } = await axios.get("/api/v1/infopages/get-infopages");
      if (data?.success) {
        setInfopages(data?.infopages);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something wwent wrong in getting catgeory");
    }
  };

  const handleDelete = async (iId) => {
    try {
      const { data } = await axios.delete(
        `/api/v1/infopages/delete-infopage/${iId}`
      );
      if (data.success) {
        toast.success(`category is deleted`);

        getInfoPages();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Somtihing went wrong");
    }
  };

  useEffect(() => {
    getInfoPages();
  }, []);

  return (
    <Layout title={"Dashboard - Info pages"}>
      <div className="container-fluid m-3 p-3 dashboard">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>InfoPages</h1>
            <div className="m-1 w-75">
              <div className="mb-3">
                <h5>Page Name:</h5>
                <input
                  type="text"
                  name="name"
                  value={name}
                  placeholder="write a name"
                  className="form-control"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                {/* <textarea
                  type="text"
                  value={content}
                  placeholder="write a content"
                  className="form-control"
                  onChange={(e) => setContent(e.target.value)}
                /> */}
                <h5>Page Content:</h5>
                <ReactQuill
                  theme="snow"
                  value={content}
                  onChange={setContent}
                  name="content"
                />
              </div>
              <div className="mb-3">
                <h5>Status:</h5>
                <Select
                  bordered={false}
                  name="isActive"
                  placeholder="Select Status "
                  size="large"
                  value={isActive}
                  showSearch
                  className="form-select mb-3"
                  onChange={(value) => {
                    setIsActive(value);
                  }}
                >
                  <Option value="true">Active</Option>
                  <Option value="false">Off</Option>
                </Select>
              </div>
              <div className="mb-3">
                <button className="btn btn-primary" onClick={handleCreate}>
                  Create Page
                </button>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="w-75">
                    <h2>InfoPages:</h2>
                    <table className="table">
                      <thead>
                        <tr>
                          <th scope="col">Name</th>
                          <th scope="col">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {infopages?.map((i) => (
                          <>
                            <tr key={i._id}>
                              <td>{i.name}</td>
                              <td>{i.isActive}</td>
                              <td>
                                <button
                                  className="btn btn-primary ms-2"
                                  onClick={() => {
                                    setVisible(true);
                                    setUpdatedName(i.name);
                                    setUpdatedContent(i.content);
                                    setSelected(i);
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
            <Modal
              onCancel={() => setVisible(false)}
              footer={null}
              open={visible}
            >
              <InfopageForm
                value={updatedName}
                setValue={setUpdatedName}
                handleSubmit={handleUpdate}
                content={content}
                setContent={setUpdatedContent}
              />
            </Modal>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default InfoPages;
