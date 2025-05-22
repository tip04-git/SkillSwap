import React,{ useState } from "react";
import { Plus, Pencil, X, MagnifyingGlass, House, Code, Users, ChatCircleDots, User, Gear, CalendarBlank, Lightning } from "phosphor-react";
import { useNavigate ,Link} from "react-router-dom";
import "./AuthPages.css";
import "./Dashboard.css";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

// Modal component
function Modal({ open, onClose, title, children }) {
  if (!open) return null;
  return (
    <div className="modal-backdrop" style={{
      position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh",
      background: "rgba(0,0,0,0.25)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000
    }}>
      <div className="modal-content" style={{
        background: "#fff", borderRadius: 12, padding: 24, minWidth: 340, maxWidth: 400, boxShadow: "0 8px 32px rgba(0,0,0,0.15)"
      }}>
        <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16}}>
          <h2 style={{margin: 0, fontSize: 22}}>{title}</h2>
          <button onClick={onClose} style={{background: "none", border: "none", cursor: "pointer"}}><X size={22} /></button>
        </div>
        {children}
      </div>
    </div>
  );
}



const Dashboard = () => {
  const user = { name: "John" };
  const navigate = useNavigate();
  const [editingSkills, setEditingSkills] = useState(false);
  const [skillsList, setSkillsList] = useState([
    { name: "React", proficiency: "Advanced", interest: "High" },
    { name: "Python", proficiency: "Intermediate", interest: "Medium" },
  ]);

  const skills = [
    { name: "React", proficiency: "Advanced", interest: "High" },
    { name: "Python", proficiency: "Intermediate", interest: "Medium" },
  ];
  const matches = [
    { name: "Alice", skills: ["React"], percent: 92 },
    { name: "Bob", skills: ["Python"], percent: 88 },
  ];
  const swaps = [
    { partner: "Alice", skill: "React", progress: "In Progress", date: "2024-06-01" },
  ];
  const opportunities = [
    { type: "Project", title: "Open Source UI Kit" },
    { type: "Mentor", title: "Jane (Data Science)" },
  ];
  const notifications = [
    "New match: Alice",
    "Session with Bob tomorrow",
  ];

  const [date, setDate] = useState(new Date());
  const calendarEvents = {
    "2025-05-20": "Call with mentor",
    "2025-05-22": "Project deadline",
  };

   // Modal state
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);

  // Form state
  const [projectForm, setProjectForm] = useState({ title: "", description: "" });
  const [taskForm, setTaskForm] = useState({ title: "", description: "" });

  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);

  // Skill editing handlers
  const handleSkillChange = (index, field, value) => {
    const updated = [...skillsList];
    updated[index][field] = value;
    setSkillsList(updated);
  };

  const handleAddSkill = () => {
    setSkillsList([...skillsList, { name: "", proficiency: "", interest: "" }]);
  };

  const handleRemoveSkill = (index) => {
    setSkillsList(skillsList.filter((_, i) => i !== index));
  };
   const handleSaveSkills = () => {
    setEditingSkills(false);
    // TODO: Optionally send updated skillsList to backend here
  };

  // Quick Actions handler
  const handleQuickAction = (action) => {
    if (action === "editSkills") setEditingSkills(true);
    if (action === "findMatch") navigate("/skill-matching");
    if (action === "newProject") setShowProjectModal(true);
    if (action === "postTask")  setShowTaskModal(true);
  };
  // Project form submit
  const handleProjectSubmit = (e) => {
    e.preventDefault();
    // TODO: Send projectForm to backend
    setProjects([...projects, projectForm]);
    alert(`Project submitted!\nTitle: ${projectForm.title}\nDescription: ${projectForm.description}`);
    setShowProjectModal(false);
    setProjectForm({ title: "", description: "" });
  };

  // Task form submit
  const handleTaskSubmit = (e) => {
    e.preventDefault();
    // TODO: Send taskForm to backend
    setTasks([...tasks, taskForm]);
    alert(`Task submitted!\nTitle: ${taskForm.title}\nDescription: ${taskForm.description}`);
    setShowTaskModal(false);
    setTaskForm({ title: "", description: "" });
  };

  
  return (
    <div className="dashboard-root">
      {/* Sidebar */}
      <aside className="dashboard-sidebar">
  <h2 className="logo">SkillSwap</h2>
  <ul className="sidebar-links">
    <li className="active"><House size={20} style={{marginRight: 10}} /> Dashboard</li>
    <li><Code size={20} style={{marginRight: 10}} /> My Skills</li>
    <li><Users size={20} style={{marginRight: 10}} /> Matches</li>
    <li><ChatCircleDots size={20} style={{marginRight: 10}} /> Swaps</li>
    <li>
      <Link to="/profile" style={{ color: "inherit", textDecoration: "none", display: "flex", alignItems: "center" }}>
        <User size={20} style={{marginRight: 10}} /> Profile
      </Link>
    </li>
    <li><Gear size={20} style={{marginRight: 10}} /> Settings</li>
  </ul>
</aside>

      {/* Main Content */}
      <main className="dashboard-main">
        <header className="dashboard-header">
          <h1>Welcome back, {user.name} 👋</h1>
          <p>Here's what's happening today:</p>
        </header>

        {/* Panels Grid */}
        <div className="dashboard-panels">
          {/* My Skills Panel */}
<section className="dashboard-panel skills-panel">
  <h3>
    My Skills
    <button className="edit-btn" style={{marginLeft: 10}} onClick={() => setEditingSkills(!editingSkills)}>
      <Pencil size={16} /> {editingSkills ? "Cancel" : "Edit"}
    </button>
  </h3>
  <ul>
    {editingSkills ? (
      skillsList.map((s, i) => (
        <li key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <input
            value={s.name}
            onChange={e => handleSkillChange(i, "name", e.target.value)}
            placeholder="Skill"
            style={{ width: 100 }}
          />
          <input
            value={s.proficiency}
            onChange={e => handleSkillChange(i, "proficiency", e.target.value)}
            placeholder="Proficiency"
            style={{ width: 100 }}
          />
          <input
            value={s.interest}
            onChange={e => handleSkillChange(i, "interest", e.target.value)}
            placeholder="Interest"
            style={{ width: 100 }}
          />
          <button onClick={() => handleRemoveSkill(i)}><X size={16} /></button>
        </li>
      ))
    ) : (
      skillsList.map((s, i) => (
        <li key={i}>
          <span className="skill-tag">{s.name}</span>
          <span className="skill-meta">{s.proficiency} | {s.interest}</span>
        </li>
      ))
    )}
  </ul>
  {editingSkills && (
    <div style={{ marginTop: 10 }}>
      <button onClick={handleAddSkill}><Plus size={16} /> Add Skill</button>
      <button onClick={handleSaveSkills} style={{ marginLeft: 10, background: "#6366f1", color: "#fff", border: "none", borderRadius: 6, padding: "6px 12px" }}>Save</button>
    </div>
  )}
</section>

          {/* Skill Swap Matches */}
          <section className="dashboard-panel matches-panel">
  <h3>Skill Swap Matches</h3>
  <ul className="matches-list">
    {matches.map((m, i) => (
      <li className="match-row" key={i}>
        <div className="match-info">
          <div className="match-name"><strong>{m.name}</strong></div>
          <div className="match-details">
            Skills: {m.skills.join(", ")}<br />
            Match: {m.percent}%
          </div>
        </div>
        <div className="match-buttons">
          <button>Chat</button>
          <button>Profile</button>
          <button>Quest</button>
        </div>
      </li>
    ))}
  </ul>
</section>

          {/* Ongoing Swaps */}
          <section className="dashboard-panel swaps-panel">
            <h3>Ongoing Swaps</h3>
            <ul>
              {swaps.map((s, i) => (
                <li key={i}>
                  <strong>{s.partner}</strong> ({s.skill}) - {s.progress} <span>{s.date}</span>
                  <button>Continue</button>
                  <button>Leave Feedback</button>
                </li>
              ))}
            </ul>
          </section>

          {/* Opportunities Feed */}
          <section className="dashboard-panel opportunities-panel">
            <h3>Opportunities</h3>
            <ul>
              {opportunities.map((o, i) => (
                <li key={i}>
                  <span className="opportunity-type">{o.type}</span> {o.title}
                </li>
              ))}
              {projects.map((p, i) => (
      <li key={`proj-${i}`}>
        <span className="opportunity-type">Project</span> {p.title} - {p.description}
      </li>
    ))}
    {tasks.map((t, i) => (
      <li key={`task-${i}`}>
        <span className="opportunity-type">Task</span> {t.title} - {t.description}
      </li>
    ))}
            </ul>
          </section>

          {/* Notifications Panel */}
          <section className="dashboard-panel notifications-panel">
            <h3>Notifications</h3>
            <ul>
              {notifications.map((n, i) => (
                <li key={i}>{n}</li>
              ))}
            </ul>
          </section>

          {/* XP Tracker */}
          <section className="dashboard-panel xp-panel">
      <h3><Lightning size={20} style={{marginRight: 8}} /> XP Tracker</h3>
      <div className="xp-bar">
        <div className="xp-progress" style={{ width: "60%" }}></div>
      </div>
      <div>Level 3 - 1200 XP</div>
    </section>

          {/* Mini Calendar */}
          <section className="dashboard-panel calendar-panel">
  <h3>
    <CalendarBlank size={20} style={{marginRight: 8}} />
    Mini Calendar
  </h3>
  {/* Selected date display */}
  <div style={{marginBottom: "1rem", fontWeight: 500, color: "#7c3aed"}}>
    {date.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
    {" "}
    <span style={{fontWeight: 400, color: "#888", fontSize: "0.95em"}}>
      {date.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}
    </span>
  </div>
  <Calendar
    onChange={setDate}
    value={date}
    tileClassName={({ date }) => {
      const d = date.toISOString().split('T')[0];
      return calendarEvents[d] ? "event-day" : null;
    }}
  />
  {/* Tasks/events for selected date */}
  {calendarEvents[date.toISOString().split('T')[0]] && (
    <div className="calendar-event-details">
      <strong>Tasks:</strong>
      <ul style={{margin: 0, paddingLeft: 18}}>
        <li>{calendarEvents[date.toISOString().split('T')[0]]}</li>
      </ul>
    </div>
  )}
</section>
          {/* Quick Actions */}
           <section className="dashboard-panel quick-actions-panel">
          <h3>Quick Actions</h3>
          <div className="quick-actions">
            <button onClick={() => handleQuickAction("editSkills")}><Plus size={16} style={{marginRight: 6}} /> Skill</button>
            <button onClick={() => handleQuickAction("findMatch")}><MagnifyingGlass size={16} style={{marginRight: 6}} /> Find a Match</button>
            <button onClick={() => handleQuickAction("newProject")}>Start New Project</button>
            <button onClick={() => handleQuickAction("postTask")}>Post a Task</button>
          </div>
        </section>
        </div>
      </main>
      {/* Project Modal */}
      <Modal open={showProjectModal} onClose={() => setShowProjectModal(false)} title="Start New Project">
        <form onSubmit={handleProjectSubmit}>
          <label>
            Project Title
            <input
              type="text"
              value={projectForm.title}
              onChange={e => setProjectForm({ ...projectForm, title: e.target.value })}
              required
              style={{ width: "100%", margin: "8px 0" }}
            />
          </label>
          <label>
            Description
            <textarea
              value={projectForm.description}
              onChange={e => setProjectForm({ ...projectForm, description: e.target.value })}
              required
              style={{ width: "100%", margin: "8px 0" }}
            />
          </label>
          <button type="submit" className="dashboard-btn" style={{ marginTop: 10 }}>Submit Project</button>
        </form>
      </Modal>

      {/* Task Modal */}
      <Modal open={showTaskModal} onClose={() => setShowTaskModal(false)} title="Post a Task">
        <form onSubmit={handleTaskSubmit}>
          <label>
            Task Title
            <input
              type="text"
              value={taskForm.title}
              onChange={e => setTaskForm({ ...taskForm, title: e.target.value })}
              required
              style={{ width: "100%", margin: "8px 0" }}
            />
          </label>
          <label>
            Description
            <textarea
              value={taskForm.description}
              onChange={e => setTaskForm({ ...taskForm, description: e.target.value })}
              required
              style={{ width: "100%", margin: "8px 0" }}
            />
          </label>
          <button type="submit" className="dashboard-btn" style={{ marginTop: 10 }}>Submit Task</button>
        </form>
      </Modal>
    </div>
  );
};

export default Dashboard;