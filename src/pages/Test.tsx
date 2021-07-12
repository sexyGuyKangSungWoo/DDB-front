import React, { useState } from "react";
import Context from '../context/context';
import { useContext } from 'react';

function Test() {

    const { number, setNumber, setStickyJwt, stickyJwt } = useContext(Context);
    const [token, setToken] = useState('');

    return (
        <div className="App">
            <header className="App-header">
                <div>
                    {number}
                    <button onClick={() => setNumber((prev: number) => prev + 1)}>+</button>
                    <button onClick={() => setNumber((prev: number) => prev - 1)}>-</button>
                </div>
                <div>
                    <p>founded token: {stickyJwt}</p>
                    <input type="text" onChange={e => setToken(e.target.value)} />
                    <button onClick={() => setStickyJwt(token)}>save</button>
                </div>
            </header>
        </div>
    );
}

export default Test;