import React from "react";
import Layout from "./../components/Layout/Layout";
import Accordion from "../components/Accordion";

const Faq = () => {
  const accordionData = [
    {
      title: "WHAT IS THE MINIMUM ORDER QUANTITY?",
      content:
        "All our fabrics are available for purchase by the meter.The minimum order quantity is 1 meter.",
    },
    {
      title: "WHAT ARE THE PAYMENT OPTIONS?",
      content: "You can pay with credit card or via Paypal.",
    },
    {
      title: "HOW CAN I TRACK MY SHIPMENT?",
      content:
        "We usually ship the orders with DHL. Therefore, it is possible to track shipments using the tracking number. Once your order has left our warehouse, you will receive a tracking number via email. You can check the status of your shipment, using the DHL website. Click here to go to DHL shipment tracking and under 'track shipment' type in your shipment number.",
    },
    {
      title: "HOW WILL MY ORDER BE SHIPPED?",
      content:
        "As our products are all in stock, we can ship your items within 24 hours/one day of when the order is placed. Shipping costs are calculated according to the weight of the freight. Depending on the terms of payment, we will arrange to send out your merchandise after we receive your order and your payment. We work with DHL and DBSCHENKER for EU countries, CH and NO for Russia and Ukraine.",
    },
    {
      title: "HOW CAN I FILE A COMPLAINT ABOUT GOODS?",
      content:
        "You can submit your complaint by email to claims@texttile-shop.eu. Our customer care staff will respond to you within 24 hours.",
    },
    {
      title: "HOW CAN I FILE A COMPLAINT ABOUT GOODS?",
      content:
        "You can submit your complaint by email to claims@texttile-shop.eu. Our customer care staff will respond to you within 24 hours.",
    },
  ];
  return (
    <Layout title={"FAQ - Textile shop"}>
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img src="/images/faq.png" alt="faq" style={{ width: "100%" }} />
        </div>
        <div className="col-md-4">
          <h1>FREQUENTLY ASKED QUESTIONS</h1>
          {/* accordion */}
          {accordionData.map((item, index) => (
            <Accordion key={index} title={item.title} content={item.content} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Faq;
