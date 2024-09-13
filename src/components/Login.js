import React, { useState } from 'react';

/**
 * Login component allows users to login to their account.
 * It takes the login function as a prop to handle authentication.
 */

function Login({ login }) { 
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState(null); // To handle errors during login

  /**
   * Handle form submission by calling the login function passed via props.
   */
  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      await login(formData); // Call login function from props
      setError(null); // Clear errors on successful login
    } catch (err) {
      setError('Login failed'); // Set error if login fails
    }
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={formData.username}
          onChange={(e) => setFormData({ ...formData, username: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        />
        <button type="submit">Login</button>
      </form>

      {/* Display error message if login fails */}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default Login;
