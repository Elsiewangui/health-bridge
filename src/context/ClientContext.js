import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const ClientContext = createContext();

export const ClientProvider = ({ children }) => {
  const [clients, setClients] = useState([]);

  // Fetch clients from the backend
  useEffect(() => {
    axios.get("http://localhost:5000/clients")
      .then((res) => {
        setClients(res.data);
      })
      .catch((err) => console.error("Error fetching clients:", err));
  }, []);

  // Add a new client to the backend
  const addClient = async (clientData) => {
    try {
      const res = await axios.post("http://localhost:5000/clients", clientData);
      setClients((prev) => [...prev, res.data]); // use backend's response (with ID)
    } catch (error) {
      console.error("Error adding client:", error);
    }
  };

  // Delete a client
  const deleteClient = (id) => {
    axios
      .delete(`http://localhost:5000/clients/${id}`)
      .then(() => {
        // Update the clients state after deletion
        setClients((prevClients) =>
          prevClients.filter((client) => client.id !== id)
        );
        alert("Client deleted successfully");
      })
      .catch((err) => {
        alert("Error deleting client");
        console.error(err);
      });
  };

  // Edit an existing client
  const editClient = (id, updatedClientData) => {
    axios
      .put(`http://localhost:5000/clients/${id}`, updatedClientData)
      .then((res) => {
        // Update the clients state with the new data
        setClients((prevClients) =>
          prevClients.map((client) =>
            client.id === id ? { ...client, ...updatedClientData } : client
          )
        );
        alert("Client updated successfully");
      })
      .catch((err) => {
        alert("Error updating client");
        console.error(err);
      });
  };

  return (
    <ClientContext.Provider value={{ clients, addClient, deleteClient, editClient }}>
      {children}
    </ClientContext.Provider>
  );
};
