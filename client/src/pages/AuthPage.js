import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import { AuthContext } from '../context/AuthContext';

const AuthPage = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  const [authUsername, setAuthUsername] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authError, setAuthError] = useState('');

  const handleAuthSubmit = async () => {
    
    const API_BASE_URL = 'http://localhost:5000/api/auth';
    const endpoint = isLogin ? `${API_BASE_URL}/login` : `${API_BASE_URL}/register`;


    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: authUsername, password: authPassword }),
      });

      const data = await response.json();

      if (!response.ok) {
        setAuthError(data.message || 'Authentication failed');
        return;
      }

      login(data.token, authUsername); // store token + username in context
      navigate('/weather');
    } catch (err) {
      setAuthError('An error occurred. Please try again.');
    }
  };

  return (
    <AuthForm
      isLogin={isLogin}
      setIsLogin={setIsLogin}
      authUsername={authUsername}
      authPassword={authPassword}
      setAuthUsername={setAuthUsername}
      setAuthPassword={setAuthPassword}
      handleAuthSubmit={handleAuthSubmit}
      authError={authError}
      setAuthError={setAuthError}
    />
  );
};

export default AuthPage;
