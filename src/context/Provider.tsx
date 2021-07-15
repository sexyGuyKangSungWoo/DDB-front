import React, { useEffect, useState } from "react";
import Context from "./index";
import { useRawState } from "./StickyState";
import { Todo, User } from "./type";
import { gql, useApolloClient } from '@apollo/client';
import { JWT_KEY } from "./consts";

const GET_USER = gql`
    query GET_USER{
        currentUser{
            id
            nickname
        }
    }
`;

const ColorProvider: React.FC = ({ children }) => {
    
    const client = useApolloClient();
    
    const [jwt, setJwtState] = useRawState('', JWT_KEY);
    function setJwt(value: string) {
        setJwtState(value);
        
        if(!jwt) {
            setUser({
                isAuthorized: false,
                id: '',
                nickname: '',
            });
            return;
        }
        
        client.query({
            query: GET_USER
        })
        .then(res => {
            setUser({
                isAuthorized: true,
                id: res.data.currentUser.id,
                nickname: res.data.currentUser.nickname,
            });
        })
        .catch(e => {
            console.error(e);
        });
    }
    
    const [user, setUser] = useState<User>({
        isAuthorized: false,
        id: '',
        nickname: '',
    });

    const [todoList, setTodoList] = useState<Todo[]>([
        {
            id: 0,
            todo: 'TODO',
            checked: false,
        }
    ]);
    
    const state = {
        user,
        setUser,
        jwt,
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