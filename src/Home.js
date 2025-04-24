import React from 'react';
import { Link } from 'react-router-dom';
import './index.css';

function HomePage() {
  return (
    <div className="home-container">
      <h1 className="home-title">Welcome to Health Bridge</h1>
      <p className="home-description">
        Your trusted system for managing clients and health programs.
      </p>
      <ul className="home-features">
        <li> Register and manage client profiles</li>
        <li> Enroll clients in health programs like Malaria, Diabetes & Hypertension</li>
        <li> Search and update client records</li>
        <li> View all registered health programs</li>
      </ul>

      <div className="home-links">
        <Link className="home-button" to="/clients/new">Add New Client</Link>
        <Link className="home-button" to="/programs"> Manage Health Programs</Link>
        <Link className="home-button" to="/clients">View All Clients</Link>
        <Link className="home-button" to="/clients"> Search Client</Link>
      </div>
    </div>
  );
}

export default HomePage;
