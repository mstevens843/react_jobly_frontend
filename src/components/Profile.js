import React, { useState } from "react";

/**
 * Profile component allows the logged-in user to view and edit their profile information.
 * It takes the currentUser and updateUser functions as props.
 */

function Profile({ currentUser, updateUser }) {
  const [formData, setFormData] = useState({
    username: currentUser.username,   // Username is not editable
    firstName: currentUser.firstName,
    lastName: currentUser.lastName,
    email: currentUser.email,
    password: ""   // Required for confirmation of changes
  });

  const [error, setError] = useState(null); // State to handle errors during update
  const [success, setSuccess] = useState(false); // State to handle successful update

  /**
   * Handle input changes to update the form data.
   */
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(fData => ({
      ...fData,
      [name]: value
    }));
  }

  /**
   * Handle form submission by calling updateUser function passed as props.
   */
  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      await updateUser(formData);  // Call the updateUser function from props
      setSuccess(true);            // Show success message on successful update
      setError(null);              // Clear any previous errors
    } catch (err) {
      setError("Update failed");   // Set error message if update fails
      setSuccess(false);           // Clear success message if update fails
    }
  }

  return (
    <div>
      <h2>Profile</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username (not editable): </label>
          <input
            type="text"
            name="username"
            value={formData.username}
            disabled
          />
        </div>
        <div>
          <label>First Name: </label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Last Name: </label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Email: </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Password (required to confirm changes): </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter password to confirm"
          />
        </div>
        <button type="submit">Update Profile</button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>Profile updated successfully!</p>}
    </div>
  );
}

export default Profile;
