import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import {useLocation} from 'react-router-dom';

const CLIENT_ID = process.env.REACT_APP_REDDIT_CLIENT_ID;
const CLIENT_SECRET = process.env.REACT_APP_REDDIT_CLIENT_SECRET;
const REDIRECT_URI = "http://localhost:3000/";
const STATE = encodeURIComponent('random_string');
const SCOPE = "identity read submit privatemessages";
const DURATION = 'temporary';

export const authEndpoint = `https://www.reddit.com/api/v1/authorize?client_id=${CLIENT_ID}&response_type=code&state=${STATE}&redirect_uri=${REDIRECT_URI}&duration=${DURATION}&scope=${SCOPE}`;
export const login = `${authEndpoint}`;

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
};

export const handleLogin = () => {
    window.location.href = login;
}

//Track if the user is authenticated to render button
export const AuthButton = () => {

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [accessToken, setAccessToken] = useState("");
    const query = useQuery();
    const code = query.get('code');
    const [fetchTriggered, setFetchTriggered] = useState(false);

    useEffect(() => {

        if (code && !fetchTriggered) {
            const fetchAccessToken = async () => {
                console.log('Fetching access token...');
                
                try {
                const tokenUrl = 'https://www.reddit.com/api/v1/access_token';

                const body = new URLSearchParams({
                    grant_type: 'authorization_code',
                    code: code,
                    redirect_uri: REDIRECT_URI
                });

                const headers = new Headers({
                    'Authorization': 'Basic ' + btoa(`${CLIENT_ID}:${CLIENT_SECRET}`),
                    'Content-Type': 'application/x-www-form-urlencoded'
                });

                const response = await fetch(tokenUrl, {
                    method: 'POST',
                    headers: headers,
                    body: body.toString()
                });

                if (response.ok) {
                    const data = await response.json();

                    const { access_token } = data;
                    console.log('Access Token: ', access_token);

                    // Save tokens or set authenticated state
                    setAccessToken(accessToken);
                    setIsAuthenticated(true);

                } else {
                    const errorText = await response.text();
                    //console.log('Response Error:', response.status, errorText);
                }
                
                } catch (error) {
                    //console.log('Error fetching access token', error);
                }
            };
            
            fetchAccessToken();
            setFetchTriggered(true);
            //console.log("Fetch triggered set to true");
        } 
    }, [code, fetchTriggered]);
        
    return (
        <>
        <div className="auth">
        {!isAuthenticated ? (
            <Button id="authButton" variant="outline-dark" onClick={() => handleLogin()}>Authenticate with Reddit</Button>
        ) : (
            <Button id="searchButton" variant="outline-dark" type="submit">Search</Button>
        )}
        </div>
        </>
    )
}

