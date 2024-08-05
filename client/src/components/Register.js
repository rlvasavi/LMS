import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [gender, setGender] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State to toggle confirm password visibility
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      if (!validateInput()) {
        setError('Please fill in all fields correctly');
        return;
      }
      if (password !== confirmPassword) {
        setError('Passwords do not match');
        return;
      }
      const response = await axios.post('http://localhost:5000/api/user', {
        name,
        id,
        gender,
        email,
        password,
      });
      if (response.data) {
        setSuccess(true);
        navigate('/');
      }
    } catch (error) {
      setError('Error registering: ' + error.message);
    }
  };

  const validateInput = () => {
    if (!name || !id || !gender || !email || !password || !confirmPassword) {
      return false;
    }
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      return false;
    }
    if (password.length < 4) {
      return false;
    }
    return true;
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center' }}>Register</h1>
      <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column' }}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ marginBottom: '10px', padding: '8px', fontSize: '16px' }}
        />
        <input
          type="text"
          placeholder="ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
          style={{ marginBottom: '10px', padding: '8px', fontSize: '16px' }}
        />
        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          style={{ marginBottom: '10px', padding: '8px', fontSize: '16px' }}
        >
          <option value="">Select Gender</option>
          <option value="Female">Female</option>
          <option value="Male">Male</option>
          <option value="Not to Disclose">Not to Disclose</option>
        </select>
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
        <div style={{ position: 'relative' }}>
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            style={{ marginBottom: '10px', padding: '8px', fontSize: '16px' }}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            style={{ position: 'absolute', top: '8px', right: '10px', border: 'none', background: 'none', cursor: 'pointer' }}
          >
            {showConfirmPassword ? 'Hide' : 'Show'}
          </button>
        </div>
        {error && <p style={{ color: 'red', marginBottom: '10px' }}>{error}</p>}
        {success && <p style={{ color: 'green', marginBottom: '10px' }}>Registration successful. Please log in.</p>}
        <button type="submit" style={{ padding: '10px', fontSize: '16px', cursor: 'pointer' }}>Register</button>
      </form>
      Have A Account : <a href='/'>Go Back To Login</a>
    </div>
  );
};

export default Register;
