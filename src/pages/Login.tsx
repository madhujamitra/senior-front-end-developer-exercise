import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useHistory, useLocation } from 'react-router-dom';
import Button from '../components/Button';
import { ERROR_MESSAGES, UI_TEXT } from '../constants';
import '../components/styles.css';

interface ValidationState {
  isValid: boolean;
  message: string;
  showMessage: boolean;
}

const Login: React.FC = () => {
  const { login } = useAuth();
  const history = useHistory();
  const location = useLocation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Get redirect URL from query params
  const query = new URLSearchParams(location.search);
  const redirectTo = query.get('redirect') || '/dashboard';
  
  // Validation states
  const [emailValidation, setEmailValidation] = useState<ValidationState>({
    isValid: false,
    message: '',
    showMessage: false
  });

  
  // Focus states
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  // Email validation function
  const validateEmail = (email: string): ValidationState => {
    if (!email) {
      return { isValid: false, message: '', showMessage: false };
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(email);
    
    if (!isValid) {
      return { 
        isValid: false, 
        message: ERROR_MESSAGES.validation.email, 
        showMessage: true 
      };
    }
    
    return { 
      isValid: true, 
      message: '', 
      showMessage: false 
    };
  };

  // Real-time validation effects
  useEffect(() => {
    const validation = validateEmail(username);
    setEmailValidation(validation);
  }, [username]);


  // Get input class names based on validation state
  const getInputClassName = (isValid: boolean, isFocused: boolean, hasValue: boolean) => {
    let className = 'login-input';
    
    if (isFocused) {
      className += ' focused';
    } else if (hasValue) {
      className += isValid ? ' valid' : ' invalid';
    }
    
    return className;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate email field before submission
    const emailValid = validateEmail(username);
    
    setEmailValidation({ ...emailValid, showMessage: true });
    
    if (!emailValid.isValid || !password) {
      setError('Please enter a valid email and password');
      return;
    }
    
    setIsSubmitting(true);
    setError('');
    
    // Process login
    const success = login(username, password);
    setIsSubmitting(false);
    
    if (!success) {
      setError('Invalid username or password');
    } else {
      setError('');
      history.push(redirectTo);
    }
  };

  return (
    <div className="login-bg">
      <div className="login-container">
        <div className="login-header">
          <div className="login-underline" />
          <h2>{UI_TEXT.headings.login}</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="login-field">
            <label htmlFor="email">
              {UI_TEXT.labels.email}<span className="login-required">{UI_TEXT.labels.required}</span>
            </label>
            <input
              id="email"
              type="email"
              placeholder={UI_TEXT.placeholders.email}
              value={username}
              onChange={e => setUsername(e.target.value)}
              onFocus={() => setEmailFocused(true)}
              onBlur={() => setEmailFocused(false)}
              required
              className={getInputClassName(emailValidation.isValid, emailFocused, !!username)}
              autoComplete="email"
            />

            {emailValidation.showMessage && !emailValidation.isValid ? (
              <span className="field-error">
                {emailValidation.message}
              </span>
            ) : (
              <span className="field-error-placeholder"></span>
            )}
          </div>
          
          <div className="login-field">
            <label htmlFor="password">
              {UI_TEXT.labels.password}<span className="login-required">{UI_TEXT.labels.required}</span>
            </label>
            <input
              id="password"
              type="password"
              placeholder={UI_TEXT.placeholders.password}
              value={password}
              onChange={e => setPassword(e.target.value)}
              onFocus={() => setPasswordFocused(true)}
              onBlur={() => setPasswordFocused(false)}
              required
              className={passwordFocused ? "login-input focused" : "login-input"}
              autoComplete="current-password"
            />
          </div>

          {error ? <div className="login-error">{error}</div> : <span className="login-error-placeholder"></span>}
          
          <Button
            text={isSubmitting ? UI_TEXT.buttons.loggingIn : UI_TEXT.buttons.logIn}
            color="#bc3b3b"
            onClick={() => {}}
            className="login-btn"
          />
          <input 
            type="submit" 
            style={{ display: 'none' }} 
            disabled={!emailValidation.isValid || !password || isSubmitting} 
          />
        </form>
      </div>
    </div>
  );
};

export default Login; 