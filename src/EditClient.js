import React, { useState, useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ClientContext } from "./context/ClientContext";
import axios from "axios";

const EditClient = () => {
  const { id } = useParams();
  const { clients } = useContext(ClientContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    phone: "",
    country: "",
    nextOfKinName: "",
    nextOfKinRelation: "",
    nextOfKinPhone: "",
    programs: []
  });

  // Load the client details by ID
  useEffect(() => {
    const client = clients.find(client => client.id === Number(id));
    if (client) {
      setFormData({ ...client });
    } else {
      alert("Client not found");
      navigate("/");
    }
  }, [id, clients, navigate]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .put(`http://localhost:5000/clients/${id}`, formData)
      .then((response) => {
        console.log("Client updated:", response.data);
        alert("Client updated successfully");
        navigate(`/clients`); // Redirect to updated profile
      })
      .catch((error) => {
        console.error("Error updating client:", error);
        alert("Error updating client");
      });
  };

  // Input change handler with phone length check
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Limit phone fields to 10 digits and numbers only
    if ((name === "phone" || name === "nextOfKinPhone") && !/^\d{0,10}$/.test(value)) {
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="edit-client-container">
      <h2>Edit Client</h2>
      <form className="edit-client-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          required
        />
        <input
          type="date"
          name="dob"
          value={formData.dob}
          onChange={handleChange}
          placeholder="Date of Birth"
          required
        />
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Phone"
          maxLength="10"
          required
        />
        <input
          type="text"
          name="country"
          value={formData.country}
          onChange={handleChange}
          placeholder="Country"
          required
        />
        <input
          type="text"
          name="nextOfKinName"
          value={formData.nextOfKinName}
          onChange={handleChange}
          placeholder="Next of Kin Name"
        />
        <input
          type="text"
          name="nextOfKinRelation"
          value={formData.nextOfKinRelation}
          onChange={handleChange}
          placeholder="Next of Kin Relation"
        />
        <input
          type="text"
          name="nextOfKinPhone"
          value={formData.nextOfKinPhone}
          onChange={handleChange}
          placeholder="Next of Kin Phone"
          maxLength="10"
        />

        <button type="submit">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditClient;
