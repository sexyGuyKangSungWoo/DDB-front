import React, { useState } from "react";
import styled from 'styled-components';
import {
    useHistory
} from 'react-router-dom';
import { gql, useApolloClient } from '@apollo/client';
import TextInput from "../components/atoms/TextInput";
import ButtonInput from "../components/atoms/ButtonInput";
import { TopDiv, StyledDiv, StyledTitle, StyledHr, LinkSpan, StyledLink, FormBox, BigBG } from "../components/atoms/StyledComponents";
import DDBLogoLink from "../components/atoms/DDBLogoLink";
import { HelpBox, LeftDiv, MidDiv, RightDiv } from '../components/atoms/StyledComponents';




const REGISTER = gql`
    mutation REGISTER($id:String!, $pw:String!, $nickname:String!){
        register(user: { id:$id, password:$pw, nickname:$nickname }){
            id
            nickname
        }
    }
`;

function SignUp(){

    const history = useHistory();

    const [id, setId] = useState('');
    const [pw, setPw] = useState('');
    const [confirmPw, setConfirmPw] = useState('');
    const [nickname, setNickname] = useState('');
    const client = useApolloClient();

    async function onSubmit() {
        if(pw !== confirmPw){
            alert("비밀번호가 서로 같지 않습니다!");
            return;
        }
        
        const res = await client.mutate({
            mutation: REGISTER,
            variables:{
                id,
                pw,
                nickname,
            }
        });
        const data = res.data;
 
        if(data.register){
            history.push('/login');
        }
        else{
            console.error('account not founded');
        }
    }


    return (
        <>
            <TopDiv>
                <StyledDiv>
                    <DDBLogoLink/>
                </StyledDiv>
                <StyledDiv>
                    <StyledTitle>Sign Up</StyledTitle>
                </StyledDiv>
                <StyledDiv>
                    <StyledHr />
                </StyledDiv>
                <StyledDiv>
                    <FormBox>
                        <TextInput placeholder="Id" onChange={e => setId(e.target.value)} />
                        <TextInput placeholder="Nickname" onChange={e => setNickname(e.target.value)} />
                        {(pw !== confirmPw && confirmPw !== '') && 
                            <PasswordWarn>
                                Password is different!
                            </PasswordWarn>
                        }
                        <TextInput placeholder="Password" onChange={e => setPw(e.target.value)} type="password" />
                        <TextInput placeholder="Confirm Password" onChange={e => setConfirmPw(e.target.value)} type="password" />
                        <ButtonInput onClick={() => onSubmit()}>Submit</ButtonInput>
                        <HelpBox>
                            <LeftDiv>
                                <StyledLink to="/login">Login here</StyledLink>
                            </LeftDiv>
                            <MidDiv/>
                            <RightDiv>
                            </RightDiv>
                        </HelpBox>
                    </FormBox>
                </StyledDiv>
            </TopDiv>
            <div style={{ 
                width: '100vw',
                height: '90%',
                position: 'absolute',
                zIndex: -1,
                bottom: 0,
                overflow: 'hidden',
            }}>
                <BigBG/>
            </div>
        </>
    );
}

const PasswordWarn = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 7px;
`;

export default SignUp;