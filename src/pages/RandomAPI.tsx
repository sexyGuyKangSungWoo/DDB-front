import React from "react";
import { gql, useApolloClient } from '@apollo/client';
import { useHistory } from 'react-router-dom';

function RandomAPI() {
    const client = useApolloClient();
    const history = useHistory();

    async function Run() {
        const res = await client.query({
            query: gql`
                query RandomAPI{
                    RandomDocAPIId
                }
            `,
            fetchPolicy: 'no-cache'
        });

        history.push('/detail/' + res.data.RandomDocAPIId);

    }

    Run();
    return(
        <></>
    );
}

export default RandomAPI;