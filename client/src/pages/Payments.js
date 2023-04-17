import React from "react";
import Layout from "./../components/Layout/Layout";

const Payments = () => {
  return (
    <Layout title={"Payments - Textile shop"}>
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="/images/payments.png"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <h2>PAYMENTS</h2>
          <h3>WHAT ARE THE PAYMENT OPTIONS?</h3>
          <p className="text-justify mt-2">
            You can pay with credit card or via Paypal.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Payments;
