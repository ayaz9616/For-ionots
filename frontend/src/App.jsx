import { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CreateProject from './components/createProject'; // Import the form component

import TrackProgress from './components/TrackProgress';

function ProjectList() {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data from the backend
    axios.get('http://localhost:5000/api/projects')
      .then((response) => {
        console.log("API Response:", response.data);
        setProjects(response.data);
      })
      .catch((error) => {
        console.error("Error fetching projects:", error.message);
        setError("Error fetching data. Please check the server.");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <h2 className="text-center text-gray-500 mt-10">Loading...</h2>;
  if (error) return <h2 className="text-center text-red-500 mt-10">{error}</h2>;

  return (
    <div className="bg-gray-100 min-h-screen py-10 px-6">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-blue-600">Admin Panel - Project List</h1>

          <Link to="/create">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition">
              Create New Project
            </button>
          </Link>
        </div>

        <div>
          {projects.length > 0 ? (
            <ul className="divide-y divide-gray-300">
              {projects.map((project, index) => (
                <li key={index} className="p-4 hover:bg-gray-100 rounded-md transition">
                  <div className="flex justify-between items-center">
                    <div>
                      <h2 className="text-lg font-semibold text-gray-800">{project.title}</h2>
                      <p className="text-gray-600">{project.description}</p>
                    </div>
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded">
                      {project.status || "Pending"}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-gray-500">No projects found</p>
          )}
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProjectList />} />
        <Route path="/track-progress/:projectId" element={<TrackProgress />} />
        <Route path="/create" element={<CreateProject />} />
      </Routes>
    </Router>
  );
}

export default App;
