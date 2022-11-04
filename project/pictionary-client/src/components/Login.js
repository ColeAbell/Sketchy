import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import AuthContext from '../AuthContext';
import Errors from './Errors';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  const auth = useContext(AuthContext);

  const history = useHistory();

  const handleSubmit = (event) => {
    event.preventDefault();

    /*
    POST http://localhost:8080/api/authenticate HTTP/1.1
    Content-Type: application/json
    {
      "username": "john@smith.com",
      "password": "P@ssw0rd!"
    }
    */

    const authAttempt = {
      username,
      password
    };
    
    const init = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(authAttempt)
    };
    
    fetch('http://localhost:8080/authenticate', init)
      .then(response => {
        if (response.status === 200) {
          return response.json();
        } else if (response.status === 403) {
          return null;
        } else {
          return Promise.reject(`Unexpected status code: ${response.status}`);
        }
      })
      .then(data => {
        if (data) {
          // {
          //   "jwt_token": "eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJjYWxvcmllLXRyYWNrZXIiLCJzdWIiOiJzbWFzaGRldjUiLCJhdXRob3JpdGllcyI6IlJPTEVfVVNFUiIsImV4cCI6MTYwNTIzNDczNH0.nwWJtPYhD1WlZA9mGo4n5U0UQ3rEW_kulilO2dEg7jo"
          // }
          auth.login(data.jwt_token);
          history.push('/');
        } else {
          // we have error messages
          setErrors(['login failure']);
        }
      })
      .catch(console.log);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  return (
    <>
      <Errors errors={errors} />

      <form onSubmit={handleSubmit}>
        <div>
          <h1>Login</h1>
          <label htmlFor="username">Username:</label>
          <input id="username" type="text" 
            onChange={handleUsernameChange} value={username} />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input id="password" type="password" 
            onChange={(event) => setPassword(event.target.value)} value={password} />
        </div>
        <div>
          <button type="submit">Login</button>
        </div>
      </form>
    </>
  );
}

export default Login;