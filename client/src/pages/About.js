import React from "react";
import Layout from "./../components/Layout/Layout";

const About = () => {
  return (
    <Layout title={"About us - Ecommer app"}>
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="/images/about.jpeg"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <p className="text-justify mt-2">
          FABRIC HOUSE was founded in 2006 but its origins date back to the 19th century. Berner & Sohn agency, leading clothing fabrics trading company all over Europe, was established on the Berner's smallscale textile family business. Since small designers often hadn't the opportunity to purchase small fabrics amount, Michael Berner the fourth generation agency owner, decided to found FABRIC HOUSE. The main objective was to offer high quality clothing fabrics with a lower minimum order quantity.
          </p>
          <p  className="text-justify mt-2"> Emerging companies & young designers take advantage of our decades- long experience. We can cooperate during the project evolution, from the outset, with lower requests, to higher needs of fabric that can be provided by our related agency ''Berner & Sohn''. A unique service concept integrated by our Online Store and our outstanding sampling service.</p>
        </div>
      </div>
    </Layout>
  );
};

export default About;
