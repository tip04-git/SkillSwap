import React, { useState, useEffect } from "react";
import { fetchMatches } from "../api/matchingApi";

const SkillMatch = () => {
    const [matches, setMatches] = useState([]);

    useEffect(() => {
        const userId = 1; // Replace with actual user ID from context/auth
        fetchMatches(userId).then(setMatches);
    }, []);

    return (
        <div>
            <h2>Skill Matches</h2>
            {matches.map((match) => (
                <div key={match.user2}>
                    <p>Matched with User: {match.user2}</p>
                    <p>Skill: {match.skill_id}</p>
                    <p>Match Score: {match.match_score}</p>
                </div>
            ))}
        </div>
    );
};

export default SkillMatch;
