// SearchForm.js

import React, { useState } from 'react';

/**
 * SearchForm component provides a simple form with an input field 
 * to allow users to search companies.
 * 
 * It accepts a function via props to handle the search term submission.
 */

function SearchForm({ handleSearch }) {
  const [searchTerm, setSearchTerm] = useState(""); // State for storing the search input

  /**
   * Handles the form submission by calling the parent-provided handleSearch function.
   * Prevents the default form submission and sends the search term upwards.
   */
  function handleSubmit(evt) {
    evt.preventDefault();
    handleSearch(searchTerm.trim());
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(evt) => setSearchTerm(evt.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  );
}

export default SearchForm;
