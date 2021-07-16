import React, { createContext } from "react";
import { Todo } from "./type";

// 쉬운 타이핑 위한 함수.
function setStateOf<T>(object: T) {
    return (() => { }) as React.Dispatch<React.SetStateAction<T>>;
}

const Context = createContext({
    jwt: '',
    logged: false,
    setJwt: (value:string)=>{},
    todoList: null as unknown as Todo[],
    setTodoList: setStateOf({} as Todo[])
});

export default Context;