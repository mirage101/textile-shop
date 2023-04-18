import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
const Users = () => {
  const [users, setUsers] = useState([]);

  //getall users
  const getAllUsers = async () => {
    try {
      const { data } = await axios.get("/api/v1/auth/users");
      setUsers(data.users);
    } catch (error) {
      console.log(error);
      toast.error("Someething Went Wrong");
    }
  };

  const editUserRoleHandler = async (id) => {
    try {
      if (!window.confirm("Are you sure you want to change the user's role?")) {
        return;
      }

      // Determine the new role
      const user = users.find((user) => user._id === id);
      const newRole = user.role === 1 ? 0 : 1;

      const { data } = await axios.put(`/api/v1/auth/users/${id}`, {
        role: newRole,
      });

      const updatedUser = { ...user, role: newRole };
      const updatedUsers = users.map((user) =>
        user._id === id ? updatedUser : user
      );
      setUsers(updatedUsers);

      toast.success("User role changed successfully");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const deleteUserHandler = async (id) => {
    console.log("delete user");
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <Layout title={"Dashboard - All Users"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>All Users</h1>
            <table class="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Address</th>
                  <th>Role</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {users?.map((u) => (
                  <tr key={u._id}>
                    <td>{u.name}</td>
                    <td>
                      <Link to={`mailto:${u.email}`}>{u.email}</Link>
                    </td>
                    <td>{u.phone}</td>
                    <td>{u.address}</td>
                    <td>{u.role === 1 ? "Admin" : "User"}</td>
                    <td>
                      <button onClick={() => editUserRoleHandler(u._id)}>
                        change role
                      </button>
                    </td>
                    <td>
                      <button onClick={() => deleteUserHandler(u._id)}>
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
    </Layout>
  );
};

export default Users;
