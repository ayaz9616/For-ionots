import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TrackProgress = ({ projectId }) => {
  const [progress, setProgress] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/projects/progress/${projectId}`);
        setProgress(response.data);
      } catch (err) {
        setError('Error fetching progress data.');
      }
    };

    fetchProgress();
  }, [projectId]);

  return (
    <div>
      <h2>Progress for Project {projectId}</h2>
      {error && <p>{error}</p>}
      {progress ? (
        <div>
          <p><strong>Progress Percentage:</strong> {progress.progressPercentage}%</p>
        </div>
      ) : (
        <p>No progress data available.</p>
      )}
    </div>
  );
};

export default TrackProgress;
