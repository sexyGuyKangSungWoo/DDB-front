import React, { useContext } from 'react';
import styled from 'styled-components';
import Context from '../../context';
import ProfilePhoto from '../atoms/ProfilePhoto';
import DefaultProfile from '../atoms/DefaultProfile.svg';
import { Link, useHistory } from 'react-router-dom';
import {
    gql, useQuery
} from '@apollo/client';

const GET_USER_PROFILE = gql`
    query GET_USER_PROFILE {
        currentUser {
            profileImg
        }
    }
`; 

function NaviRight(){

    // const user = useUser();
    const { logged } = useContext(Context);
    const history = useHistory();
    const {loading, error, data} = useQuery(GET_USER_PROFILE);

    return(
        <VerticalDiv>
            <StyledMenu>
                <NoMarkLink to="/randomapi">
                    Random API
                </NoMarkLink>
                <SpaceSpan></SpaceSpan>
                <NoMarkLink to="/addpage">
                    ADD API
                </NoMarkLink>
            </StyledMenu>
            <ProfilePhoto src={
                logged
                    ? (data?.currentUser.profileImg || DefaultProfile) 
                    : DefaultProfile
                }
                style={{
                    width: 44,
                    height: 44,
                }}
                onClick={() => {
                    if(logged)
                        history.push('/myinfo');
                    else
                        history.push('/login');
            }}/>
        </VerticalDiv>
    );
}

const SpaceSpan = styled.span`
    padding-left: 20px;
    padding-right: 20px;
`;

const NoMarkLink = styled(Link)`
    text-decoration: none;
    color: black;
`;

const VerticalDiv = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center
`;

const StyledMenu = styled.span`
    font-size: 1em;
    margin-right: 25px;
    
`;


const StyledLink = styled(Link)`
    text-decoration: none;
    margin: 10px;
    font-size: 16;

    :visited{
        text-decoration: none; 
        color: black;
    }
`;

export default NaviRight;