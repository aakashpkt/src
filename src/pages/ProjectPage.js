import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/ProjectPage.css";

const ProjectsPage = () => {
  const navigate = useNavigate();

  // Sample list of projects
  const projects = [
    { id: 1, name: "Project 1", description: "This is the description of Project 1" },
    { id: 2, name: "Project 2", description: "This is the description of Project 2" },
    { id: 3, name: "Project 3", description: "This is the description of Project 3" },
  ];

  const mentorDetails = {
    name: "Dr. John Doe",
    profilePic: "https://via.placeholder.com/100",
    email: "john.doe@example.com",
    department: "Computer Science",
  };

  const handleViewDetails = (projectId) => {
    navigate(`/projects/${projectId}`);
  };

  const handleAddProject = () => {
    // Logic to handle adding a new project (e.g., opening a form or modal)
    console.log("Add Project button clicked");
  };

  return (
    <div className="container">
      <div className="header">
        <h1>Projects</h1>
        <button className="add-project-btn" onClick={handleAddProject}>
          + Add Project
        </button>
      </div>
      <div className="content">
        {/* Left Side: Projects List */}
        <div className="projects-list">
          {projects.map((project) => (
            <div key={project.id} className="project-card">
              <h3>{project.name}</h3>
              <p>{project.description}</p>
              <button className="view-details-btn" onClick={() => handleViewDetails(project.id)}>
                View Details
              </button>
            </div>
          ))}
        </div>

        {/* Right Side: Mentor Details */}
        <div className="mentor-details">
          <div className="mentor-card">
            <img src={mentorDetails.profilePic} alt="Mentor Profile" className="mentor-pic" />
            <h3>{mentorDetails.name}</h3>
            <p><strong>Email:</strong> {mentorDetails.email}</p>
            <p><strong>Department:</strong> {mentorDetails.department}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;
