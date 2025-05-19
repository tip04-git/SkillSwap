import './LandingPage.css';
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="landing-root">
      {/* Navbar */}
      <nav className="landing-navbar">
        <h1 className="landing-navbar-title">SkillSwap</h1>
        <div className="landing-navbar-links">
          <Link to="/features" className="landing-navbar-link">Features</Link>
          <Link to="/login" className="landing-navbar-link">Login</Link>
          <Link to="/signup" className="landing-navbar-link signup">Get Started</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="landing-hero">
        <h2 className="landing-hero-title">Swap Skills, Build Futures</h2>
        <p className="landing-hero-desc">
          Connect with students, mentors, and professionals to exchange skills, grow together, and create real impact through collaboration.
        </p>
        <div className="landing-hero-actions">
          <Link to="/signup" className="landing-btn primary">Join Now</Link>
          <Link to="/explore" className="landing-btn secondary">Explore Skills</Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        © 2025 SkillSwap. Built with 💡 and ☕ by the community.
      </footer>
    </div>
  );
};

export default LandingPage;