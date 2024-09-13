// JobList.js
import React, { useState, useEffect } from 'react';
import JoblyApi from './api';  // Your api.js file
import JobCard from './JobCard';
import SearchForm from './SearchForm';

/**
 * JobList component displays a list of all jobs.
 * 
 * It fetches the jobs from the API and uses the JobCard component to render each job.
 */

function JobList() {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchJobs() {
      try {
        const jobs = await JoblyApi.getJobs();  // Fetch all jobs from API
        setJobs(jobs);
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching jobs:", err);
        setIsLoading(false);
      }
    }
    fetchJobs();
  }, []);

  async function handleSearch(searchTerm) {
    const jobs = await JoblyApi.getJobs(searchTerm);  // Fetch filtered jobs
    setJobs(jobs);
  }

  if (isLoading) return <p>Loading jobs...</p>;

  return (
    <div className="JobList">
      <SearchForm handleSearch={handleSearch} />
      {jobs.length ? (
        jobs.map((job) => (
          <JobCard 
            key={job.id} 
            title={job.title} 
            salary={job.salary} 
            equity={job.equity} 
          />
        ))
      ) : (
        <p>No jobs found.</p>
      )}
    </div>
  );
}

export default JobList;
