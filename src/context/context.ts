import React, { createContext } from "react";

// 쉬운 타이핑 위한 함수.
function setStateOf<T>(object: T){
    return (() => {}) as React.Dispatch<React.SetStateAction<T>>;
}

const ColorContext = createContext({
  number: 0,
  setNumber: setStateOf(0),
  stickyJwt: '',
  setStickyJwt: setStateOf(''),
});

export default ColorContext;