
import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './Home';
import AddProgram from './AddProgram';
import AddClient from './AddClient';
import AllClients from './AllClients';

function App() {
  return (
    <div className="App">
      <h1>Health Bridge</h1>

      {/* Navigation */}
      <nav>
        <Link to="/">Home</Link> |{" "}
        <Link to="/programs">Add Program</Link> |{" "}
        <Link to="/clients/new">Register Client</Link> |{" "}
        <Link to="/clients">All Clients</Link>
      </nav>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/programs" element={<AddProgram />} />
        <Route path="/clients/new" element={<AddClient />} />
        <Route path="/clients" element={<AllClients />} />
      </Routes>
    </div>
  );
}

export default App;
