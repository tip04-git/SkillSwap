import { useEffect, useState } from "react";

const SkillMatching = () => {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/matching/match/1")
      .then((response) => response.json())
      .then((data) => setMatches(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>Skill Matching Results</h2>
      {matches.length > 0 ? (
        <table border="1" cellPadding="10" style={{ width: "100%", textAlign: "left", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>User 1</th>
              <th>User 2</th>
              <th>Skill ID</th>
              <th>User 1 Proficiency</th>
              <th>User 2 Proficiency</th>
              <th>User 1 Interest</th>
              <th>User 2 Interest</th>
              <th>Match Score</th>
            </tr>
          </thead>
          <tbody>
            {matches.map((match, index) => (
              <tr key={index}>
                <td>{match.user1}</td>
                <td>{match.user2}</td>
                <td>{match.skill_id}</td>
                <td>{match.user1_proficiency}</td>
                <td>{match.user2_proficiency}</td>
                <td>{match.user1_interest}</td>
                <td>{match.user2_interest}</td>
                <td>{match.match_score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No matches found.</p>
      )}
    </div>
  );
};

export default SkillMatching;
