import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const TopDiv = styled.div`
    margin-top: 10vh;
`;

export const StyledDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const StyledTitle = styled.h1`
    font-size: 32px;

    font-weight: 400;
    margin: 0;
    margin-top: 50px;
`;

export const StyledHr = styled.hr`
    width: 310.5px;
    margin: 20px 0 13px 0;
    color: #c4c4c4;
`;

export const LinkSpan = styled.span`
    margin-top: 5px;
    margin-left: 205px;
`;

export const StyledLink = styled(Link)`
    font-size: 12px;
    padding-left: 10px;
    color: rgba(0, 0, 0, 0.6);

    &:link {
        text-decoration: none;
    }
    &:visited {
        text-decoration: none;
    }
`;

export const FormBox = styled.div`
width: 366px;
`;

export const HelpBox = styled.div`
    width: 100%;
    display: flex;
    margin-top: 10px;
`;

export const LeftDiv = styled.div``;
export const MidDiv = styled.div`
    flex-grow: 1;
`;
export const RightDiv = styled.div``;


export const InfoProfileDiv = styled.div`
    width: 304px;
    height: 534px;
    border-radius: 15px;
    margin: 37px;
    background-color: #c4c4c4;
`;

export const InfoProfileImg = styled.img`
    margin: 50px auto 30px 69px;
    width: 166px;
    height: 166px;
    border-radius: 100%;
`;

export const InfoProfileButton = styled.button`
    margin: 10px 30% 10px 30%;
    width: 40%;
    height: 33px;
    font-size: 12px;
    border-radius: 41px;
    border: none;
    text-align: center;
    color: #ffffff;
    background-color: #000000;
`;

export const InfoProfileInputBar = styled.input`
    margin: 10px 10% 10px 10%;
    width: 80%;
    height: 34px;
    font-size: 16px;
    background-color: #DADADA;
    padding-left: 3px;
    border-radius: 10px;
    border: none;
`;

export const InfoProfileImageInput = styled.input`
    margin: 10px 10% 10px 10%;
    width: 80%;
    height: 33px;
    font-size: 12px;
    border: none;
    text-align: center;
    justify-content: center;
    background-color: #c4c4c4;
`;

export const LogoutButton = styled.button`
    margin: 10px 47vw 10px 47vw;
    width: 6%;
    height: 36px;
    font-size: 1px;
    border: none;
    border-radius: 41px;
    text-align: center;
    color: #000000;
    background-color: #ffffff;
    min-width: 100px;
`;

export const BigBG = styled.div`
    position: absolute;
    background-image: url('/BigBG.png');
    background-size: 100% 100%;
    height: 100%;
    width: 120%;
    bottom: -40px;
    left: -40px;
    position-right: none;
    overflow: hidden;
    right: 0px;
`;

