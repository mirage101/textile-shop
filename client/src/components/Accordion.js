import { useState } from "react";
import "../styles/Accordion.css";

const Accordion = ({ title, content }) => {
    const [isOpen, setIsOpen] = useState(false);
  
    const toggleAccordion = () => {
      setIsOpen(!isOpen);
    };
  
    return (
      <div className="accordion">
        <div className="accordion-header" onClick={toggleAccordion}>
          <h3>{title}</h3>
          <span className={`icon ${isOpen ? "minus" : "plus"}`}></span>
        </div>
        {isOpen && <div className="accordion-body">{content}</div>}
      </div>
    );
  };
  

export default Accordion;