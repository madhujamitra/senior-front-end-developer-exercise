import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import { useHistory } from 'react-router-dom';
import Button from './Button';
import '../components/styles.css';

const Login: React.FC = () => {
  const { login } = useAuth();
  const history = useHistory();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(username, password);
    if (!success) {
      setError('Invalid username or password');
    } else {
      setError('');
      history.push('/dashboard');
    }
  };

  return (
    <div className="login-bg">
      <div className="login-container">
        <div className="login-header">
          <div className="login-underline" />
          <h2>Log in</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="login-field">
            <label>
              Email<span className="login-required">*</span>
            </label>
            <input
              type="text"
              placeholder="Email"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
              className="login-input"
            />
          </div>
          <div className="login-field">
            <label>
              Password<span className="login-required">*</span>
            </label>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              className="login-input"
            />
          </div>

          {error && <div className="login-error">{error}</div>}
          <Button
            text="Log in"
            color="#bc3b3b"
            onClick={() => {}}
            className="login-btn"
          />
          <input type="submit" style={{ display: 'none' }} disabled={!username || !password} />
        </form>
      </div>
    </div>
  );
};

export default Login; 