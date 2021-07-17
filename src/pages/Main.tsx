import React, { useState } from "react";
import Context from "../context";
import {
    Link, useHistory
} from 'react-router-dom';
import { useContext } from "react";
import NavigationBar from "../components/organism/NavigationBar";
import styled from "styled-components";
import { ReactComponent as SearchIcon } from '../components/atoms/SearchIcon.svg';
import { ReactComponent as BigDDBLogo } from '../components/atoms/BigDDBLogo.svg';
import SearchInput from "../components/organism/SearchInput";
import { TopDiv, BigBG } from '../components/atoms/StyledComponents';


function Main() {
    const { logged } = useContext(Context);
    const [query, setQuery] = useState('');
    const history = useHistory();

    return (
        <>
            <NavigationBar  
                topMargin={64} 
                logoVisible={false} 
                serchVisible={false} 
            />
            <TopDiv>
                <Body>
                    <div style={{
                        display: 'flex', 
                        justifyContent: 'center',
                        marginBottom: 105,
                    }}>
                        <BigDDBLogo style={{maxWidth: 393, maxHeight: 164, width: '100%'}} />
                    </div>
                    <SearchInput 
                        onInputChange={e => setQuery(e.target.value)} 
                        onSearch={() => {
                            history.push(`/search?query=${query}&page=1`);
                        }}/>
                </Body>
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

const Body = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export default Main;