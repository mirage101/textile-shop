import React, { useState, useEffect } from "react";
import Footer from "./Footer";
import Header from "./Header";
import { Helmet } from "react-helmet";
import { Toaster } from "react-hot-toast";
import { useAuth } from "../../context/auth";
import axios from "axios";
import "../../styles/LayoutStyles.css";

const Banner = ({ banner, position }) => {
  const [imageSrc, setImageSrc] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("/api/v1/banners/");
      // const data = response.data;
      // const base64Data = data.background.data.$binary.base64;
      // const binaryData = atob(base64Data);
      // const blob = new Blob([binaryData], {
      //   type: data.background.contentType,
      // });
      // const url = URL.createObjectURL(blob);
      // setImageSrc(url);
    };
    fetchData();
  }, []);
  return (
    <div
      className="banner"
      style={{
        backgroundImage: `url('/api/v1/banners//background/${banner._id}')`,
      }}
    >
      <h2>{banner.content}</h2>
    </div>
  );
};

const Layout = ({ children, title, description, keywords, author }) => {
  const [auth] = useAuth();
  //get banner position from db
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    // Make an API call to fetch the banner data
    fetch("/api/v1/banners/")
      .then((res) => res.json())
      .then((data) => setBanners(data.banners));
  }, []);

  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>

      <Header />
      <main>
        <Toaster />

        <div className="top-banner">
          {banners
            .filter((banner) => banner.position === "Top")
            .map((banner) => (
              <Banner key={banner._id} banner={banner} />
            ))}
        </div>
        <div className="main">
          <div className="left-banner">
            {banners
              .filter((banner) => banner.position === "Left")
              .map((banner) => (
                <Banner key={banner._id} banner={banner} />
              ))}
          </div>

          {children}
          <div className="right-banner">
            {banners
              .filter((banner) => banner.position === "Right")
              .map((banner) => (
                <Banner key={banner._id} banner={banner} />
              ))}
          </div>
        </div>
        <div className="bottom-banner">
          {banners
            .filter((banner) => banner.position === "Bottom")
            .map((banner) => (
              <Banner key={banner._id} banner={banner} />
            ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

Layout.defaultProps = {
  title: "Textile shop",
  description: "",
  keywords: "",
  author: "Ivan Filipov",
};

export default Layout;
