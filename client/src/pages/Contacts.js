import React, { useState } from "react";
import Layout from "./../components/Layout/Layout";
import "../styles/ContactUs.css";

const Contacts = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const errors = {};
    if (!name.trim()) {
      errors.name = "Name is required";
    }
    if (!email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email is invalid";
    }
    if (!message.trim()) {
      errors.message = "Message is required";
    }
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      // Submit the form
    }
  };

  return (
    <Layout title={"Contacts us - Ecommer app"}>
      <div className="contact-us">
        <h1>Contact Us</h1>
        <form className="contact-us-form" onSubmit={handleSubmit}>
          <label htmlFor="name">Name:*</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {errors.name && <span className="error">{errors.name}</span>}
          <label htmlFor="email">Email:*</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <span className="error">{errors.email}</span>}
          <label htmlFor="message">Message:*</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
          {errors.message && <span className="error">{errors.message}</span>}
          <div className="form-btns">
            <button type="submit">Send Email</button>
            <button type="reset" className="clear-btn">
              Clear
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Contacts;
