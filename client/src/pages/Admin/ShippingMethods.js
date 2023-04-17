import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "./../../components/Layout/Layout";
import AdminMenu from "./../../components/Layout/AdminMenu";
import toast from "react-hot-toast";
import { Select } from "antd";
const { Option } = Select;

const ShippingMethods = () => {
  const [shippingMethods, setShippingMethods] = useState([]);
  const [formData, setFormData] = useState({
    method: "",
    active: "active",
    rate: "",
    details: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Make a POST request to the server API endpoint
      await axios.post("/api/v1/shipping", formData);

      // Handle success
      console.log("Shipping method created successfully");

      // Reset the form data
      setFormData({
        method: "",
        active: "",
        rate: "",
        details: "",
      });
    } catch (error) {
      // Handle error
      console.error("Failed to create shipping method", error);
    }
  };

  // Handle form input changes
  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const getShippingMethods = async () => {
    try {
      const { data } = await axios.get("/api/v1/shipping/");

      if (data?.success) {
        setShippingMethods(data?.shippingMethods);
        console.log(data);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something wwent wrong in getting catgeory");
    }
  };
  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(`/api/v1/shipping/${id}`);
      if (data?.success) {
        toast.success(`Shipping method is deleted`);
        getShippingMethods();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    getShippingMethods();
  }, []);
  return (
    <Layout title={"Ticker - Create Ticker"}>
      <div className="container-fluid m-3 p-3 dashboard">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Shipping Methods</h1>
            <form onSubmit={handleSubmit}>
              <label>
                Method:
                <br />
                <input
                  type="text"
                  name="method"
                  value={formData.method}
                  onChange={handleChange}
                  required
                />
              </label>
              <br />
              <label>
                Rate:
                <br />
                <input
                  type="number"
                  name="rate"
                  value={formData.rate}
                  onChange={handleChange}
                  required
                />
              </label>
              <br />
              <label>
                Details:
                <br />
                <textarea
                  name="details"
                  value={formData.details}
                  onChange={handleChange}
                  required
                />
              </label>
              <div className="mb-3">
                Active
                <Select
                  bordered={false}
                  placeholder="active "
                  size="large"
                  showSearch
                  className="form-select mb-3"
                  onChange={(value) =>
                    setFormData({ ...formData, active: value })
                  }
                >
                  <Option value="active">active</Option>
                  <Option value="not active">not active</Option>
                </Select>
              </div>
              <br />
              <button type="submit">Create Shipping Method</button>
            </form>

            <div className="w-75">
              <h2>Shipping methods:</h2>
              <table className="table">
                <thead>
                  <tr>
                    <th>method</th>
                    <th>details</th>
                    <th>rate</th>
                    <th>status</th>
                  </tr>
                </thead>
                <tbody>
                  {shippingMethods?.map((m) => (
                    <>
                      <tr key={m._id}>
                        <td>{m.method}</td>
                        <td>{m.details}</td>
                        <td>{m.rate}</td>
                        <td>{m.status}</td>
                        <td>
                          {/* <button className="btn btn-primary ms-2">Edit</button> */}
                          <button
                            className="btn btn-danger ms-2"
                            onClick={() => {
                              handleDelete(m._id);
                              console.log(m._id);
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

export default ShippingMethods;
