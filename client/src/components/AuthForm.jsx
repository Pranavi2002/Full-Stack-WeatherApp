import React from 'react';
import './AuthForm.css';

const AuthForm = ({
  isLogin,
  authUsername,
  authPassword,
  setAuthUsername,
  setAuthPassword,
  handleAuthSubmit,
  authError,
  setIsLogin,
  setAuthError
}) => {

  // Password strength checker
  const isStrongPassword = (password) => {
    // Minimum 8 chars, at least 1 uppercase, 1 lowercase, 1 digit, 1 special char
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    return regex.test(password);
  };

  const onSubmit = () => {
    if (!authUsername || !authPassword) {
      setAuthError('Please fill all fields');
      return;
    }

    if (!isStrongPassword(authPassword) && !isLogin) {
      // Only enforce strong password on registration
      setAuthError('Password must be at least 8 characters with uppercase, lowercase, number & special char.');
      return;
    }

    setAuthError('');
    handleAuthSubmit();
  };

  return (
    <div className="auth-form">
      <h2>{isLogin ? 'Login' : 'Register'}</h2>
      <input
        type="text"
        placeholder="Username"
        value={authUsername}
        onChange={(e) => setAuthUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={authPassword}
        onChange={(e) => setAuthPassword(e.target.value)}
      />
      <button onClick={onSubmit}>
        {isLogin ? 'Login' : 'Register'}
      </button>
      <p className="error">{authError}</p>
      <p>
        {isLogin ? 'New user?' : 'Already registered?'}{' '}
        <button onClick={() => { setIsLogin(!isLogin); setAuthError(''); }}>
          {isLogin ? 'Register here' : 'Login here'}
        </button>
      </p>
    </div>
  );
};

export default AuthForm;
