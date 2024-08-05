import React, { useState } from 'react';
import axios from 'axios';
import { REGISTER_URL, REGISTRATION_FAILURE, LOGO_PATH, APP_NAME, USER_LOGIN, EXIST_ACCOUNT, SUCCESSFUL_REGISTRATION, REGISTER } from '../../Constants';
import '../css/Register.css';
import { Link } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async () => {
    try {
      setError(''); // Clear previous error message
      const response = await axios.post(REGISTER_URL, { username, email, password });
      console.log(SUCCESSFUL_REGISTRATION, response.data);
      // Handle successful registration here (e.g., redirect to login, show success message, etc.)
    } catch (err) {
      setError(REGISTRATION_FAILURE);
      const registerButton = document.querySelector('.register-button');
      registerButton.classList.add('vibrate');
      setTimeout(() => {
        registerButton.classList.remove('vibrate');
      }, 1000);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevent form submission
      handleRegister();
    }
  };

  return (
    <div className="register-page" onKeyPress={handleKeyPress}>
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
          type="email"
          className="input-field"
          placeholder="email..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="input-field"
          placeholder="password..."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="register-button" onClick={handleRegister}>{REGISTER}</button>
        {error && <div className="error-message">{error}</div>}
        <div className="login-link">
          {USER_LOGIN} <Link to="/login" className="login-link-highlight">{EXIST_ACCOUNT}</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;