import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SkillMatching from "./components/SkillMatching";  
import SkillSelection from "./components/SkillSelection";
import ProfilePage from "./pages/ProfilePage";
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/Login';
import SignupPage from './pages/Signup';
import Dashboard from './pages/Dashboard';

function Home() {
  return <h1>Welcome to Skill Swap</h1>;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/skill-matching" element={<SkillMatching />} />
        <Route path="/skill-selection" element={<SkillSelection />} />
      </Routes>
    </Router>
  );
}

export default App;
