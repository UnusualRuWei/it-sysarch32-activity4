import { useState, useEffect } from 'react';

function UserLogin() {
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

      if (!response.ok) {
        throw new Error(`Login failed with status ${response.status}`);
      }

      const data = await response.json();
      console.log('Login successful:', data);

      // Handle successful login:
      if (data.message === 'Auth successful') {
        localStorage.setItem('authToken', data.token); // Store token in localStorage
        setStatus('Login successful! Redirecting...'); // Inform user and redirect

        // Redirect to a protected page (replace with your desired redirection logic)
        setTimeout(() => {
          window.location.href = '/products'; // Example redirection
        }, 1000); // Simulate a delay (replace with actual redirection logic)
        return new Promise((resolve) => resolve(true));
      } else {
        setStatus(data.message || 'Login failed. Please check your credentials.'); // Handle unexpected response
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setStatus(error.message || 'An error occurred. Please try again.'); // Handle errors gracefully
    }
  };

  // Check for existing token on component mount (optional)
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      // Handle user already being logged in (e.g., redirect to protected page)
      console.log('User already logged in with token:', token);
      setStatus('User already logged in.'); // Inform user
      // Implement your redirection logic here (e.g., window.location.href = '/protected-page')
    }

  }, []);

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
