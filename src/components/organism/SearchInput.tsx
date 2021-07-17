import React from "react";
import styled from "styled-components";
import { ReactComponent as SearchIcon } from '../atoms/SearchIcon.svg';

interface Props{
    width?: number;
    InputFieldcolor?: string;
    onSearch?: () => void,
    onInputChange?: React.ChangeEventHandler<HTMLInputElement>,
    inputValue?: string
}

function SearchInput({ 
    width = 768, 
    InputFieldcolor = "#C4C4C4", 
    onSearch = () => {}, 
    onInputChange = () => {},
    inputValue
}:Props){
    const onKeydown:React.KeyboardEventHandler<HTMLInputElement> = e => {
        if (e.keyCode === 13) {
            onSearch();
        }
    }
    function onButtonClick() {
        onSearch();
    }

    return (
        <SearchWrapper>
            <StyledSearch 
                placeholder="Search" 
                maxWidth={width-68} 
                shadowColor="#00000012" 
                onChange={onInputChange} 
                value={inputValue}
                onKeyDown={onKeydown}
                inputColor={InputFieldcolor}/>
            <ButtonWrapeer 
                shadowColor="#00000012" 
                onClick={onButtonClick}
                inputColor={InputFieldcolor}>
                <SearchIcon />
            </ButtonWrapeer>
        </SearchWrapper>
    );
}

const SearchWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;

    width: 100%;
`;

const ButtonWrapeer = styled.button<{ shadowColor: string, inputColor: string }>`
    z-index: 99;
    
    display: flex;
    justify-content: center;
    align-items: center;
    
    height: 55px;

    box-sizing: border-box;
    margin-top: 13px;
    margin: 10px;
    margin-left: 0px;
    padding-right: 21px;
    padding-left: 21px;

    background-color: ${props => props.inputColor};
    border-radius: 0px 10px 10px 0px;
    border: none;
    box-shadow: 15px 5px 20px 0px ${props => props.shadowColor};

    :hover{
        cursor: pointer;
    }
`;

const StyledSearch = styled.input<{ maxWidth: number, shadowColor: string, inputColor: string }>`

    width: 100%;
    height: 55px;
    box-sizing: border-box;
    background-color: ${props => props.inputColor};
    border-radius: 10px 0px 0px 10px;
    border: none;
    margin-top: 13px;
    font-size: 16px;
    padding: 10px;
    padding-left: 20px;
    margin: 10px;
    margin-right: 0px;
    max-width: ${props => props.maxWidth}px;
    box-shadow: 5px 5px 20px 0px ${props => props.shadowColor};

    :focus{
        outline: none;
    }
`;

export default SearchInput;