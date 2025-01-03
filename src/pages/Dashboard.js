import React, { useState, useEffect, useMemo } from "react";
import Select from "react-select";
import "../styles/Dashboard.css";

const Dashboard = () => {
  const availableTeamMembers = useMemo(
    () => [
      {
        value: "John",
        label: "John",
        profilePic: "john.jpg",
        registerNumber: "1234",
        department: "Computer Science",
        mailId: "john@example.com",
      },
      {
        value: "Alice",
        label: "Alice",
        profilePic: "alice.jpg",
        registerNumber: "5678",
        department: "Electrical Engineering",
        mailId: "alice@example.com",
      },
      {
        value: "Bob",
        label: "Bob",
        profilePic: "bob.jpg",
        registerNumber: "91011",
        department: "Mechanical Engineering",
        mailId: "bob@example.com",
      },
    ],
    []
  );

  const availableMentors = useMemo(
    () => [
      { value: "Dr. Smith", label: "Dr. Smith" },
      { value: "Prof. Johnson", label: "Prof. Johnson" },
    ],
    []
  );

  const [teamMembers, setTeamMembers] = useState([]);
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [confirmed, setConfirmed] = useState(false);
  const [notifications, setNotifications] = useState([
    "Friend request pending approval",
    "Mentor approval required for the project",
  ]);
  const [progress, setProgress] = useState(30);

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("teamMentorData"));
    if (savedData) {
      setTeamMembers(savedData.teamMembers || []);
      setSelectedMentor(savedData.selectedMentor || null);
    }
  }, []);

  useEffect(() => {
    if (!confirmed) {
      try {
        localStorage.setItem(
          "teamMentorData",
          JSON.stringify({ teamMembers, selectedMentor })
        );
      } catch (error) {
        console.error("Failed to save to localStorage:", error);
      }
    }
  }, [teamMembers, selectedMentor, confirmed]);

  const handleAddTeamMember = (selectedOption) => {
    if (teamMembers.find((member) => member.value === selectedOption.value)) {
      alert(`${selectedOption.label} is already added to the team.`);
      return;
    }
    setTeamMembers((prevMembers) => [...prevMembers, selectedOption]);
  };

  const handleRemoveTeamMember = (member) => {
    setTeamMembers((prevMembers) =>
      prevMembers.filter((tm) => tm.value !== member.value)
    );
  };

  const handleConfirmSelection = () => {
    if (teamMembers.length === 0 || !selectedMentor) {
      alert(
        "Please select at least one team member and a mentor before confirming."
      );
      return;
    }
    setConfirmed(true);
    alert("Team and Mentor selection confirmed!");
  };

  const handleUndoConfirmation = () => {
    setConfirmed(false);
    setTeamMembers([]);
    setSelectedMentor(null);
    localStorage.removeItem("teamMentorData");
  };

  return (
    <div className="dashboard-container">
      {/* Notifications Section */}
      <div className="card notifications-card">
        <h2>Notifications</h2>
        <ul>
          {notifications.map((notification, index) => (
            <li key={index}>{notification}</li>
          ))}
        </ul>
      </div>

      {/* Team & Mentor Selection */}
      {!confirmed && (
        <>
          <div className="card selection-card">
            <h2>Team Members</h2>
            <Select
              options={availableTeamMembers}
              onChange={handleAddTeamMember}
              placeholder="Add team members"
              isDisabled={confirmed}
              className="select-box"
              isSearchable
            />
            <div className="selected-team-members">
              {teamMembers.map((member) => (
                <div key={member.value} className="team-member">
                  {member.label}
                  {!confirmed && (
                    <button
                      onClick={() => handleRemoveTeamMember(member)}
                      className="remove-btn"
                      aria-label={`Remove ${member.label}`}
                    >
                      <i className="fas fa-times"></i>
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="card selection-card">
            <h2>Mentor</h2>
            <Select
              options={availableMentors}
              onChange={setSelectedMentor}
              placeholder="Select a mentor"
              isDisabled={confirmed}
              className="select-box"
            />
            {selectedMentor && <p>Selected Mentor: {selectedMentor.label}</p>}
          </div>

          <button
            onClick={handleConfirmSelection}
            className="confirm-btn"
            disabled={confirmed}
          >
            Confirm Selection
          </button>
        </>
      )}

      {/* Confirmation Summary */}
      {confirmed && (
        <div className="card confirmation-summary-card">
          <div className="team-details">
            <h3>Team Details</h3>
            <p>Team ID: 12345</p>
            <div className="team-member-list">
              {teamMembers.map((tm) => (
                <div className="team-member" key={tm.registerNumber}>
                  <img
                    src={tm.profilePic}
                    alt={`${tm.name}'s Profile`}
                    className="team-member-profile-pic"
                  />
                  <div className="team-member-info">
                    <p>
                      <strong>Name:</strong> {tm.name}
                    </p>
                    <p>
                      <strong>Register Number:</strong> {tm.registerNumber}
                    </p>
                    <p>
                      <strong>Department:</strong> {tm.department}
                    </p>
                    <p>
                      <strong>Email:</strong> {tm.mailId}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mentor-details">
            <h3>Mentor Details</h3>
            <p>
              <strong>Mentor:</strong> {selectedMentor?.label}
            </p>
          </div>
        </div>
      )}

      {/* Mentor Communication */}
      <div className="card communication-card">
        <h2>Contact Mentor</h2>
        <textarea
          className="mentor-message"
          placeholder="Write a message to your mentor..."
        ></textarea>
        <button className="send-message-btn">Send Message</button>
      </div>
    </div>
  );
};

export default Dashboard;
