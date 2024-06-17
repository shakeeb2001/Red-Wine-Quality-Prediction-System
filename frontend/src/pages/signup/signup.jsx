import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './signup.css';
import background from '../../images/background.jpeg'; // Ensure the path is correct
import Logo from '../../images/new_logo.png'; // Ensure the path is correct

const SignupPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: ''
  });
  const [loading, setLoading] = useState(false); // State to manage loading modal visibility
  const [success, setSuccess] = useState(false); // State to manage success message

  const navigate = useNavigate(); // Initialize the useNavigate hook

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Show loading modal
    try {
      const response = await fetch('http://localhost:4000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        setSuccess(true); // Show success message
        setTimeout(() => {
          setSuccess(false);
          navigate('/login'); // Navigate to the login page after showing success message
        }, 2000); // Show success message for 2 seconds
      } else {
        alert('Signup failed');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setLoading(false); // Hide loading modal
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
          <p>{success ? 'Signup Successful!' : 'Creating User Account...'}</p>
        </div>
      )}
      <div className="login-container">
        <div className="logo">
          <img src={Logo} alt="Wine Doctor Logo" />
          <h4>Unlock the Future of Flavor</h4>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="name-group">
            <div className="input-group">
              <label htmlFor="firstName">
                <i className="fas fa-user"></i>
                <input type="text" id="firstName" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} required />
              </label>
            </div>
            <div className="input-group">
              <label htmlFor="lastName">
                <i className="fas"></i>
                <input type="text" id="lastName" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} required />
              </label>
            </div>
          </div>
          <div className="input-group">
            <label htmlFor="email">
              <i className="fas fa-envelope"></i>
              <input type="email" id="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
            </label>
          </div>
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
          <button type="submit" className="login-button">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
