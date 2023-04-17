import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import "../styles/Slider.css";

export default function Slider(props) {
  const [slides, setSlides] = useState([]);
  const [activeSlide, setActiveSlide] = useState(0);
  let totalSlides;

  function slide(action) {
    if (action === "next") {
      if (activeSlide < totalSlides - 1) {
        setActiveSlide((previousState) => previousState + 1);
      } else {
        setActiveSlide(0);
      }
    } else if (action === "prev") {
      if (activeSlide === 0) {
        setActiveSlide(totalSlides - 1);
      } else {
        setActiveSlide((previousState) => previousState - 1);
      }
    }
  }

  //get slides
  const getSlides = async () => {
    try {
      const { data } = await axios.get("/api/v1/slider/get-slides");
      if (data?.success) {
        setSlides(data?.slides);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting category");
    }
  };

  useEffect(() => {
    getSlides();
    // Update the active slide every 5 seconds
    const intervalId = setInterval(() => {
      slide("next");
    }, 5000);

    return () => clearInterval(intervalId);
  }, [activeSlide]);

  const slideImages = [];

  totalSlides = slideImages.length;

  return (
    <div className="slider">
      <div className="slides">
        {slides?.map((slide, index) => {
          return (
            <React.Fragment key={slide._id}>
              <div
                className={`slide
          ${index === activeSlide ? "active" : ""} 
          ${index === activeSlide + 1 ? "next" : ""} 
          ${index === activeSlide - 1 ? "prev" : ""} 
          ${activeSlide === 0 && index === totalSlides - 1 ? "prev" : ""}
          ${activeSlide === totalSlides - 1 && index === 0 ? "next" : ""}
          slider-container
        `}
              >
                <h4>{slide.content}</h4>
                <img
                  src={`/api/v1/slider/slide-bg/${slide._id}`}
                  alt={slide.name}
                  className="slider-bg"
                />
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
