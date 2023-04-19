import React, { useState, useEffect } from "react";
import Layout from "./../../components/Layout/Layout";
import AdminMenu from "./../../components/Layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Select } from "antd";
const { Option } = Select;

const EditUser = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [answer, setAnswer] = useState("");

  const { id } = useParams();
  console.log(id);
  // get single user
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await axios.get(`/api/v1/auth/users/${id}`);
        console.log(user);
        setUser(user.data);
        setName(user.data.name);
        setEmail(user.data.email);
        setPhone(user.data.phone);
        setAddress(user.data.address);
        setAnswer(user.data.answer);
        setPassword(user.data.password);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, [id]);

  // update user data
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const updatedUser = {
        name,
        email,
        password,
        phone,
        address,
        answer
      };
  
      await axios.put(`/api/v1/auth/users/${id}`, updatedUser);
      toast.success("User updated successfully");
      navigate("/dashboard/admin/users");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    }
  };

  
  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <Layout title={"Dashboard - Update Banner"}>
      <div className="container-fluid m-3 p-3 form-edit-user">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Edit User</h1>
            <form onSubmit={handleUpdate}>
              <div className="mb-3">
                <input
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                  className="form-control"
                  id="exampleInputEmail1"
                  placeholder="Enter Your Name"
                  required
                  autoFocus
                  value={name}
                  name="name"
                />
              </div>
              <div className="mb-3">
                <input
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-control"
                  id="exampleInputEmail1"
                  placeholder="Enter Your Email "
                  required
                  value={email}
                  name="email"
                />
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-control"
                  id="exampleInputPassword1"
                  placeholder="Enter Your Password"
                  required
                  value={password}
                  name="password"
                />
              </div>
              <div className="mb-3">
                <input
                  type="tel"
                  onChange={(e) => setPhone(e.target.value)}
                  className="form-control"
                  id="exampleInputEmail1"
                  placeholder="Enter Your Phone"
                  required
                  value={phone}
                  name="phone"
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  onChange={(e) => setAddress(e.target.value)}
                  className="form-control"
                  id="exampleInputEmail1"
                  placeholder="Enter Your Address"
                  required
                  value={address}
                  name="address"
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  onChange={(e) => setAnswer(e.target.value)}
                  className="form-control"
                  id="exampleInputEmail1"
                  placeholder="What is Your Favorite sports"
                  required
                  value={answer}
                  name="answer"
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Update
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EditUser;
