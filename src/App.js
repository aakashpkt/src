import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import LoginPage from "./pages/Login";
import Navbar from "./components/Navbar";
import Profile from "./pages/ProfilePage";
import ProjectsPage from "./pages/ProjectPage";
import ProjectDetailsPage from "./pages/ProjectDetailsPage";
import "./App.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <div>
      {isAuthenticated && <Navbar />}
      <div className="main-content">
        <Routes>
          {/* Login Route */}
          <Route
            path="/login"
            element={<LoginPage onLogin={() => setIsAuthenticated(true)} />}
          />

          {/* Redirect Root Path to Dashboard or Login */}
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <Navigate to="/dashboard" />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
          />
          <Route
            path="/projects"
            element={
              isAuthenticated ? <ProjectsPage /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/projects/:projectId"
            element={
              isAuthenticated ? (
                <ProjectDetailsPage />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/profile"
            element={isAuthenticated ? <Profile /> : <Navigate to="/login" />}
          />

          {/* Catch-All Route */}
          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
