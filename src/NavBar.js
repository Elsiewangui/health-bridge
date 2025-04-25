import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './index.css';

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <Link className="nav-link" to="/home">Home</Link>
      <span className="nav-separator">|</span>
      <Link className="nav-link" to="/programs">Add Program</Link>
      <span className="nav-separator">|</span>
      <Link className="nav-link" to="/clients/new">Register Client</Link>
      <span className="nav-separator">|</span>
      <Link className="nav-link" to="/clients">All Clients</Link>
      <span className="nav-separator">|</span>
      <button className="nav-link logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </nav>
  );
}

export default Navbar;
