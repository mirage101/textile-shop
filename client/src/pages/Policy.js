import React from "react";
import Layout from "./../components/Layout/Layout";

const Policy = () => {
  return (
    <Layout title={"Privacy Policy"}>
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="/images/contactus.jpeg"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <h2>Privacy Policy for Textile Shop</h2>
          <p>
            At Textile Shop Name, we value your privacy and are committed to
            protecting any personal information that you share with us. This
            privacy policy outlines how we collect, use, and protect your
            information.
          </p>
          <h3>Collection of Personal Information</h3>
          <p>
            When you visit our website, we may collect personal information that
            you provide to us such as your name, email address, phone number,
            and shipping address. We may also collect information about your
            device, such as your IP address and browser type.
          </p>
          <h3>Use of Personal Information</h3>
          <p>
            We use your personal information to fulfill your orders and provide
            customer service. We may also use your information to send you
            marketing emails about our products and promotions, unless you opt
            out of receiving these communications.
          </p>
          <p>
            We may share your personal information with third-party service
            providers that help us fulfill your orders and provide customer
            service. We do not sell or rent your personal information to third
            parties.
          </p>
          <h3>Protection of Personal Information</h3>
          <p>
            We take reasonable measures to protect your personal information
            from unauthorized access, disclosure, alteration, and destruction.
            We use encryption and secure server technology to protect your
            information when you place an order on our website.
          </p>
          <h3>Cookies</h3>
          <p>
            We use cookies on our website to improve your browsing experience
            and personalize your experience. Cookies are small files that are
            stored on your device when you visit a website. You can disable
            cookies in your browser settings, but this may limit your ability to
            use certain features on our website.
          </p>
          <h3>Changes to Privacy Policy</h3>
          <p>
            We may update this privacy policy from time to time to reflect
            changes in our business practices or legal requirements. We will
            notify you of any significant changes to this policy by posting a
            notice on our website or sending you an email.
          </p>
          <h3>Contact Us</h3>
          <p>
            If you have any questions or concerns about our privacy policy,
            please contact us at 1-88-888-88.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Policy;
