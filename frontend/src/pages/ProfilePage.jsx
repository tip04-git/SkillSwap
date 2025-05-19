import React, { useEffect, useState } from "react";
import axios from "axios";
import './ProfilePage.css'; // Adjust the path based on where your CSS file is


const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
  const fetchUserData = async () => {
    try {
      const response = await fetch('/api/user/profile');
      if (!response.ok) {
        throw new Error('Failed to fetch profile');
      }
      const data = await response.json();
      setUser(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  fetchUserData();
}, []);

if (loading) return <p>Loading...</p>;
if (error) return <p>Error: {error}</p>;
  return (
    <div className="profile-container">
      <h1>User Profile</h1>
      <div className="profile-info">
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
      </div>
      <div className="skills">
        <h3>Selected Skills</h3>
        <ul>
          {user.skills.map((skill, index) => (
            <li key={index}>{skill}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProfilePage;
