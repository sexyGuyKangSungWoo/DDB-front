import { useApolloClient, gql } from "@apollo/client";
import React, { useState } from "react";
import { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import styled from "styled-components";
import { getDocAPI, getDocAPIFromV } from "../apollo/docAPI";
import StarRating from "../components/atoms/StarRating";
import NavigationBar from "../components/organism/NavigationBar";
import { DocAPI } from "../types/DocAPI";
import { ReactComponent as EnterIcon } from '../components/atoms/Enter.svg';
import Profile from "../components/atoms/ProfilePhoto";
import { Rating } from "../types/Rating";
import DefaultProfile from '../components/atoms/DefaultProfile.svg';
import { isoFormat } from './SearchResult';
import Highlight from 'react-highlight';
import 'highlight.js/styles/github.css';




function Detail({ v }: { v?: number }){
    const history = useHistory();
    const client = useApolloClient();

    const [docAPI, setDocAPI] = useState<DocAPI>();

    const [selected, setSelected] = useState(0);
    
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        if(v !== undefined) {
            getDocAPIFromV(v, client)
            .then(docAPI => {
                setDocAPI(docAPI);
            });
        } else {
            getDocAPI(id, client)
            .then(docAPI => {
                setDocAPI(docAPI);
            });
        }
    }, [])
    

    return (
        <>
            <NavigationBar />
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
                            <StarRating score={docAPI?.averageRatingStar ?? 0} />
                            views: {docAPI?.views}
                        </div>
                    </ItemWrapper>
                    <div style={{backgroundColor: '#9e9e9e60', height: '2px', width:'100%'}}></div>
                    {(docAPI?.providerURL || docAPI?.endPoint) &&
                        <DescriptionBox style={{minHeight: 20}}>
                            {docAPI?.endPoint && <p>endPoint: <a href={docAPI?.endPoint}>{docAPI?.endPoint}</a></p>}
                            {docAPI?.providerURL && <p>provider URL: <a href={docAPI?.providerURL}>{docAPI?.providerURL}</a></p>}
                        </DescriptionBox>
                    }
                    <DescriptionBox>
                        {docAPI?.description}
                        {
                            docAPI?.apiStatus.lastResult &&
                            <LastResult result={docAPI?.apiStatus.lastResult || ''}/>
                        }
                    </DescriptionBox>
                    { ((docAPI?.docAPILangUsages.length || 0) > 0) &&
                        <>
                            <TabWrapper>
                                {docAPI?.docAPILangUsages.map((docAPILangUsage, i) => (
                                    <Tab 
                                        idx={i} 
                                        key={i}
                                        selected={selected}
                                        onClick={() => setSelected(i)}>
                                            {docAPILangUsage.lang}
                                    </Tab>
                                ))}
                            </TabWrapper>
                            <DescriptionBox style={{marginTop: 0, boxShadow:'5px 5px 20px 0px #00000012'}}>
                                {
                                    //@ts-ignore
                                    <Highlight language={docAPI?.docAPILangUsages[selected].lang}>{docAPI?.docAPILangUsages[selected].code}</Highlight>
                                }
                            </DescriptionBox>
                        </>
                    }
                    <div style={{backgroundColor: '#9e9e9e60', height: '2px', width:'100%'}}></div>
                    <Ratings docAPI={docAPI}/>
                </Body>
                <div style={{display: 'flex'}}>
                    <BottomBtn onClick={() => history.push(`/detail/${id}/edit`)}>
                        Edit
                    </BottomBtn>
                    <div style={{width:10}}></div>
                    <BottomBtn onClick={() => history.push(`/detail/${id}/history`)}>
                        history
                    </BottomBtn>
                </div>
            </CenterDiv>
        </>
    );
}

