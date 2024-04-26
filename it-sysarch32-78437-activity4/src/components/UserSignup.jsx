import { useState } from 'react'

function UserSignup() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/users/signup', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(formData),
            });
      
            if (!response.ok) {
              throw new Error(`Signup failed with status ${response.status}`);
            }
      
            const data = await response.json();
            console.log('Signup successful:', data);
            // Handle successful signup (e.g., redirect to login page)
          } catch (error) {
            console.error('Error signing up:', error);
            // Handle errors appropriately (e.g., display error message to user)
          }

    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <h2>Sign Up</h2>
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
                    type="text"
                    name="password"
                    id="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Sign Up</button>
            </form>
        </>
    )
}

export default UserSignup
