import React, { useState } from "react";
import Context from "./index";
import { useRawState } from "./StickyState";
import { JWT_KEY } from "./consts";

const Provider: React.FC = ({ children }) => {
    
    const [jwt, setJwt] = useRawState('', JWT_KEY);
    
    const state = {
        jwt,
        logged: !!jwt,
        setJwt,
    }

    return (
        <Context.Provider value={state}>
            {children}
        </Context.Provider>
    );
};

export default Provider;