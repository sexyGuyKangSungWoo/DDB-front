import React from "react";
import NavigationBar from "../components/organism/NavigationBar";
import testimg from './testimg.jpg';
import styled from 'styled-components';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useState } from "react";
import { useEffect } from "react";
import { DocAPI } from '../types/DocAPI';
import StarRating from "../components/atoms/StarRating";
import { searchDocAPIs } from "../apollo/docAPI";
import { useApolloClient, gql } from "@apollo/client";


export function useURLQuery() {
    return new URLSearchParams(useLocation().search);
}

const GET_COUNT = gql`
    query GET_COUNT($query: String!, $filter: String ){
        searchDocAPIcount(query: $query, filter: $filter)
    }
`;


function SearchResult(){
    const query = useURLQuery();
    const history = useHistory();
    const searchQuery = query.get('query') ?? '';
    let page = parseInt(query.get('page') || '1') ?? 1;
    page = isNaN(page) ? 1: page;
    const [docAPIs, setDocAPIs] = useState<DocAPI[]>([]);
    const [maxCount, setMaxCount] = useState(0);
    const apolloClient = useApolloClient();

    const [apiType, setApiType] = useState('ALL');

    
    
    const ELEMENTCOUNT = 10;
    
    useEffect(() => {
        console.log(apiType);
        if(searchQuery === undefined)
            history.push('/')
        else{
            searchDocAPIs({
                query: searchQuery,
                filter: (apiType === 'ALL') ? undefined : apiType,
                take: ELEMENTCOUNT,
                skip: (page-1)*ELEMENTCOUNT,
            }, apolloClient)
            .then(docAPIs => setDocAPIs(() => docAPIs))
            .then(res => (
                apolloClient.query({
                    query: GET_COUNT,
                    variables: {
                        query: searchQuery,
                        filter: (apiType === 'ALL') ? undefined : apiType,
                    }
                })
            ))
            .then(res => setMaxCount(parseInt(res.data.searchDocAPIcount)))
            .catch(console.error);
        }
    }, [searchQuery, apiType]);

    return (
        <div>
            <NavigationBar 
                initValue={searchQuery} />
            <TopDiv>
                <MidBar>
                    {searchQuery ? <SearchResultBox>{searchQuery}에 대한 검색결과</SearchResultBox> : <SearchResultBox>전체 API</SearchResultBox>}
                    
                    <div style={{display:"flex"}}>
                        <select style={{
                            display: 'flex',
                            alignItems: 'center',
                            backgroundColor: '#c4c4c4',
                            height: 32,
                            padding: '0px 15px 0px 15px',
                            borderRadius: 42,
                            color: 'black',
                            marginLeft: 10,
                            outline: 'none',
                        }}
                        value={apiType}
                        onChange={e => setApiType(e.target.value)}>
                            <option value="ALL">ALL</option>
                            <option value="REST">REST</option>
                            <option value="GQL">GQL</option>
                            <option value="DATA SET">DATA SET</option>
                            <option value="OTHER">OTHER</option>
                        </select>
                    </div>
                </MidBar>
                <br />
                <SearchedItems>
                    {docAPIs?.map(e => (
                        <SearchedItem {...e} key={e.id} queryString={searchQuery}/>
                    ))}
                </SearchedItems>
                <PageDiv>
                    {//@ts-ignore
                    [...Array(Math.ceil(maxCount/ELEMENTCOUNT)).keys()].map(i => (
                        <Link 
                            to={`/search?query=${searchQuery}&page=${i+1}`}
                            style={{marginRight: 10}}
                            key={i}
                        >
                            {i+1}
                        </Link>
                    ))}
                </PageDiv>
            </TopDiv>
        </div>  
    );
}

const PageDiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    
    width: 100%;
    height: 56px;

    margin-top: 10px;

    background-color: #DDDDDD;
`;

const TopDiv = styled.div`
    display: flex;
    flex-direction: column;

    align-items: center;

    width: 100%;
    margin-top: 2vh;
