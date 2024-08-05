// src/components/pages/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { ACCESS_TOKEN, APP_NAME, IS_SUPERUSER, LOGIN_FAILURE, LOGIN_SUCCESS, LOGIN_URL, LOGO_PATH, NEW_USER, REFRESH_TOKEN, USER_REGISTER, LOGIN } from '../../Constants';
import '../css/Login.css';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUserInfo } from '../../redux/actions/userActions'; // Import the action

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async () => {
    try {
      setError(''); // Clear previous error message
      const response = await axios.post(LOGIN_URL, { username, password });
      console.log(LOGIN_SUCCESS, response.data);
      // Handle successful login here (e.g., store tokens, redirect, etc.)
      localStorage.setItem(ACCESS_TOKEN, response.data.access);
      localStorage.setItem(REFRESH_TOKEN, response.data.refresh);
      localStorage.setItem(IS_SUPERUSER, response.data.is_superuser);

      // Dispatch the action to store user info in the Redux store
      dispatch(setUserInfo({
        id: response.data.id,
        username: response.data.username,
        email: response.data.email,
        is_superuser: response.data.is_superuser,
      }));

      navigate('/home');
    } catch (err) {
      setError(LOGIN_FAILURE);
      const loginButton = document.querySelector('.login-button');
      loginButton.classList.add('vibrate');
      setTimeout(() => {
        loginButton.classList.remove('vibrate');
      }, 1000);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevent form submission
      handleLogin();
    }
  };

  return (
    <div className="login-page" onKeyPress={handleKeyPress}>
      <div className="logo-text-container">
        <img src={LOGO_PATH} alt="Logo" className="logo" />
        <div className="app-title">{APP_NAME}</div>
      </div>
      <div className="card">
        <input
          type="text"
          className="input-field"
          placeholder="username..."
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          className="input-field"
          placeholder="password..."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="login-button" onClick={handleLogin}>{LOGIN}</button>
        {error && <div className="error-message">{error}</div>}
        <div className="register-link">
          {NEW_USER} <Link to="/register" className="register-link-highlight">{USER_REGISTER}</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
