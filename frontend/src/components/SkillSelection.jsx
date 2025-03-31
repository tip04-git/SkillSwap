import React, { useState, useEffect } from "react";
import "../pages/SkillSelection.css"; // ✅ Correct (Fixes the error)

const SkillSelection = () => {
  const [skillsList, setSkillsList] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);

  // Fetch skills from API
  useEffect(() => {
    fetch("http://localhost:5000/api/skills")  // Adjust API endpoint as needed
      .then((response) => response.json())
      .then((data) => setSkillsList(data))
      .catch((error) => console.error("Error fetching skills:", error));
  }, []);

  const handleSkillChange = (event) => {
    const skill = event.target.value;
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  const handleSave = () => {
    console.log("Selected Skills:", selectedSkills);
  };

  return (
    <div className="container">
      <h2>Select Your Skills</h2>
      <div className="skills-container">
        {skillsList.length > 0 ? (
          skillsList.map((skill, index) => (
            <label key={index} className="skill-item">
              <input
                type="checkbox"
                value={skill.name} // Assuming API returns { id, name }
                checked={selectedSkills.includes(skill.name)}
                onChange={handleSkillChange}
              />
              {skill.name}
            </label>
          ))
        ) : (
          <p>Loading skills...</p>
        )}
      </div>
      <button className="save-btn" onClick={handleSave}>Save Skills</button>
    </div>
  );
};

export default SkillSelection;
