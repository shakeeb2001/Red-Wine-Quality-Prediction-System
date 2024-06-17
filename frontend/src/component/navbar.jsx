import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './navbar.css';
import logo from '../images/dashboard_logo.png';

const Navbar = ({ username }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isLoginPage = location.pathname === '/login';
  const isSignupPage = location.pathname === '/signup';

  const [persistedUsername, setPersistedUsername] = useState(username);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Store the username in local storage
    if (username) {
      localStorage.setItem('username', username);
    }

    // Retrieve the username from local storage when the component mounts
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setPersistedUsername(storedUsername);
    }
  }, [username]);

  const handleSignOut = () => {
    localStorage.removeItem('username');
    navigate('/login');
  };

  return (
    !isLoginPage && !isSignupPage && (
      <header className="navbar">
        <img src={logo} className="navbar-logo" alt="Wine Doctor Logo" />
        <div className="navbar-profile">
          <span className="navbar-username">Hi,{persistedUsername}</span>
          <i
            className="fas fa-sign-out-alt navbar-signout-icon"
            onClick={() => setShowModal(true)}
          ></i>
        </div>
        {showModal && (
          <div className="modal">
            <div className="modal-content">
              <p>Do you want to Sign out?</p>
              <button onClick={handleSignOut}>Yes</button>
              <button onClick={() => setShowModal(false)}>No</button>
            </div>
          </div>
        )}
      </header>
    )
  );
};

export default Navbar;
