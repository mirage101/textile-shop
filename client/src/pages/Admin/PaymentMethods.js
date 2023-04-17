import React, { useState, useEffect } from "react";
import Layout from "./../../components/Layout/Layout";
import AdminMenu from "./../../components/Layout/AdminMenu";
import toast from "react-hot-toast";
import { Select } from "antd";
import axios from "axios";
const { Option } = Select;

const PaymentMethods = () => {
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [formData, setFormData] = useState({
    method: "",
    active: "active",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Make a POST request to the server API endpoint
      await axios.post("/api/v1/payment", formData);

      // Handle success
      console.log("Payment method created successfully");

      // Reset the form data
      setFormData({
        method: "",
        active: "",
      });
    } catch (error) {
      // Handle error
      console.error("Failed to create payment method", error);
    }
  };

  // Handle form input changes
  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const getPaymentMethods = async () => {
    try {
      const { data } = await axios.get("/api/v1/payment/");

      if (data?.success) {
        setPaymentMethods(data?.paymentMethods);
        console.log(data);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something wwent wrong in getting catgeory");
    }
  };
  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(`/api/v1/payment/${id}`);
      if (data?.success) {
        toast.success(`Payment method is deleted`);
        getPaymentMethods();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    getPaymentMethods();
  }, []);
  return (
    <Layout title={"Payment methods - List"}>
      <div className="container-fluid m-3 p-3 dashboard">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Payment methods</h1>
            <form onSubmit={handleSubmit}>
              <label>
                Method:
                <input
                  type="text"
                  name="method"
                  value={formData.method}
                  onChange={handleChange}
                  required
                />
              </label>
              <br />

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
              <button type="submit">Create Payment Method</button>
            </form>

            <div className="w-75">
              <h2>Payment methods:</h2>
              <table className="table">
                <thead>
                  <tr>
                    <th>method</th>
                    <th>status</th>
                  </tr>
                </thead>
                <tbody>
                  {paymentMethods?.map((m) => (
                    <>
                      <tr key={m._id}>
                        <td>{m.method}</td>
                        <td>{m.status}</td>
                        <td>
                          <button className="btn btn-primary ms-2">Edit</button>
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

export default PaymentMethods;
