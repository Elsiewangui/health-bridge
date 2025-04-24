import React from 'react';
import { Routes, Route , useLocation} from 'react-router-dom';
import Home from './Home';
import AddProgram from './AddProgram';
import AddClient from './AddClient';
import AllClients from './AllClients';
import ClientProfile from './ClientProfile';
import EditClient from './EditClient';
import NavBar from './NavBar'; 

function App() {
  const location = useLocation();

  const isHomePage = location.pathname === '/';

  return (
    <div className="App">
      {/* Only show Navbar if NOT on homepage */}
      {!isHomePage && <NavBar />}

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/programs" element={<AddProgram />} />
        <Route path="/clients/new" element={<AddClient />} />
        <Route path="/clients" element={<AllClients />} />
        <Route path="/client/:id" element={<ClientProfile />} />
        <Route path="/clients/:id/edit" element={<EditClient />} />
      </Routes>
    </div>
  );
}

export default App;
