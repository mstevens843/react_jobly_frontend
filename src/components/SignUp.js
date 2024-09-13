import React, { useState } from 'react';

/**
 * SignUpForm component allows users to sign up for an account.
 * It takes the signup function as a prop, which is responsible for handling
 * user registration via the backend API.
 */

function SignUp({ signup }) {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: ''
  });

  const [error, setError] = useState(null); // To handle errors during signup

  /**
   * Handle form submission by calling the signup function passed via props.
   */
  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      await signup(formData); // Call signup function from props
      setError(null); // Clear errors on successful signup
    } catch (err) {
      setError('Signup failed'); // Set error if signup fails
    }
  };

  /**
   * Handle input changes to update the form state.
   */
  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormData(data => ({
      ...data,
      [name]: value // Dynamically update the corresponding field in formData
    }));
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Username"
          required
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          required
        />
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          placeholder="First Name"
          required
        />
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          placeholder="Last Name"
          required
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <button type="submit">Sign Up</button>
      </form>

      {/* Display error message if signup fails */}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default SignUp;
