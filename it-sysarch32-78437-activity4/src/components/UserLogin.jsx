import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function UserLogin() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [status, setStatus] = useState('Login Account'); // Initial status message

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `Login failed with status ${response.status}`);
      }

      console.log('Login successful:', data);
      localStorage.setItem('authToken', data.token); // Store token in localStorage
      setStatus('Login successful! Redirecting...'); // Inform user
      navigate('/products');

    } catch (error) {
      console.error('Error logging in:', error);
      setStatus(error.message || 'An error occurred. Please try again.'); // Handle errors gracefully
    }
  };

  // Redirect after successful login
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setStatus('User already logged in. Redirecting...'); // Inform user
      setTimeout(() => {
        navigate('/products'); // Redirect to protected page
      }, 1000);
    }
  }, [navigate]);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          name="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          name="password"
          id="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Login</button>
      </form>
      <p>{status}</p>
    </>
  );
}

export default UserLogin;
