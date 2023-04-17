import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SocialMedia from "../SocialMedia";
import StoreContacts from "../StoreContacts";
const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [fixedFooter, setFixedFooter] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      var body = document.body,
        html = document.documentElement;
      var height = Math.max(
        body.scrollHeight,
        body.offsetHeight,
        html.clientHeight,
        html.scrollHeight,
        html.offsetHeight
      );

      const windowHeight = window.innerHeight;
      if (height <= windowHeight) {
        setFixedFooter(true);
      }
    };

    handleResize();
  }, []);
  return (
    <div className={`footer ${fixedFooter ? "footer-fixed" : ""}`}>
      <div className="store-info">
        <StoreContacts />
      </div>
      <div className="footer-menus">
        <div className="footer-menu-nav">
          <p className="text-center mt-3">
            <Link to="/about">About</Link>|<Link to="/contact">Contact</Link>|
            <Link to="/policy">Privacy Policy</Link>|<Link to="/faq">FAQ</Link>|
            <Link to="/delivery">Delivery</Link>|
            <Link to="/payments">Payment</Link>|
            <Link to="/returns">Returns</Link>
          </p>
        </div>
      </div>
      <div className="footer-misc">
        <SocialMedia />
      </div>
      <div className="footer-copyright">
        <h4 className="text-center">
          Textile Shop - All Right Reserved &copy; {currentYear}
        </h4>
      </div>
    </div>
  );
};

export default Footer;
