import React, { useState, useRef, useEffect } from "react";
import NavigationBar from "../components/organism/NavigationBar";
import { useHistory } from 'react-router-dom';
import { gql, useApolloClient } from "@apollo/client";
import useUser from '../hooks/useUser'
import { StyledDiv, StyledTitle, InfoProfileDiv, InfoProfileImg, InfoProfileButton, InfoProfileInputBar, InfoProfileImageInput, LogoutButton } from "../components/atoms/StyledComponents";

function MyInfo() {

    const apolloClient = useApolloClient();
    const user = useUser();
    const history = useHistory();
    
    const [imgBase64, setImgBase64] = useState("");
    const [imgFile, setImgFile] = useState<File | null>(null);
    const [nickname, setNickname] = useState('');
    const [changePW, setChangePW] = useState('');
    const [currentPW, setCurrentPW] = useState('');

    const selectedFileRef = useRef<HTMLInputElement | null>(null);


    useEffect(() => {
        if(user) {
            setNickname(user.nickname);
        }
    }, [user]);
    
    const handleChangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        let reader = new FileReader();
    
        reader.onloadend = () => {
          const base64 = reader.result;
          if (base64) {
            setImgBase64(base64.toString()); 
          }
        }
        const files = event.target.files
        if (files !== null) {
            if(files[0]) {
                console.log(files[0]);
                reader.readAsDataURL(files[0]); 
                setImgFile(files[0]);
            }
        }
      }

    function onConfirmProfile() {
        if(!nickname) {
            alert("input nickname!");
            return;
        }
        // else if(!changePW) {
        //     alert("input password!");
        //     return;
        // }
        if(!currentPW) {
            alert("input current password!");
            return;
        }
        setProfile(currentPW).then(console.log);

    }

    async function setProfile(pw: string) {
        const sendUser = {
            password: changePW === '' ? currentPW : changePW,
            nickname: nickname,
            profileImg: imgBase64
        }

        const result = await apolloClient.mutate({
            mutation: gql`mutation Setuser($pw: String!, $user: UserInputUpdate!) {
                updateUser(password:$pw, user:$user) {
                  nickname
                  profileImg
                }
              }`,
            variables: {
                pw,
                user: sendUser
            }
        });
        
        history.push('/')
        return result.data;
    }

    function logout() {
        history.push('/logout');
    }

    function onClickFileButton() {
        selectedFileRef?.current?.click();
    }

    return(
        <>
            <NavigationBar />
            <div>
                <StyledDiv>
                    <StyledTitle>
                        UPDATE INFORMATION
                    </StyledTitle>
                </StyledDiv>
                <StyledDiv>
                    <InfoProfileDiv>
                        <InfoProfileImg src={imgBase64 ? imgBase64 : user?.profileImg}/>
                        <input type="file" id="selectedFile" onChange={handleChangeFile} ref={selectedFileRef} style={{display: 'none'}}/>
                        <InfoProfileButton onClick={onClickFileButton}>Change Profile..</InfoProfileButton>
                        <InfoProfileInputBar placeholder="Nickname" value={nickname} onChange={e => {setNickname(e.target.value)}}/>
                        <InfoProfileInputBar placeholder="Password" value={changePW} onChange={e => {setChangePW(e.target.value)}}/>
                        <InfoProfileInputBar placeholder="Current Password" value={currentPW} onChange={e => {setCurrentPW(e.target.value)}}/>
                        <InfoProfileButton onClick={e => onConfirmProfile()}>Save Profile</InfoProfileButton>                        
                    </InfoProfileDiv>    
                </StyledDiv>
                <StyledDiv>
                    <LogoutButton onClick={e => logout()}>Logout</LogoutButton>
                </StyledDiv>
            </div>
        </>
    );
}

export default MyInfo;
