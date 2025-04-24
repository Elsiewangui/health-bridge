import React from 'react';
import { Link } from 'react-router-dom';
import './index.css'; 

function Navbar() {
  return (
    <nav className="navbar">
      <Link className="nav-link" to="/">Home</Link>
      <span className="nav-separator">|</span>
      <Link className="nav-link" to="/programs">Add Program</Link>
      <span className="nav-separator">|</span>
      <Link className="nav-link" to="/clients/new">Register Client</Link>
      <span className="nav-separator">|</span>
      <Link className="nav-link" to="/clients">All Clients</Link>
    </nav>
  );
}

export default Navbar;
