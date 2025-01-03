// src/App.js
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import LoginPage from "./pages/Login";
import Navbar from "./components/Navbar";
import Profile from "./pages/ProfilePage";
import ProjectsPage from "./pages/ProjectPage"; // Import Projects Page
import ProjectDetailsPage from "./pages/ProjectDetailsPage"; // Import Project Details Page
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <div>
        {/* Show Navbar only when the user is authenticated */}
        {isAuthenticated && <Navbar />}

        <div className="main-content">
          <Routes>
            {/* Login Route */}
            <Route 
              path="/login" 
              element={<LoginPage onLogin={() => setIsAuthenticated(true)} />} 
            />

            {/* Redirect Root Path to Dashboard */}
            <Route 
              path="/" 
              element={isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} 
            />

            {/* Protected Routes */}
            <Route 
              path="/dashboard" 
              element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} 
            />

            {/* Projects Page Route */}
            <Route 
              path="/projects" 
              element={isAuthenticated ? <ProjectsPage /> : <Navigate to="/login" />} 
            />

            {/* Project Details Page Route */}
            <Route 
              path="/projects/:projectId" 
              element={isAuthenticated ? <ProjectDetailsPage /> : <Navigate to="/login" />} 
            />

            {/* Profile Page Route */}
            <Route 
              path="/profile" 
              element={isAuthenticated ? <Profile /> : <Navigate to="/login" />} 
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
