import React, { useEffect, useState } from "react";
import Context from "./context";
import { useRawState } from "./StickyState";
import { User } from "./type";
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

    const [user, setUser] = useState<User>({
        isAuthorized: false,
        id: '',
        nickname: '',
    });

    const [jwt, setJwt] = useRawState('', JWT_KEY);

    const state = {
        user,
        setUser,
        jwt,
        setJwt,
    }

    useEffect(() => {
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
        })
    }, [jwt])


    return (
        <Context.Provider value={state}>
            {children}
        </Context.Provider>
    );
};

export default ColorProvider;