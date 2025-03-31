import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SkillMatching from "./components/SkillMatching";  
import SkillSelection from "./components/SkillSelection";

function Home() {
  return <h1>Welcome to Skill Swap</h1>;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/skill-matching" element={<SkillMatching />} />
        <Route path="/skill-selection" element={<SkillSelection />} />
      </Routes>
    </Router>
  );
}

export default App;
