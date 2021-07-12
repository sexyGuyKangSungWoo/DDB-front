import React, { useState } from "react";
import ColorContext from "./context";
import { useStickyState } from "./StickyState";

const ColorProvider: React.FC = ({ children }) => {

  const [number, setNumber] = useState(0);
  const [stickyJwt, setStickyJwt] = useStickyState('', '@@/P/jwt');

  const state = {
    number,
    setNumber,
    stickyJwt,
    setStickyJwt,
  }

  return (
    <ColorContext.Provider value={state}>
      {children}
    </ColorContext.Provider>
  );
};

export default ColorProvider;