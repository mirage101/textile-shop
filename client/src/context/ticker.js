import { useState, useContext, createContext } from "react";

const TickerContext = createContext();
const TickerProvider = ({ children }) => {
    const [list, setList] =  useState([]);
    
  return (
    <TickerContext.Provider value={[list, setList]}>
      {children}
    </TickerContext.Provider>
  );
};

// custom hook
const useTicker = () => useContext(TickerContext);

export { useTicker, TickerProvider };