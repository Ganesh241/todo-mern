// components/User/UsersPage.js
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './UsersPage.css';

const UsersPage = () => {
  useEffect(() => {
    // Set the background image when the component mounts
    document.body.style.backgroundImage = "url('https://img.freepik.com/premium-psd/notepad-with-list-coffee_23-2148528652.jpg?semt=ais_hybrid&w=740')";
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundRepeat = 'no-repeat';
    document.body.style.backgroundPosition = 'center';

    // Cleanup function to remove the background when the component unmounts
    return () => {
      document.body.style.backgroundImage = '';
      document.body.style.backgroundSize = '';
      document.body.style.backgroundRepeat = '';
      document.body.style.backgroundPosition = '';
    };
  }, []);

  return (
    <div className="users-page">
      <div className="buttons-container">
        <Link to="/users/login">
          <button className="auth-button">Login</button>
        </Link>
        <Link to="/users/register">
          <button className="auth-button">Register</button>
        </Link>
      </div>
    </div>
  );
};

export default UsersPage;
