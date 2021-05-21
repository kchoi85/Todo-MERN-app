import { CredentialsContext } from '../../App';
import React, {useContext, useState} from 'react';
import {useHistory} from 'react-router-dom';

export const handleErrors = async (res) => {
    if (!res.ok) {
        const {message} = await res.json();
        throw Error(message);
    }
    return res.json;
}

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [, setCredentials] = useContext(CredentialsContext);

    const login = (e) => {
        e.preventDefault(); //stops reloading page
        fetch(`http://localhost:4000/login`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username,
                password
            })
        })
        .then(handleErrors)
        .then(() => {
            setCredentials({
                username,
                password
            })
            history.push('/');
        })
        .catch((error) => {
            setError(error.message);
        })
    }

    const history = useHistory();

    return <div>
        <h1>Login</h1>
        {error && <span style={{ color: "red" }}>{error}</span>}
        <form onSubmit={login}>
            <input 
                onChange={(e) => setUsername(e.target.value)} 
                placeholder="username"/>
            <br />
            <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}  
                placeholder="password"/>
            <br />
            <button type="submit">Login</button>
        </form>
    </div>
}