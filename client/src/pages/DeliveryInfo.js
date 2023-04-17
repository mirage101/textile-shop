import React from "react";
import Layout from "./../components/Layout/Layout";
import { Link } from "react-router-dom";

const DeliveryInfo = () => {
  return (
    <Layout title={"Delivery Info - Textile shop"}>
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="/images/delivery.jpg"
            alt="delivery"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <h2>DELIVERY</h2>
          <h3>HOW CAN I TRACK MY SHIPMENT?</h3>
          <p className="text-justify mt-2">
            We usually ship the orders with DHL. Therefore, it is possible to
            track shipments using the tracking number. Once your order has left
            our warehouse, you will receive a tracking number via email. You can
            check the status of your shipment, using the DHL website. Click here
            to go to DHL shipment tracking and under "track shipment" type in
            your shipment number.
          </p>
          <h3>HOW WILL MY ORDER BE SHIPPED?</h3>
          <p className="text-justify mt-2">
            As our products are all in stock, we can ship your items within 24
            hours/one day of when the order is placed. Shipping costs are
            calculated according to the weight of the freight. Depending on the
            terms of payment, we will arrange to send out your merchandise after
            we receive your order and your payment. We work with DHL and
            DBSCHENKER for EU countries, CH and NO for Russia and Ukraine.
          </p>
          <h3>TO WHICH COUNTRIES ARE ORDERS DELIVERD?</h3>
          <p className="text-justify mt-2">We deliver worldwide.</p>
          <h3>HOW MUCH TIME DO SAMPLE SHIPMENTS TAKE TO ARRIVE?</h3>
          <p className="text-justify mt-2">
            Samples are always shipped with an express service and are delivered
            within a few days.
          </p>

          <h3>CAN I TAKE MY ORDER FROM A SHOP</h3>
          <p className="text-justify mt-2">
            Yes, you can find store address on our contact page{" "}
            <Link to="/contact">here</Link>.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default DeliveryInfo;