const BottomBtn = styled.button`
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


function Ratings({ docAPI }: { docAPI?: DocAPI }) {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [rating, setRating] = useState(10);
    const [ratings, setRatings] = useState<Rating[]>([]);

    useEffect(() => {
        setRatings(docAPI?.ratings ?? []);
    }, [docAPI]);

    const apolloClient = useApolloClient();

    async function submit() {
        const myRating = {
            docAPIId: docAPI?.id,
            star: rating,
            title: title,
            body: body
        };
        try {
            const result = await apolloClient.mutate({
                mutation: gql`
                    mutation createRating($rating: RatingInput!) {
                        createRating(rating: $rating) {
                            id,
                            star,
                            title,
                            body,
                            createdAt,
                            updatedAt,
                            author {
                                id,
                                nickname,
                                profileImg
                            }
                        }
                    }
                `,
                variables: {
                    rating: myRating
                }
            });
            setRatings(ratings => [ ...ratings, result.data.createRating]);
        } catch(e) {
            alert('이미 리뷰를 달았습니다.');
        }
    }
    const onKeyDown: React.KeyboardEventHandler<HTMLInputElement> = e => {
        if (e.key === 'Enter') {
            submit();
        }
    }

    return (
        <BottomArea>
            <h2>Reviews</h2>
            <InputWrapper>
                <UpInputArea>
                    <StyledTitleInput placeholder="Title" onChange={e => setTitle(e.target.value)}/>
                    <StarArea >
                        <StarRating score={rating} onRate={eventRating => setRating(eventRating)} />
                    </StarArea>
                </UpInputArea>
                <DownInputArea>
                    <StyledBodyInput placeholder="Please leave a review." onChange={e => setBody(e.target.value)} onKeyDown={onKeyDown}/>
                    <InputRightBtn onClick={submit}>
                        <EnterIcon />
                    </InputRightBtn>
                </DownInputArea>
            </InputWrapper>
            <ReviewsWrapper>
                {ratings.map(rating => (
                    <Review {...rating} key={rating.id}/>
                ))}
            </ReviewsWrapper>
        </BottomArea>
    )
};



function parse(maybeJson: string) {
    try {
        const json = JSON.parse(maybeJson);
        return JSON.stringify(json, null , 2);
    } catch(e) {
        return maybeJson;
    }
}

function LastResult({ result }: { result: string }) {
    const processed = parse(result);

    return (
        <div style={{ float: 'right', maxWidth: '500px', overflow:'auto', borderRadius: '10px', boxSizing:"border-box", padding: '10px', boxShadow: '0px 0px 20px 0px #00000012' }}>
            <div style={{ lineBreak: 'anywhere', overflow: 'auto', padding: '10px' }}>
                <pre>
                    {processed}
                </pre>
            </div>
            <hr/>
            <div style={{ textAlign: 'center' }}>Example result</div>
        </div>
    );
}








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

const ReviewsWrapper = styled.div`
    display: flex;
    flex-direction: column;

    width: 100%;
    height: 732px;

    box-sizing: border-box;
    padding: 22px;
    margin-top: 21px;
    margin-bottom: 121px;

    border-radius: 15px;
    overflow-y: scroll;

    background-color: #F2F3F7;
    
`;

const UpInputArea = styled.div`
    display: flex;
    justify-content: center;

    width: 100%;
`;

const DownInputArea = styled.div`
    display: flex;
    justify-content: center;

    width: 100%;
`;

const InputWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    
    box-shadow: 5px 5px 20px 0px #00000012;
    border-radius: 15px;

    width: 100%;
`;

const StyledTitleInput = styled.input`
    width: 100%;
    height: 48px;
    box-sizing: border-box;
    border-radius: 15px 0px 0px 0px;
    border: none;
    font-size: 16px;
    padding: 10px;
    padding-left: 30px;
    max-width: 1078px;
    background-color: #F2F3F7;

    :focus{
        outline: none;
    }
`;

const StarArea = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    
    
    height: 48px;

    box-sizing: border-box;
    padding-right: 21px;
    padding-left: 21px;

    background-color: #F2F3F7;
    border-radius: 0px 15px 0px 0px;
    border: none;

    :hover{
        cursor: pointer;
    }
`;

const StyledBodyInput = styled.input`
    width: 100%;
    height: 48px;
    box-sizing: border-box;
    border-radius: 0px 0px 0px 15px;
    border: none;
    font-size: 16px;
    padding: 10px;
    padding-left: 30px;
    max-width: 1078px;
    background-color: #F2F3F7;

    :focus{
        outline: none;
    }
`;

const InputRightBtn = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    
    height: 48px;

    box-sizing: border-box;
    padding-right: 21px;
    padding-left: 21px;

    background-color: #F2F3F7;
    border-radius: 0px 0px 15px 0px;
    border: none;

    :hover{
        cursor: pointer;
    }
`;

const BottomArea = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    width: 100%;
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

function Review(rating: Rating){
    const t = rating.createdAt;
    return (
        <ReviewWrapper>
            <LeftWrapper>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'column'
                }}>
                    <Profile 
                        src={rating.author.profileImg || DefaultProfile} 
                        style={{width: 44, height: 44}} />
                    <div>
                        {rating.author.nickname}
                    </div>
                </div>
                <div style={{marginLeft: 31}}>
                    <span style={{fontSize: 20, marginBottom: 18}}>{rating.title}</span><br />
                    <span>{rating.body}</span>
                </div>
            </LeftWrapper>
            <RightWrapper>
                <StarRating score={rating.star} />
                <span style={{ color: 'rgba(0, 0, 0, 0.8)' }}>{`${isoFormat(t.toString())}`}</span>
            </RightWrapper>
        </ReviewWrapper>
    );
}







const LeftWrapper = styled.div`
    display: flex;
    flex: 1;
    min-width: 300px;
    padding-left: 10px;
`

const RightWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
`;

const ReviewWrapper = styled.div`
    display: flex;
    justify-content: space-between;

    flex-wrap: wrap;

    margin-bottom: 22px;

    /* min-height: 96px; */

`;

export default Detail;