import { ApolloClient, gql } from "@apollo/client";
import { DocAPI } from '../types/DocAPI';

export async function searchDocAPIs(data: {query: string, take: number, skip: number, filter?: string}, apolloClient: ApolloClient<any>): Promise<DocAPI[]> {
    const result = await apolloClient.query({
        query:
            gql`
            query searchDocAPIs($query: String!, $skip: Float, $take: Float, $filter: String) {
                searchDocAPIs(query: $query, skip: $skip, take: $take, filter:$filter) {
                    id,
                    v,
                    name,
                    apiType,
                    description,
                    averageRatingStar,
                    views,
                    createdAt,
                    updatedAt,
                    apiStatus{
                        live
                    }
                }
            }`,
        variables: {
            ...data
        }
    });

    return result.data.searchDocAPIs;
}

export async function getDocAPI(id: string, apolloClient: ApolloClient<any>): Promise<DocAPI> {
    const result = await apolloClient.query({
        query:
            gql`
            query getDocAPI($id: String!) {
                DocAPI(id: $id) {
                    id,
                    v,
                    name,
                    apiType,
                    description,
                    averageRatingStar,
                    views,
                    createdAt,
                    updatedAt,
                    endPoint,
                    providerURL,
                    apiStatus{
                        live,
                        lastResult
                    }
                    ratings{
                        id,
                        star,
                        title,
                        body,
                        createdAt,
                        updatedAt,
                        author{
                            id,
                            nickname,
                            profileImg
                        }
                    }
                    docAPILangUsages{
                        v
                        lang
                        code
                    }
                    owner{
                        id,
                        nickname,
                        profileImg
                    }
                }
            }`,
        variables: {
            id
        }
    });

    return result.data.DocAPI;
}

export async function getDocAPIFromV(v: number, apolloClient: ApolloClient<any>): Promise<DocAPI> {
    const result = await apolloClient.query({
        query:
            gql`
            query getDocAPIFromV($v: Float!) {
                DocAPIV(v: $v) {
                    id,
                    v,
                    name,
                    apiType,
                    description,
                    averageRatingStar,
                    views,
                    createdAt,
                    updatedAt,
                    endPoint,
                    providerURL,
                    apiStatus{
                        live,
                        lastResult
                    }
                    ratings{
                        id,
                        star,
                        title,
                        body,
                        createdAt,
                        updatedAt,
                        author{
                            id,
                            nickname,
                            profileImg
                        }
                    }
                    docAPILangUsages{
                        v
                        lang
                        code
                    }
                    owner{
                        id,
                        nickname,
                        profileImg
                    }
                }
            }`,
        variables: {
            v
        }
    });

    return result.data.DocAPIV;
}





