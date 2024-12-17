// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
// import CreateProject from './components/createProject'; // Import the form component

// function ProjectList() {
//   const [projects, setProjects] = useState([]);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [button,setButton]=useState('Accept project')

//   useEffect(() => {
//     // Fetch data from the backend
//     axios.get('http://localhost:5000/api/projects')
//       .then((response) => {
//         console.log("API Response:", response.data); // Debug log
//         setProjects(response.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching projects:", error.message);
//         setError("Error fetching data. Please check the server.");
//       })
//       .finally(() => setLoading(false));
//   }, []);

//   if (loading) return <h2>Loading...</h2>;
//   if (error) return <h2>{error}</h2>;




//   return (
//     <div>
//       <h1 className='text-3xl bg-amber-500'>Assigned Projects</h1>
//       {/* <Link to="/create"><button>Assigned Projects</button></Link> Navigation to form */}
//       <ul>
//         {projects.length > 0 ? (
//           projects.map((project, index) => (
//             <div className='flex '>
//                 <li key={index}>{project.title}</li> 
//                 <div>{project.description}</div>
//                 <button className='bg-emerald-300 rounded-full p-1 item-center justify-center' onClick={setButton}>{button}</button>
//             </div>
            
//           ))
//         ) : (
//           <li>No projects found</li>
//         )}
//       </ul>
//     </div>
//   );
// }

// function StudentApp() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<ProjectList />} />
//         <Route path="/create" element={<CreateProject />} /> {/* Add create project route */}
//       </Routes>
//     </Router>
//   );
// }

// export default StudentApp;



import { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import CreateProject from './components/createProject';
import { useLocation } from 'react-router-dom';
import UpdateProgress from './components/UpdateProgress';


function ProjectList() {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [acceptedTasks, setAcceptedTasks] = useState({}); // State to store accepted tasks
  const navigate = useNavigate();

  useEffect(() => {
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

  const handleAccept = (index) => {
    setAcceptedTasks((prev) => ({
      ...prev,
      [index]: projects[index], // Store the project object as an accepted task
    }));
  };

  const goToTrackPortal = () => {
    navigate('/track', { state: { tasks: Object.values(acceptedTasks) } }); // Pass tasks via state
  };

  if (loading) return <h2 className="text-center mt-10 text-2xl text-gray-500">Loading...</h2>;
  if (error) return <h2 className="text-center mt-10 text-red-500">{error}</h2>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold text-center text-blue-600 mb-6">Assigned Projects</h1>
      <ul className="space-y-6">
        {projects.length > 0 ? (
          projects.map((project, index) => (
            <div
              key={index}
              className="bg-white shadow-md p-4 rounded-lg flex flex-col md:flex-row justify-between items-start md:items-center"
            >
              {/* Project Details */}
              <div className="flex-1">
                <h2 className="text-2xl font-semibold text-gray-800">{project.title}</h2>
                <p className="text-gray-600">{project.description}</p>
              </div>

              {/* Accept Button */}
              {!acceptedTasks[index] ? (
                <button
                  className="mt-4 md:mt-0 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded transition duration-300"
                  onClick={() => handleAccept(index)}
                >
                  Accept Project
                </button>
              ) : (
                <button
                  className="mt-4 md:mt-0 bg-gray-300 text-gray-700 py-2 px-4 rounded cursor-not-allowed"
                  disabled
                >
                  Task Accepted
                </button>
              )}
            </div>
          ))
        ) : (
          <li className="text-center text-gray-500 text-xl">No projects found</li>
        )}
      </ul>

      {/* Track Task Button */}
      {Object.keys(acceptedTasks).length > 0 && (
        <div className="mt-6 text-center">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            onClick={goToTrackPortal}
          >
            Go to Track Task Portal
          </button>
        </div>
      )}
    </div>
  );
}

function TrackTaskPortal() {
    const location = useLocation();
    const tasks = location.state?.tasks || []; // Retrieve tasks from navigation state
  
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-200">
        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-3xl">
          <h1 className="text-4xl font-bold text-blue-600 mb-4">Track Task Portal</h1>
          {tasks.length > 0 ? (
            <ul className="space-y-4">
              {tasks.map((task, index) => (
                <li
                  key={index}
                  className="p-4 bg-blue-100 rounded-lg shadow-md flex justify-between items-center"
                >
                  <div>
                    <h2 className="text-2xl font-semibold text-blue-800">{task.title}</h2>
                    <p className="text-gray-700">{task.description}</p>
                  </div>
                  <span className="text-green-600 font-bold">Accepted</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-lg">No tasks have been accepted yet.</p>
          )}
        </div>
      </div>
    );
  }

function StudentApp() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProjectList />} />
        <Route path="/update-progress/:projectId" element={<UpdateProgress />} />

        <Route path="/create" element={<CreateProject />} />
        <Route path="/track" element={<TrackTaskPortal />} />
      </Routes>
    </Router>
  );
}

export default StudentApp;
