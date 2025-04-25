import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const ClientProfile = () => {
  const { id } = useParams();
  const [client, setClient] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/clients/${id}`)
      .then((res) => setClient(res.data))
      .catch((err) => {
        setError("Client not found");
        console.error("Error fetching client details:", err);
      });
  }, [id]);

  const handleDelete = () => {
    axios
      .delete(`http://localhost:5000/clients/${id}`)
      .then(() => {
        toast.success("Client deleted successfully");
        navigate("/home");
      })
      .catch((err) => {
        toast.error("Error deleting client");
        console.error(err);
      });
  };

  if (error) return <p>{error}</p>;
  if (!client) return <p>Loading...</p>;

  return (
    <div className="client-profile-container">
      <h2>{client.name}'s Profile</h2>
      <p><strong>DOB:</strong> {client.dob}</p>
      <p><strong>Phone:</strong> {client.phone}</p>
      <p><strong>Country:</strong> {client.country}</p>
      <p><strong>Next of Kin:</strong> {client.nextOfKinName} ({client.nextOfKinRelation})</p>
      <p><strong>Next of Kin Phone:</strong> {client.nextOfKinPhone}</p>
      <p><strong>Programs Enrolled:</strong> {client.programs.length > 0 ? client.programs.join(", ") : "None"}</p>
      
      <div className="client-profile-buttons">
        <Link to={`/clients/${id}/edit`}>
          <button style={{ marginRight: "10px" }}>Edit Client</button>
        </Link>
        <button onClick={handleDelete}>Delete Client</button>
      </div>
    </div>
  );
};

export default ClientProfile;
