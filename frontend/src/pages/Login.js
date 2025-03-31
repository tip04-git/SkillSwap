import { useState, useEffect } from "react";

function MatchUsers() {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/match/1") // Replace `1` with logged-in user ID
      .then((res) => res.json())
      .then((data) => setMatches(data))
      .catch((err) => console.error("Error fetching matches:", err));
  }, []);

  return (
    <div>
      <h2>🔗 Matched Users</h2>
      <ul>
        {matches.map((match, index) => (
          <li key={index}>
            User {match.user2} - Match Score: {match.match_score}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MatchUsers;
