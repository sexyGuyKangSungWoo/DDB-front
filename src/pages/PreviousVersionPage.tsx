import React from "react";
import NavigationBar from "../components/organism/NavigationBar";
import styled from 'styled-components';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { useState } from "react";
import { useEffect } from "react";
import { DocAPI } from '../types/DocAPI';
import StarRating from "../components/atoms/StarRating";
import { getDocAPI } from "../apollo/docAPI";
import { useApolloClient, gql } from "@apollo/client";


const GET_DOC_API_HISTORY = gql`
    query GET_DOC_API_HISTORY($id: String!){
        DocAPIHistory(id:$id){
            v,
            apiType,
            description,
            createdAt,
            averageRatingStar
            views
        }
    }
`;


export function useURLQuery() {
    return new URLSearchParams(useLocation().search);
}



function PreviousVersionPage(){
    const query = useURLQuery();
    const history = useHistory();
    const [docAPI, setDocAPI] = useState<DocAPI>();
    const [versions, setVersions] = useState<DocAPI[]>([]);
    const client = useApolloClient();

    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        getDocAPI(id, client)
        .then(docAPI => {
            setDocAPI(docAPI);
        })
        .then(res => (
            client.query({
                query: GET_DOC_API_HISTORY,
                variables: {
                    id,
                }
            })
        ))
        .then(res => {
            setVersions(res.data.DocAPIHistory);
        })
    }, []);

    return (
        <div>
            <NavigationBar 
                initValue={''} />
            <CenterDiv>
                <Body>
                    <ItemWrapper>
                        <div style={{display: 'flex', alignItems: 'center'}}>
                            <h2>{docAPI?.name}</h2>
                            <span style={{
                                display: 'flex',
                                alignItems: 'center',
                                backgroundColor: '#F46969',
                                height: 32,
                                padding: '0px 15px 0px 15px',
                                borderRadius: 42,
                                color: 'white',
                                marginLeft: 10,
                            }}>
                                {docAPI?.apiType}
                            </span>
                            <span
                                style={{
                                    display: 'flex',
                                    backgroundColor: docAPI?.apiStatus.live ? '#81EA7F' : 'red',
                                    borderRadius: '100%',
                                    width: 11,
                                    height: 11,
                                    marginLeft: 22
                                }}
                            />
                        </div>
                        <div>
                            <StarRating score={docAPI?.averageRatingStar || 1} />
                            views: {docAPI?.views}
                        </div>
                    </ItemWrapper>
                </Body>
                <SearchedItems>
                    {versions.map(e => (
                        <SearchedItem {...e} key={e.v}/>
                    ))}
                </SearchedItems>
            </CenterDiv>
        </div>  
    );
}

const Body = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    
    width: 100%;
    max-width: 1140px;
`;

const SearchedItems = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    
    width: 100%;
    max-width: 1123px;

`;

const CenterDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    box-sizing: border-box;
    padding: 10px;

    width: 100%;
`;


function SearchedItem({ ...docAPI }: DocAPI ) {

    const history = useHistory();
    const apolloClient = useApolloClient();

    const { id } = useParams<{ id: string }>();

    function onClick() {
        window.scrollTo(0, 0);
        history.push(`/detail/${id}/history/${docAPI.v}`);
    }

    return (
        <>
            <div style={{backgroundColor: '#9e9e9e60', height: '2px', width:'100%'}}></div>
            <ItemWrapper onClick={onClick}>
                <div>
                    <div style={{display: "flex", alignItems: "center"}}>
                        <h2>{docAPI.name} (Version {docAPI.v})</h2>
                    </div>
                    <p>{docAPI.description}</p>
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
                        {dateFormat(new Date(Date.parse(docAPI.createdAt.toString()) + 1000*60*60*9))}
                    </p>
                    <p style={{marginTop: 0, color: 'rgba(0, 0, 0, 0.6)', fontSize: '10pt'}}>
                        {docAPI.views} views
                    </p>
                </div>
            </ItemWrapper>
        </>
    );
}



function dateFormat(date: Date) {
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
    padding: 10px 5px 5px 5px;
    height: 150px;
    box-sizing: border-box;
`;


export default PreviousVersionPage;