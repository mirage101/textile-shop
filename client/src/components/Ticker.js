import React, { useState, useEffect } from "react";

function Ticker({ interval, tickerText }) {
  const [text, setText] = useState("");

  useEffect(() => {
    let currentIndex = 0;

    const intervalId = setInterval(() => {
      setText(tickerText[currentIndex]);
      currentIndex = (currentIndex + 1) % tickerText.length;
    }, interval);

    return () => clearInterval(intervalId);
  }, [interval, tickerText]);

  return <div className="ticker">{text}</div>;
}

export default Ticker;
