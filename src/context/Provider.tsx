import React, { useState } from "react";
import Context from "./index";
import { useRawState } from "./StickyState";
import { Todo } from "./type";
import { JWT_KEY } from "./consts";

const ColorProvider: React.FC = ({ children }) => {
    
    const [jwt, setJwt] = useRawState('', JWT_KEY);

    const [todoList, setTodoList] = useState<Todo[]>([
        {
            id: 0,
            todo: 'TODO',
            checked: false,
        }
    ]);
    
    const state = {
        jwt,
        logged: !!jwt,
        setJwt,
        todoList,
        setTodoList,
    }

    return (
        <Context.Provider value={state}>
            {children}
        </Context.Provider>
    );
};

export default ColorProvider;