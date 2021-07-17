import { gql, useApolloClient } from "@apollo/client";
import { useEffect, useState, useContext } from "react";
import Context from "../context";

export interface User {
    id: string,
    nickname: string,
    profileImg: string
}

function useUser(): User | null {
    const apolloClient = useApolloClient();
    const [user, setUser] = useState<User | null>(null);
    const { logged } = useContext(Context);

    useEffect(() => {
        if(logged) {
            (async () => {
                const res = await apolloClient.query({
                    query: gql`
                        query getUser {
                            currentUser {
                                id,
                                nickname,
                                profileImg
                            }
                        }
                    `
                });
    
                setUser(res.data.currentUser);
            })();
        }
    }, [apolloClient]);

    return user;
}

export default useUser;