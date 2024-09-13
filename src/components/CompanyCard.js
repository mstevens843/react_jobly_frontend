// CompanyCard.js

import React from 'react';
import { Link } from 'react-router-dom';

/**
 * CompanyCard component renders a simple card displaying information 
 * about a single company. Each card includes the company name and a 
 * link to view more details.
 * 
 * This component is used inside the CompanyList to display each company.
 */

function CompanyCard({ handle, name, description }) {
  return (
    <div className="CompanyCard">
      <h3>{name}</h3>
      <p>{description}</p>
      <Link to={`/companies/${handle}`}>View Details</Link>
    </div>
  );
}

export default CompanyCard;
