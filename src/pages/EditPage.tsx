import { gql, useApolloClient } from "@apollo/client";
import React, { useState } from "react";
import { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import styled from "styled-components";
import { getDocAPI } from "../apollo/docAPI";
import StarRating from "../components/atoms/StarRating";
import NavigationBar from "../components/organism/NavigationBar";
import { DocAPI } from "../types/DocAPI";
import { ReactComponent as EnterIcon } from '../components/atoms/Enter.svg';
import Profile from "../components/atoms/ProfilePhoto";
import { Rating } from "../types/Rating";
import DefaultProfile from '../components/atoms/DefaultProfile.svg';
import { DocAPILangUsage } from "../types/DocAPILangUsage";
import TextInput from "../components/atoms/TextInput";

const EDIT_PAGE = gql`
    mutation EDIT_PAGE($name:String!, $apiType: String!, $description:String!, $owner:String, $publicEdit:Boolean!, $providerURL:String!, $endPoint:String!, $id:String!){
        updateDocAPI(id:$id, docAPI:{name:$name, apiType:$apiType, description:$description, owner:$owner, publicEdit:$publicEdit, endPoint:$endPoint, providerURL:$providerURL, tags:[]}){
            id
        }
    }
`;

const NEW_DOC_API_USAGE = gql`
    mutation NEW_DOC_API_USAGE($id: String!, $lang:String!, $code:String!){
        createDocAPILangUsage(docAPILangUsage:{
            docAPIId: $id,
            lang: $lang,
            code: $code
        }){
            v
        }
    }
`;

const DELETE_DOC_API_USAGE = gql`
    mutation DELETE_DOC_API_USAGE($id: String!, $lang:String!){
        deleteDocAPILangUsage(lang:$lang, docAPIId:$id)
    }
`

function Editpage(){
    const history = useHistory();
    const client = useApolloClient();
    
    const [selected, setSelected] = useState(0);
    const [docAPI, setDocAPI] = useState<DocAPI>();
    const { id } = useParams<{ id: string }>();
    

    const [docAPILangUsages, setDocAPILangUsages] = useState<{code:string, lang:string}[]>([{
        code: 'new code',
        lang: 'new lang',
    }]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [apiType, setApiType] = useState('');
    const [providerURL, setProviderURL] = useState('');
    const [endPoint, setEndPoint] = useState('');

    useEffect(() => {
        getDocAPI(id, client)
        .then(docAPI => {
            setDocAPI(docAPI);
            setName(docAPI.name);
            setDescription(docAPI.description);
            setApiType(docAPI.apiType);
            setProviderURL(docAPI.providerURL);
            setEndPoint(docAPI.endPoint);
            setDocAPILangUsages(docAPI.docAPILangUsages.map(e => ({code: e.code, lang: e.lang})));
            if(docAPI.docAPILangUsages.length <= 0){
                setDocAPILangUsages([{
                    code: 'new code',
                    lang: 'new lang',
                }]);
            }
        });
    }, [])

    return (
        <>
            <NavigationBar />
            <CenterDiv>
                <Body>
                    <ItemWrapper>
                        <HiddenInput onChange={e => setName(e.target.value)} placeholder="Title" style={{fontSize: 20}} value={name}></HiddenInput>
                        <select style={{
                            display: 'flex',
                            alignItems: 'center',
                            backgroundColor: '#6977F4',
                            height: 32,
                            padding: '0px 15px 0px 15px',
                            borderRadius: 42,
                            color: 'white',
                            marginLeft: 10,
                            outline: 'none',
                        }}
                        value={apiType}
                        onChange={e => setApiType(e.target.value)}>
                            <option value="REST" selected>REST</option>
                            <option value="GQL">GQL</option>
                            <option value="DATA SET">DATA SET</option>
                            <option value="OTHER">OTHER</option>
                        </select>
                    </ItemWrapper>
                    <div style={{backgroundColor: '#9e9e9e60', height: '2px', width:'100%'}}></div>
                    
                    <InputURL>
                        <HiddenInput onChange={e => setProviderURL(e.target.value)} placeholder="Provider url" style={{fontSize: 20, width: '100%'}} value={providerURL}/>
                    </InputURL>

                    <InputURL>
                        <HiddenInput onChange={e => setEndPoint(e.target.value)} placeholder="endPoint" style={{fontSize: 20, width: '100%'}} value={endPoint}/>
                    </InputURL>
                    
                    <DescriptionBox>
                        <HiddenTextarea onChange={e => setDescription(e.target.value)} placeholder="Description" value={description}>
                            
                        </HiddenTextarea>
                    </DescriptionBox>
                    { (docAPILangUsages.length > 0) &&
                        <>
                            <TabWrapper>
                                {docAPILangUsages.map((docAPILangUsage, i) => (
                                    <Tab 
                                        idx={i} 
                                        key={i}
                                        selected={selected}
                                        onClick={() => setSelected(i)}>
                                        <HiddenInput 
                                            value={docAPILangUsage.lang}
                                            style={{width: 100}}
                                            onChange={e => {
                                                if(e.target.value === ''){
                                                    setDocAPILangUsages(docAPILangUsages.filter(e => e.lang !== docAPILangUsage.lang));
                                                    setSelected(prev => prev-1); 
                                                    return;
                                                }   
                                                setDocAPILangUsages(Object.assign(
                                                    [...docAPILangUsages], 
                                                    {[i]: {...docAPILangUsages[i], lang: e.target.value}}))
                                            }}>
                                        </HiddenInput>
                                    </Tab>
                                ))}
                                <Tab 
                                    idx={-1}
                                    selected={selected}
                                    onClick={() => {
                                        setDocAPILangUsages([...docAPILangUsages, {
                                            code: 'new Code',
                                            lang: 'new lang',
                                        }])
                                    }}
                                >
                                    +
                                </Tab>
                            </TabWrapper>
                            <DescriptionBox style={{marginTop: 0, boxShadow:'5px 5px 20px 0px #00000012'}}>
                                <HiddenTextarea 
                                    onChange={e => {
                                    setDocAPILangUsages(Object.assign(
                                        [...docAPILangUsages], 
                                        {[selected]: {...docAPILangUsages[selected], code: e.target.value}}))
                                    }}
                                    value={docAPILangUsages[selected]?.code}
                                >
                                </HiddenTextarea>
                            </DescriptionBox>
                        </>
                    }
                    <AddBtn onClick={e => {
                        client.mutate({
                            mutation: EDIT_PAGE,
                            variables:{
                                name,
                                apiType,
                                description,
                                publicEdit: true,
                                providerURL,
                                endPoint,
                                tags:[],
                                id,
                            }
                        })
                        .then(res => Promise.all(
                            (docAPI?.docAPILangUsages || []).map(e => {
                                client.mutate({
                                    mutation: DELETE_DOC_API_USAGE,
                                    variables: {
                                        id,
                                        lang: e.lang,
                                    }
                                })
                            })
                        ))
                        .then(
                            res => Promise.all(docAPILangUsages.map(api => {
                                client.mutate({
                                    mutation: NEW_DOC_API_USAGE,
                                    variables: {
                                        id,
                                        code: api.code,
                                        lang: api.lang,
                                    }
                                })
                            }))
                        )
                        .then(res => history.push(`/detail/${id}`));
                    }}>
                        Submit
                    </AddBtn>
                </Body>
            </CenterDiv>
        </>
    );
}

const InputURL = styled.div`
    width: 100%;

    border-radius: 15px;
    border: none;

    box-sizing: border-box;
    padding: 10px;
    margin-top: 21px;

    background-color: #F2F3F7;
    box-shadow: 5px 5px 20px 0px #00000012;
`

const AddBtn = styled.button`
    width: 71px;
    height: 33px;
    border-radius: 41px;
    box-shadow: 5px 5px 20px 0px #00000012;
    background-color: #F2F3F7;
    border: 0px;
    outline: none;

    :hover{
        cursor: pointer;
    }
`;

const HiddenTextarea = styled.textarea`
    border: 0px;
    outline: none;
    background-color: #00000000;
    width: 100%;
    height: 300px;
    resize: none;
`;

const HiddenInput = styled.input`
    border: 0px;
    outline: none;
    background-color: #00000000;
`;

const Tab = styled.div<{ idx: number, selected: number }>`
    display: flex;
    justify-content: center;
    align-items: center;

    width: 147px;
    height: 31px;

    margin-right: 8px;
    border-radius: 10px 10px 0px 0px;

    background-color: ${props => (props.idx === props.selected) ? '#F2F3F7' : '#DADADA'};
    
    :hover{
        cursor: pointer;
    }
`;

const TabWrapper = styled.div`
    display: flex;
    justify-content: flex-start;

    box-sizing: border-box;
    width: 100%;
    
    padding-left: 16px;

`;

const DescriptionBox = styled.div`
    width: 100%;
    min-height: 211px;

    box-sizing: border-box;
    padding: 21px;
    margin-top: 22px;
    margin-bottom: 44px;

    border-radius: 15px;
    border: none;

    background-color: #F2F3F7;
    box-shadow: 5px 5px 20px 0px #00000012;
`;

const CenterDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    box-sizing: border-box;
    padding: 10px;

    width: 100%;
`;

const Body = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    
    width: 100%;
    max-width: 1140px;
`;


const ItemWrapper = styled.div`
    display:flex;
    justify-content: space-between;

    width: 100%;

    margin: 0px 5px 5px 5px;
    padding: 10px 5px 5px 5px;
    box-sizing: border-box;
`;

export default Editpage;