import React, { useState } from "react";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "../../styles/AuthStyles.css";

const ForgotPasssword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [answer, setAnswer] = useState("");
  const [formErrors, setFormErrors] = useState({});

  const navigate = useNavigate();

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    //client side validation
    const errors = {};
    if (!email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Invalid email format";
    }
    if (!answer) {
      errors.answer = "Answer is required";
    }
    if (!newPassword) {
      errors.newPassword = "Password is required";
    } else if (newPassword.length < 8) {
      errors.newPassword = "Password must be at least 8 characters long";
    }
    if (Object.keys(errors).length === 0) {
      try {
        const res = await axios.post("/api/v1/auth/forgot-password", {
          email,
          newPassword,
          answer,
        });
        if (res && res.data.success) {
          toast.success(res.data && res.data.message);

          navigate("/login");
        } else {
          toast.error(res.data.message);
        }
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong");
      }
    } else {
      setFormErrors(errors);
    }
  };
  return (
    <Layout title={"Forgot Password"}>
      <div className="form-container ">
        <form onSubmit={handleSubmit}>
          <h4 className="title">RESET PASSWORD</h4>

          <div className="mb-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`form-control ${formErrors.email ? "is-invalid" : ""}`}
              id="exampleInputEmail1"
              placeholder="Enter Your Email "
              required
            />
            {formErrors.email && (
              <div className="invalid-feedback">{formErrors.email}</div>
            )}
          </div>
          <div className="mb-3">
            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className={`form-control ${
                formErrors.answer ? "is-invalid" : ""
              }`}
              id="exampleInputEmail1"
              placeholder="Enter Your favorite Sport Name "
              required
            />
            {formErrors.answer && (
              <div className="invalid-feedback">{formErrors.answer}</div>
            )}
          </div>
          <div className="mb-3">
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className={`form-control ${
                formErrors.newPassword ? "is-invalid" : ""
              }`}
              id="exampleInputPassword1"
              placeholder="Enter Your Password"
              required
            />
            {formErrors.newPassword && (
              <div className="invalid-feedback">{formErrors.newPassword}</div>
            )}
          </div>

          <button type="submit" className="btn btn-primary">
            RESET
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default ForgotPasssword;
