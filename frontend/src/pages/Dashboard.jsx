import React from "react";
import "./AuthPages.css";
import "./Dashboard.css";
import { House, Code, Users, ChatCircleDots, User, Gear, CalendarBlank, Lightning, Plus, MagnifyingGlass } from "phosphor-react";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useState } from 'react';


const Dashboard = () => {
  const user = { name: "John" };
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
    <li><User size={20} style={{marginRight: 10}} /> Profile</li>
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
            <h3>My Skills</h3>
            <ul>
              {skills.map((s, i) => (
                <li key={i}>
                  <span className="skill-tag">{s.name}</span>
                  <span className="skill-meta">{s.proficiency} | {s.interest}</span>
                </li>
              ))}
            </ul>
            <button className="dashboard-btn">Add Skill</button>
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
        <button><Plus size={16} style={{marginRight: 6}} /> Skill</button>
        <button><MagnifyingGlass size={16} style={{marginRight: 6}} /> Find a Match</button>
        <button>Start New Project</button>
        <button>Post a Task</button>
      </div>
    </section>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;