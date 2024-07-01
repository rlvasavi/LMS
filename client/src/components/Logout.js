import React, { useEffect } from 'react';
import axios from 'axios';

const Logout = () => {

  useEffect(() => {
    const logout = async () => {
      try {
        await axios.post('http://localhost:5000/api/user/logout');
        // After successful logout, redirect to "/"
        window.location.replace('/');
      } catch (error) {
        console.error('Logout error:', error);
        // Handle any logout error if needed
      }
    };
    logout();
  }, []);

  return <div>Logging out...</div>;
};

export default Logout;
