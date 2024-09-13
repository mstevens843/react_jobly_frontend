import React from 'react';

/**
 * JobCard component displays information about a single job.
 * 
 * It accepts the following props:
 * - title: the job title
 * - salary: the job salary (optional)
 * - equity: the equity offered for the job (optional)
 */

function JobCard({ title, salary, equity }) {
  return (
    <div className="JobCard">
      <h4>{title}</h4>
      {salary && <p>Salary: ${salary}</p>}
      {equity && <p>Equity: {equity}</p>}
    </div>
  );
}

export default JobCard;
