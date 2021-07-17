import React from "react";
import Context from "../../context";
import { useContext } from "react";
import styled from "styled-components";
import NaviRight from "../molecules/NaviRight";
import SearchInput from "./SearchInput";
import { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { ReactComponent as BigDDBLogo } from '../atoms/BigDDBLogo.svg';
import { useURLQuery } from '../../pages/SearchResult';
import { ReactComponent as SmallBG } from '../atoms/SmallBG.svg';

interface Props{
    topMargin?: number,
    logoVisible?: boolean,
    serchVisible?: boolean,
    initValue?: string,
    onSearch?: () => void,
}



function NavigationBar({ 
    topMargin = 20, 
    logoVisible = true, 
    serchVisible = true, 
    initValue,
    onSearch,
}:Props) {
    const { logged } = useContext(Context);
    const location = useLocation();

    const query = useURLQuery();
    if(initValue === undefined)
        initValue = query.get('query') ?? '';

    const history = useHistory();
    const [searchQuery, setSearchQuery] = useState(initValue);
    onSearch = onSearch || (() => {history.push(`/search?query=${searchQuery}`)});

    return(
        <WrapperDiv style={{overflow: 'hidden'}}>
            {
                //@ts-ignore
                location.pathname !== '/' &&
                    <div style={{ position: 'absolute', zIndex: -1, width: '100vw', height: '200px', overflow: 'hidden' }}>
                        <div style={{
                            backgroundImage: `url('./SmallBG.png')`,
                            backgroundSize: '100% 100%',
                            width: '118%',
                            height: '90%',
                            position: 'absolute',
                            bottom: '10px',
                            left: '-50px'
                        }}></div>
                    </div>
            }
            <Navigation topMargin={topMargin}>
                <LogoWrapper onClick={() => {history.push('/')}}>
                    {logoVisible 
                        ? <BigDDBLogo style={{ width: 76, height: 32 }}/>
                        : " "
                    }
                </LogoWrapper>
                <NaviRight />
            </Navigation>
            {serchVisible &&
                <Search>
                    <div style={{backgroundColor: '#9e9e9e60', height: '2px', width:'100%'}}></div>
                    <div style={{marginTop: 21, marginBottom: 21}}>
                        <SearchInput 
                            width={1123} 
                            onInputChange={e => setSearchQuery(e.target.value)} 
                            onSearch={onSearch}
                            inputValue={searchQuery}
                            InputFieldcolor="#DADADA"
                        />
                    </div>
                </Search>
            }
        </WrapperDiv>
    )
}

const LogoWrapper = styled.div`
    display: flex;
    align-items: center;

    :hover{
        cursor: pointer;
    }
`;

const Navigation = styled.div<{ topMargin: number }>`
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin: ${props => props.topMargin}px;
    max-width: 1123px;
    height: 10px;
    margin: 32px;
`;

const Search = styled.div`
    width: 100%;
    max-width: 1123px;
`;

const WrapperDiv = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-left: 10px;
    padding-right: 10px;
    box-sizing: border-box;
    position: relative;
`;


export default NavigationBar;