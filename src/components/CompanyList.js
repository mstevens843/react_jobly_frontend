// CompanyList.js

import React, { useState, useEffect } from 'react';
import JoblyApi from '../api/api';
import { Link } from 'react-router-dom';

/**
 * CompanyList component fetches and displays a list of all companies.
 * Each company in the list is rendered with a link to view more details
 * on that company, which navigates to the CompanyDetail component.
 */

function CompanyList() {
  const [companies, setCompanies] = useState([]); // State to store the list of companies
  const [searchTerm, setSearchTerm] = useState(""); // State to store search input

  /**
   * Fetches the list of companies from the API when the component mounts or the search term changes.
   * This also handles searching/filtering companies by name.
   */
  useEffect(() => {
    async function getCompanies() {
      try {
        let companiesData = await JoblyApi.getCompanies(searchTerm); // Fetch companies using API
        setCompanies(companiesData); // Update state with fetched companies
      } catch (err) {
        console.error("Error fetching companies:", err);
      }
    }
    getCompanies();
  }, [searchTerm]); // Re-run effect whenever the search term changes

  /**
   * Handles the input change for the search bar. 
   * It updates the searchTerm state to filter companies.
   */
  function handleSearch(evt) {
    setSearchTerm(evt.target.value);
  }

  // Display the search input and a list of companies
  return (
    <div className="CompanyList">
      <input
        type="text"
        placeholder="Search for companies..."
        value={searchTerm}
        onChange={handleSearch}
      />

      {companies.length ? (
        <ul>
          {companies.map(company => (
            <li key={company.handle}>
              <Link to={`/companies/${company.handle}`}>
                {company.name}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No companies found</p>
      )}
    </div>
  );
}

export default CompanyList;
