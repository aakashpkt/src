import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar = () => {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div>
      {/* Sidebar */}
      <div className={`sidebar ${isSidebarOpen ? "active" : ""}`}>
        <div className="sidebar-close" onClick={toggleSidebar}>
          <i className="fas fa-times"></i>
        </div>
        <Link
          to="/dashboard"
          className={`sidebar-link ${location.pathname === "/dashboard" ? "active" : ""}`}
          onClick={toggleSidebar}
        >
          Dashboard
        </Link>
        <Link
          to="/projects"
          className={`sidebar-link ${location.pathname === "/projects" ? "active" : ""}`}
          onClick={toggleSidebar}
        >
          Projects
        </Link>
      </div>

      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-container">
          {/* Left side */}
          <div className="navbar-left">
            <Link to="/" className="navbar-logo">
              My App
            </Link>
            <div className="navbar-links">
              <Link
                to="/dashboard"
                className={`navbar-link ${location.pathname === "/dashboard" ? "active" : ""}`}
              >
                Dashboard
              </Link>
              <Link
                to="/projects"
                className={`navbar-link ${location.pathname === "/projects" ? "active" : ""}`}
              >
                Projects
              </Link>
            </div>
          </div>

          {/* Right side */}
          <div className="navbar-right">
            <span className="username">John Doe</span>
            <div className="profile">
              <img
                src="https://via.placeholder.com/40" // Replace with the actual profile picture URL
                alt="Profile"
                className="profile-picnav"
                onClick={toggleDropdown}
              />
              <div className="inbox">
                <i className="fas fa-inbox"></i>
              </div>
              {isDropdownOpen && (
                <div className="dropdown-menu">
                  <Link to="/profile" className="dropdown-item">Profile</Link>
                  <Link to="/password-reset" className="dropdown-item">Password Reset</Link>
                  <Link to="/logout" className="dropdown-item">Logout</Link>
                </div>
              )}
            </div>
          </div>

          {/* Hamburger menu for mobile */}
          <div className="hamburger-icon" onClick={toggleSidebar}>
            <i className="fas fa-bars"></i>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
