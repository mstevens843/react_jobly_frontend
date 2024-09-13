import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; 
import JoblyApi from '../api/api';

// CompanyDetail component that shows details for a specific company, inclding jobs available at specific company.
// This component is accessed when company is clicked on in the companies list.  It uses the 'handle' from the URL to make an API 
// request to get companies data. 

function CompanyDetail() {
    const { handle } = useParams(); // get company handle from URL. 
    const [company, setCompany] = useState(null); // state to store company data.



    // Fetches company details from the API when component mounts when the handle changes. 
    // API call fetches the company info and sets it to company state. 
    useEffect(() => {
        async function getCompanyDetails() {
            try {
                let companyData = await JoblyApi.getCompany(handle); // fetch company data using API. 
                setCompany(companyData); // Update state with fetched company data 
            } catch(err) {
                console.error("Error fetching company details:", err); 
            }
        }
        getCompanyDetails(); 
    }, [handle]); // effect runs whenever the 'handle' changes. 

    // If company data is not yet availavle, show a loading message.
    if (!company) return <p>Loading...</p>;

    // Display company name, description, and a list of jobs available at the company. 
    return (
        <div className="CompanyDetail">
            <h2>{company.name}</h2>
            <p>{company.description}</p>

            <h3>Jobs Available:</h3>
            <ul>
                {company.jobs.map(job => (
                    <li key={job.id}>{job.title} - {job.salary ? `$${job.salary}` : "Salary not listed"} </li>
                ))}
            </ul>
        </div>
    );
}

export default CompanyDetail; 







