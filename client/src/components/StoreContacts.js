import React from "react";
import { FaPhone, FaCalendarAlt, FaMailBulk } from "react-icons/fa";

const StoreContacts = () => {
  return (
    <div className="store-contacts">
      <div className="store-telephone">
        <FaPhone /> <a href="tel:+39 0574 871610">+39 0574 871610</a>
      </div>
      <div className="store-work-time">
        <FaCalendarAlt /> Mon-Thu: 08.30-18.00, Fri: 08.30-16.00
      </div>
      <div className="store-email">
        <FaMailBulk />
        <a mailto="info@fabric-house.eu">info@fabric-house.eu</a>
      </div>
      <div className="store-contact-comments">Any time</div>
    </div>
  );
};

export default StoreContacts;