`;

const MidBar = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    width: 100%;
    max-width: 1123px;
`;

const SearchedItems = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    
    width: 100%;
    max-width: 1123px;

`;

const SearchResultBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    
    width: auto;
    height: 43px;

    line-height: 43px;
    font-size: 20px;
    background-color: #c4c4c4;
    
    padding-left: 13px;
    padding-right: 13px;
    border-radius: 10px;
`;


function SearchedItem({ queryString, ...docAPI }: DocAPI & { queryString?: string }) {

    const history = useHistory();
    const apolloClient = useApolloClient();

    async function onClick() {
        await apolloClient.mutate({
            mutation: gql`
                mutation incrementView($id: String!) {
                    incrementDocAPIViews(id: $id)
                }
            `,
            variables: {
                id: docAPI.id
            }
        });
        window.scrollTo(0, 0);
        history.push(`/detail/${docAPI.id}?query=${encodeURIComponent(queryString ?? '')}`);
    }

    return (
        <>
            <div style={{backgroundColor: '#9e9e9e60', height: '2px', width:'100%'}}></div>
            <ItemWrapper onClick={onClick}>
                <div>
                    <div style={{display: "flex", alignItems: "center"}}>
                        <h2 style={{
                            marginBottom: '10px'
                        }}>{docAPI.name}</h2>
                        <span
                            style={{
                                marginTop: '12px',
                                display: 'flex',
                                backgroundColor: docAPI?.apiStatus.live ? '#81EA7F' : 'red',
                                borderRadius: '100%',
                                width: 11,
                                height: 11,
                                marginLeft: 6
                            }}
                        />
                    </div>
                    <p style={{
                        marginTop: '0',  
                    }}>{docAPI.description}</p>
                </div>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-end'
                }}>
                    <span style={{
                        display: 'flex',
                        alignItems: 'center',
                        backgroundColor: '#F46969',
                        width: 'auto',
                        height: 32,
                        padding: '0px 15px 0px 15px',
                        borderRadius: 42,
                        color: 'white',
                        marginLeft: 10,
                        marginTop: 10
                    }}>
                        {docAPI?.apiType}
                    </span>
                    <div style={{ marginTop: '9px' }}>
                        <StarRating score={docAPI.averageRatingStar}/>  
                    </div>
                    <p style={{marginBottom: 0, color: 'rgba(0, 0, 0, 0.6)', fontSize: '10pt'}}>
                        {isoFormat(docAPI.createdAt.toString())}
                    </p>
                    <p style={{marginTop: 0, color: 'rgba(0, 0, 0, 0.6)', fontSize: '10pt'}}>
                        {docAPI.views} views
                    </p>
                </div>
            </ItemWrapper>
        </>
    );
}







export function isoFormat(iso: string) {
    const date = new Date(Date.parse(iso) + 1000*60*60*9);
    return dateFormat(date);
}

export function dateFormat(date: Date) {
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let hour = date.getHours();
    let minute = date.getMinutes();
    let second = date.getSeconds();

    // @ts-ignore
    month = month >= 10 ? month : '0' + month;
    // @ts-ignore
    day = day >= 10 ? day : '0' + day;
    // @ts-ignore
    hour = hour >= 10 ? hour : '0' + hour;
    // @ts-ignore
    minute = minute >= 10 ? minute : '0' + minute;
    // @ts-ignore
    second = second >= 10 ? second : '0' + second;

    return date.getFullYear() + '-' + month + '-' + day + ' ' + hour + ':' + minute; // + ':' + second;
}



const ItemWrapper = styled.div`
    display:flex;
    justify-content: space-between;

    width: 100%;

    &:hover {
        cursor: pointer;
        background-color: rgba(0, 0, 0, 0.1);   
    }

    transition: background-color 0.3s;

    margin: 0px 5px 0px 5px;
    padding: 5px 20px 10px 20px;
    min-height: 150px;
    box-sizing: border-box;
`;



export default SearchResult;