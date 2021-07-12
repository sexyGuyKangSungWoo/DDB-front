import React, { useState, useContext } from "react";
import {
    useHistory
} from 'react-router-dom';
import Context from '../context/context';
import Constant from '../constants';

function Login() {
    const history = useHistory();

    const { setStickyJwt } = useContext(Context);

    const [id, setId] = useState('');
    const [pw, setPw] = useState('');

    async function onSubmit() {
        const res = await fetch(Constant.serverURL + '/auth/login', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify({
                id,
                password: pw,
            })
        })
        const data = await res.json();
        
        if(data.success){
            setStickyJwt(data.jwt);
            
        }
        else{
            alert("로그인 실패");
        }
    }

    return (
        <>
            <div>
                <label>
                    id:
                    <input onChange={e => setId(e.target.value)} />
                </label>
            </div>
            <div>
                <label>
                    pw: <input onChange={e => setPw(e.target.value)} type="password" />
                </label>
            </div>
            <div>
                <button onClick={onSubmit}>submit</button>
            </div>
        </>
    );
}

export default Login;
