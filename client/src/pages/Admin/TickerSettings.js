import React, { useState, useEffect } from "react";
import Layout from "./../../components/Layout/Layout";
import AdminMenu from "./../../components/Layout/AdminMenu";
const TickerSettings = () => {
  const [inputValue, setInputValue] = useState("");
  const [list, setList] = useState([]);
  const [inputError, setInputError] = useState("");
  const [ticker, setTicker] = useState([]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    setInputError("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (inputValue.trim() === "") {
      setInputError("Please enter a value");
      return;
    }
    setList([...list, inputValue]);
    setInputValue("");
    setInputError("");
  };

  //   const getTicker = async () => {
  //     try {
  //       const ticker = await axios.get("/api/v1/modules/get-ticker");

  //       if (ticker?.success) {
  //         setTicker(ticker?.shippingMethods);
  //         console.log(ticker);
  //       }
  //     } catch (error) {
  //       console.log(error);
  //       toast.error("Something wwent wrong in getting catgeory");
  //     }
  //   };
  return (
    <Layout title={"Ticker - Create Ticker"}>
      <div className="container-fluid m-3 p-3 dashboard">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Setup Ticker</h1>
            <h2>Ticker words</h2>
            <form className="d-flex search-form" onSubmit={handleSubmit}>
              <div className="mb-3">
                <input
                  className="form-control me-2"
                  type="text"
                  placeholder="Input word"
                  aria-label="Input word"
                  value={inputValue}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <button className="btn btn-outline-success" type="submit">
                  Submit
                </button>
              </div>
            </form>
            <div className="error">{inputError && <p>{inputError}</p>}</div>
            <ul>
              {list.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TickerSettings;
