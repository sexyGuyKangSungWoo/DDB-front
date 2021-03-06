import React, { useState, useContext } from "react";
import {
    Link,
    useHistory
} from 'react-router-dom';
import Context from '../context';
import { gql, useApolloClient } from '@apollo/client';
import styled from 'styled-components';
import CSS from 'csstype';
import { ReactComponent as BigDDBLogo } from '../components/atoms/BigDDBLogo.svg';
import TextInput from "../components/atoms/TextInput";
import ButtonInput from "../components/atoms/ButtonInput";
import { TopDiv, StyledDiv, StyledTitle, StyledHr, LinkSpan, StyledLink, FormBox, BigBG } from "../components/atoms/StyledComponents";
import DDBLogoLink from "../components/atoms/DDBLogoLink";
import { HelpBox, LeftDiv, MidDiv, RightDiv } from '../components/atoms/StyledComponents';

const LOGIN_QUERY = gql`
    query Login($id:String!, $pw:String!){
        login(id:$id, password:$pw)
    }
`;

function Login() {
    const history = useHistory();

    const { setJwt } = useContext(Context);

    const [id, setId] = useState('');
    const [pw, setPw] = useState('');
    const client = useApolloClient();

    async function onSubmit() {
        const res = await client.query({
            query: LOGIN_QUERY,
            variables:{
                id,
                pw
            }
        });

        const data = res.data;

        if(data.login){
            setJwt(data.login);
            history.push('/');
        }
        else{
            alert('invalid Id/Password!');
        }
    }

    return (
        <>
            <TopDiv>
                <StyledDiv>
                    <DDBLogoLink/>
                </StyledDiv>
                <StyledDiv>
                    <StyledTitle>Login</StyledTitle>
                </StyledDiv>
                <StyledDiv>
                    <StyledHr />
                </StyledDiv>
                <StyledDiv>
                    <FormBox>
                        <TextInput placeholder="Id" onChange={e => setId(e.target.value)} />
                        <TextInput placeholder="Password" onChange={e => setPw(e.target.value)} type="password" />
                        <ButtonInput onClick={() => onSubmit()}>Login</ButtonInput>
                        <HelpBox>
                            <LeftDiv>
                                <StyledLink to="/signup">Sign up here</StyledLink>
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
                overflow: 'hidden'
            }}>
                <BigBG/>
            </div>
        </>
    );
}

export default Login;
