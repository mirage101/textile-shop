import React from 'react';
import '../styles/Banner.css'
const Banner = (props) => {
  return (
    <div style={{ backgroundColor: props.backgroundColor }} className="banner-container">
      <h1>{props.title}</h1>
    </div>
  );
};

export default Banner;
