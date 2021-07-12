import React, { createContext } from "react";
import { User } from "./type";

// 쉬운 타이핑 위한 함수.
function setStateOf<T>(object: T) {
    return (() => { }) as React.Dispatch<React.SetStateAction<T>>;
}

const Context = createContext({
    user: null as unknown as User,
    setUser: setStateOf({} as User),
    jwt: '',
    setJwt: setStateOf(''),
});

export default Context;