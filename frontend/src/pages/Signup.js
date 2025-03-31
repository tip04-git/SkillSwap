import React from "react";
import SkillMatches from "../components/Matching/SkillMatches"; // Adjust path if needed

const Dashboard = () => {
  const userId = 1; // Replace with dynamic logged-in user ID

  return (
    <div>
      <h1>Dashboard</h1>
      <SkillMatches userId={userId} /> {/* Integrating the skill matching component */}
    </div>
  );
};

export default Dashboard;
