import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/user/login', { email, password });
      if (response.data) {
        // Save the token in local storage or context
        localStorage.setItem('token', response.data.token);
        navigate('/home');
      }
    } catch (error) {
      setError('Invalid credentials');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center' }}>Login</h1>
      <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column' }}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ marginBottom: '10px', padding: '8px', fontSize: '16px' }}
        />
        <div style={{ position: 'relative' }}>
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ marginBottom: '10px', padding: '8px', fontSize: '16px' }}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            style={{ position: 'absolute', top: '8px', right: '10px', border: 'none', background: 'none', cursor: 'pointer' }}
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </div>
        {error && <p style={{ color: 'red', marginBottom: '10px' }}>{error}</p>}
        <button type="submit" style={{ padding: '10px', fontSize: '16px', cursor: 'pointer' }}>Login</button>
        <p>Don't have an account? <Link to="/register">Register here</Link></p>
      </form>
    </div>
  );
};

export default Login;
