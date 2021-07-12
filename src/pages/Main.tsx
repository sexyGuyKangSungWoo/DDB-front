import React from "react";
import {
    Link
} from 'react-router-dom';

function Main() {
    return (
        <>
            <p>
                <Link to="/login">Login</Link>
            </p>
            <p>
                <Link to="/logout">Logout</Link>
            </p>
            <p>
                <Link to="/thelab">TheLab</Link>
            </p>
        </>
    );
}

export default Main;