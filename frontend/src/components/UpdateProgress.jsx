import React, { useState } from 'react';
import axios from 'axios';

const UpdateProgress = ({ projectId }) => {
  const [progressPercentage, setProgressPercentage] = useState(0);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post(`http://localhost:5000/api/projects/progress/${projectId}`, {
        progressPercentage,
      });
      setMessage(response.data.message);
    } catch (err) {
      setError('Failed to update progress. Try again.');
    }
  };

  return (
    <div>
      <h2>Update Progress for Project {projectId}</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {message && <p style={{ color: 'green' }}>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Progress Percentage:</label>
          <input
            type="number"
            min="0"
            max="100"
            value={progressPercentage}
            onChange={(e) => setProgressPercentage(e.target.value)}
            required
          />
        </div>
        <button type="submit">Update Progress</button>
      </form>
    </div>
  );
};

export default UpdateProgress;
