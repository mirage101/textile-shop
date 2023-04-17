import React from "react";
import Layout from "./../components/Layout/Layout";
const Returns = () => {
  return (
    <Layout title={"Returns - Textile shop"}>
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="/images/returns.jpg"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <h2> RETURNS POLICIES</h2>
          <h3>CLAIMS, CANCELLATION, RETURNS POLICIES</h3>
          <h4> COMPLAINTS, TERMS AND TERMINATION</h4>
          <p className="text-justify mt-2">
            Any complaints related to damages of the goods must be forwarded in
            writing to the Seller. No claims will be considered after 8 days
            from good-receipt in case of evident damages, and within 8 days from
            the discovery of non-evident damages. Claims must include a detailed
            description of the reported damages and a video and photo
            documentation.
          </p>
          <h4>
            CLAIMS ADMISSIBILITY AND SELLER’S LIMITATION OF RESPONSIBILITY
          </h4>
          <p className="text-justify mt-2">
            The Seller can only respond to claims in conformity with the point
            1. No claim will be admitted if the goods have been wholly or
            partially worked up and or handed over. The Buyer who works up the
            goods, even if damaged, without previously checking it, loses every
            right to a potential compensation. In any case, the Seller will be
            only responsible for picking up the goods and refund the Buyer the
            price payed for the goods. Differences in colours, touch of the
            fabric exc. (within the limits of the normal tolerance) will not be
            considered as contestations. Concerning damages that partially
            affect the fabric (like rips, holes, etc.) there will be a tolerance
            of 10cm of fabric each. Claimed goods must be at Seller’s disposal
            for any necessary test and shall be perfectly conserved. The Buyer
            cannot make a claim about the non-suitability of the goods, since
            the sale is by sample. It is the responsibility of the Buyer to
            previously check the suitability of the goods, depending on the aim.
          </p>
          <h4>DIFFERENT FABRICS MANUFACTURING</h4>
          <p className="text-justify mt-2">
            Fabrics from different lots must be used separately. The Seller is
            not responsible for any damage or loss in case of non-observance of
            this disposition.
          </p>
          <h4>SOLVE ET REPETE</h4>
          <p className="text-justify mt-2">
            In case of a claim presentation, the Buyer must anyway pay the
            invoices respecting the established deadlines.
          </p>
          <p className="text-justify mt-2">
            If the conditions of the claim are satisfied, the interest on the
            potentially refunded amount will be accredited to the Buyer (in
            conformity with the point 2) according to the payment date,
            according to the legal rate in force at the payment date.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Returns;
