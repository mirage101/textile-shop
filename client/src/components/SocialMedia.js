import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const SocialMedia = () => {
  return (
    <div className="footer-social">
      <ul className="social-media-menu">
        <li className="social-media-item">
          <FaFacebook className="social-ico" />{" "}
          <span className="social-text">Facebook</span>
        </li>
        <li className="social-media-item">
          <FaInstagram className="social-ico" />{" "}
          <span className="social-text">Instagram</span>
        </li>
        <li className="social-media-item">
          <FaTwitter className="social-ico" />{" "}
          <span className="social-text">Twitter</span>
        </li>
        <li className="social-media-item">
          <FaLinkedin className="social-ico" />{" "}
          <span className="social-text">LinkedIn</span>
        </li>
      </ul>
    </div>
  );
};

export default SocialMedia;
