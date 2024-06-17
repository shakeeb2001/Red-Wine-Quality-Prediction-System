import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';
import background from '../../images/background.jpeg';
import Logo from '../../images/new_logo.png';

const LoginPage = ({ setUsername }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('http://localhost:4000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        const data = await response.json();
        setUsername(formData.username); // Set the username
        navigate('/dashboard');
      } else {
        alert('Login failed');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page"
         style={{ 
           backgroundImage: `url(${background})`,
           backgroundSize: 'cover',
           backgroundPosition: 'center',
           width: '100vw',
           height: '100vh'
         }}>
      {loading && (
        <div className="loading-modal">
          <div className="loading-spinner"></div>
          <p>Loading...</p>
        </div>
      )}
      <div className="login-container">
        <div className="logo">
          <img src={Logo} alt="Wine Doctor Logo" />
          <h4>Unlock the Future of Flavor</h4>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="username">
              <i className="fas fa-user"></i>
              <input type="text" id="username" name="username" placeholder="Username" value={formData.username} onChange={handleChange} required />
            </label>
          </div>
          <div className="input-group">
            <label htmlFor="password">
              <i className="fas fa-lock"></i>
              <input type="password" id="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
            </label>
          </div>
          <button type="submit" className="login-button">Log In</button>
        </form>
        <div className="signup-link">
          <p>Don't have an account? <a href="/signup">Create one</a></p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
