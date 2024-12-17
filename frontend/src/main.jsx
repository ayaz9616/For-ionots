import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx'; // Admin Portal
import StudentApp from './App.student.jsx'; // Student Portal

function MainApp() {
  const [selectedApp, setSelectedApp] = useState(null);

  // Render selected app
  if (selectedApp === 'admin') return <App />;
  if (selectedApp === 'student') return <StudentApp />;

  // Default selection screen
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className='text-5xl mb-5'>ionots Technologies Pvt Ltd</h1>
      <img src="https://media.licdn.com/dms/image/v2/D560BAQGAW1ymg_SJnQ/company-logo_100_100/company-logo_100_100/0/1732675673693/ionots_logo?e=1742428800&v=beta&t=uK6Gc_0S8giSaZxGZfeQg9wpe1QpkKZlOUGhyzOy2KY" alt="" />
      <h1 className="text-3xl font-bold text-blue-600 mb-6 mt-48">Choose Your Portal</h1>
      <div className="flex space-x-4">
        <button
          onClick={() => setSelectedApp('admin')}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 transition duration-200"
        >
          Admin Portal
        </button>
        <button
          onClick={() => setSelectedApp('student')}
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-700 transition duration-200"
        >
          Student Portal
        </button>
      </div>
    </div>
  );
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MainApp />
  </React.StrictMode>
);
