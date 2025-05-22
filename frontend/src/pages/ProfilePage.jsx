import React, { useEffect, useState } from "react";
import "./ProfilePage.css";
import { Pencil, MapPin, Clock, LinkedinLogo, GithubLogo } from "phosphor-react";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch('http://localhost:5000/api/users/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
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

  // Fallbacks for missing fields
  const {
    name,
    bio = "No bio yet.",
    location = "Not specified",
    availability = "Not specified",
    profilePhoto = "https://i.pravatar.cc/150?img=3",
    skills = [],
    interests = [],
    experience = [],
    social = {},
    email
  } = user || {};

  return (
    <div className="profile-page">
      <div className="profile-header">
        <img src={profilePhoto} alt="User" className="profile-photo" />
        <div className="profile-info">
          <h2>{name}</h2>
          <p>{bio}</p>
          <p><MapPin size={16} /> {location}</p>
          <p><Clock size={16} /> Available: {availability}</p>
          <button className="edit-btn"><Pencil size={16} /> Edit Profile</button>
        </div>
      </div>

      <div className="profile-section">
        <h3>Skills</h3>
        <ul className="tag-list">
          {skills.map((skill, i) => <li key={i}>{skill}</li>)}
        </ul>
      </div>

      <div className="profile-section">
        <h3>Interests</h3>
        <ul className="tag-list">
          {interests.length > 0 ? interests.map((int, i) => <li key={i}>{int}</li>) : <li>No interests listed</li>}
        </ul>
      </div>

      <div className="profile-section">
        <h3>Experience</h3>
        <ul className="experience-list">
          {experience.length > 0 ? experience.map((exp, i) => (
            <li key={i}>
              <strong>{exp.title}</strong> at {exp.company} – {exp.duration}
            </li>
          ))  : <li>No experience listed</li>}
        </ul>
      </div>

      <div className="profile-section">
        <h3>Connect</h3>
        {social.linkedin && (
          <a href={social.linkedin} target="_blank" rel="noreferrer">
            <LinkedinLogo size={24} />
          </a>
        )}
        {social.github && (
          <a href={social.github} target="_blank" rel="noreferrer">
            <GithubLogo size={24} />
          </a>
        )}
        {!social.linkedin && !social.github && <span>No social links</span>}
      </div>
    </div>
  );
};

export default ProfilePage;