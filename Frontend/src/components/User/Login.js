import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../services/userService';
import './Login.css';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Store the original background style
    const originalBackground = document.body.style.background;
    // Set the gradient background when the component mounts
    document.body.style.background = 'linear-gradient(to right, #6a11cb, #396fce)';

    // Cleanup function to revert to the original background when the component unmounts
    return () => {
      document.body.style.background = originalBackground;
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = { email, password };

    try {
      const user = await loginUser(userData);
      alert('Login successful!');

      // Save to localStorage
      localStorage.setItem('user', JSON.stringify(user.data));

      // Redirect to dashboard
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
      setError('Invalid email or password. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
