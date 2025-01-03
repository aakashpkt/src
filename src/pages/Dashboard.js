import React, { useState } from "react";

const Dashboard = () => {
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [mentorMessage, setMentorMessage] = useState("");
  const [friendRequests, setFriendRequests] = useState([
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
  ]);

  const addTeamMember = (member) => {
    if (!selectedMembers.includes(member)) {
      setSelectedMembers([...selectedMembers, member]);
    }
  };

  const removeTeamMember = (member) => {
    setSelectedMembers(selectedMembers.filter((m) => m !== member));
  };

  const sendMessage = () => {
    if (mentorMessage.trim()) {
      alert("Message sent to the mentor!");
      setMentorMessage("");
    }
  };

  const handleFriendRequest = (id, action) => {
    if (action === "accept") {
      alert(`Friend request from user ${id} accepted`);
    } else {
      alert(`Friend request from user ${id} rejected`);
    }
    setFriendRequests(friendRequests.filter((req) => req.id !== id));
  };

  return (
    <div className="dashboard-container">
      <div className="card">
        <h2>Team Management</h2>
        <ul className="team-member-list">
          {selectedMembers.map((member, index) => (
            <li key={index} className="team-member">
              <span>{member}</span>
              <button
                className="remove-btn"
                onClick={() => removeTeamMember(member)}
                aria-label={`Remove ${member}`}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="card communication-card">
        <h2>Mentor Communication</h2>
        <textarea
          className="mentor-message"
          value={mentorMessage}
          onChange={(e) => setMentorMessage(e.target.value)}
          placeholder="Type your message to the mentor..."
          aria-label="Mentor Message"
        />
        <button
          className="send-message-btn"
          onClick={sendMessage}
          disabled={!mentorMessage.trim()}
        >
          Send Message
        </button>
      </div>

      <div className="card friend-requests-card">
        <h2>Friend Requests</h2>
        {friendRequests.length > 0 ? (
          friendRequests.map((request) => (
            <div key={request.id} className="team-member">
              <span>{request.name}</span>
              <button
                className="accept-btn"
                onClick={() => handleFriendRequest(request.id, "accept")}
              >
                Accept
              </button>
              <button
                className="reject-btn"
                onClick={() => handleFriendRequest(request.id, "reject")}
              >
                Reject
              </button>
            </div>
          ))
        ) : (
          <p>No new friend requests.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
