import React, { useState, useEffect } from "react";

const SkillSelection = () => {
  const [skills, setSkills] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);

  useEffect(() => {
    // Fetch available skills from backend
    fetch("http://localhost:5000/api/skills")
      .then((res) => res.json())
      .then((data) => setSkills(data))
      .catch((error) => console.error("Error fetching skills:", error));
  }, []);

  const handleSkillSelect = (skillId) => {
    setSelectedSkills((prev) =>
      prev.includes(skillId) ? prev.filter((id) => id !== skillId) : [...prev, skillId]
    );
  };

  const handleSubmit = () => {
    console.log("Selected Skills:", selectedSkills);
    // Here we can send selected skills to the backend
  };

  return (
    <div>
      <h2>Select Your Skills</h2>
      <ul>
        {skills.map((skill) => (
          <li key={skill.id}>
            <label>
              <input
                type="checkbox"
                checked={selectedSkills.includes(skill.id)}
                onChange={() => handleSkillSelect(skill.id)}
              />
              {skill.name}
            </label>
          </li>
        ))}
      </ul>
      <button onClick={handleSubmit}>Save Skills</button>
    </div>
  );
};

export default SkillSelection;
