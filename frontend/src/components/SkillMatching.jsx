import React, { useState, useEffect } from "react";

const SkillMatching = () => {
  const [skills, setSkills] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [proficiency, setProficiency] = useState("");
  const [interest, setInterest] = useState("");
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    // Fetch skills from backend
    fetch("http://localhost:5000/api/skills")
      .then((res) => res.json())
      .then((data) => setSkills(data))
      .catch((err) => console.error(err));
  }, []);

  const handleFilter = async () => {
    const response = await fetch("http://localhost:5000/api/matching/match", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        skills: selectedSkills,
        proficiency,
        interest,
      }),
    });

    const data = await response.json();
    setMatches(data);
  };

  return (
    <div>
      <h2>Skill Matching</h2>
      
      {/* Skill Selection */}
      <select multiple onChange={(e) => setSelectedSkills([...e.target.selectedOptions].map(o => o.value))}>
        {skills.map((skill) => (
          <option key={skill.id} value={skill.id}>{skill.name}</option>
        ))}
      </select>

      {/* Proficiency Filter */}
      <select onChange={(e) => setProficiency(e.target.value)}>
        <option value="">Select Proficiency</option>
        <option value="Beginner">Beginner</option>
        <option value="Intermediate">Intermediate</option>
        <option value="Advanced">Advanced</option>
      </select>

      {/* Interest Filter */}
      <select onChange={(e) => setInterest(e.target.value)}>
        <option value="">Select Interest Level</option>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>

      <button onClick={handleFilter}>Apply Filters</button>

      {/* Display Results */}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Skills</th>
          </tr>
        </thead>
        <tbody>
          {matches.map((match, index) => (
            <tr key={index}>
              <td>{match.name}</td>
              <td>{match.skills.join(", ")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SkillMatching;
