import React, { useState } from "react";
import Context from '../context/context';
import { useContext } from 'react';

function Test() {

    const { user, setUser, jwt, setJwt } = useContext(Context);
    const [token, setToken] = useState('');
    const [id, setId] = useState('');
    const [nickname, setNickname] = useState('');

    function onSave(){
        setUser({
            ...user,
            id,
            nickname,
        });
        setJwt(token);
    }

    return (
        <div className="App">
            <header className="App-header">
                <div>
                    <h1>USERINFO</h1>
                    <div>
                        <p>token: {jwt}</p>
                        <input type="text" onChange={e => setToken(e.target.value)} />
                    </div>
                    <div>
                        <p>id: {user.id}</p>
                        <input type="text" onChange={e => setId(e.target.value)} />
                    </div>
                    <div>
                        <p>nickname: {user.nickname}</p>
                        <input type="text" onChange={e => setNickname(e.target.value)} />
                    </div>
                    <div>
                        <button onClick={onSave}>save</button>
                    </div>
                </div>
            </header>
        </div>
    );
}

export default Test;