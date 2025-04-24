import React, { useContext, useState } from "react";
import { ClientContext } from "./context/ClientContext";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const AllClients = () => {
  const { clients } = useContext(ClientContext);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const filteredClients = clients.filter((client) => {
    const nameMatch = client.name.toLowerCase().includes(searchTerm);
    const programMatch = client.programs.some((program) =>
      program.toLowerCase().includes(searchTerm)
    );
    return nameMatch || programMatch;
  });

  return (
    <div className="all-clients-container">
      <h2>All Clients</h2>
      <input
        type="text"
        placeholder="Search by name or program..."
        value={searchTerm}
        onChange={handleSearchChange}
      />

      <ul className="all-clients-list">
        {filteredClients.map((client, index) => (
          <li key={index}>
            <Link to={`/client/${client.id}`}> {/* Link to client profile */}
              <strong>{client.name}</strong>
            </Link>
            — Programs:{" "}
            {client.programs.length > 0
              ? client.programs.join(", ")
              : "None enrolled"}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllClients;
