import React, { useState, useEffect } from "react";
import axios from "axios";

function RegisterClient() {
  const [clientData, setClientData] = useState({
    name: "",
    dob: "",
    phone: "",
    country: "",
    nextOfKinName: "",
    nextOfKinRelation: "",
    nextOfKinPhone: "",
    programs: []
  });

  const [programs, setPrograms] = useState([]); // Store programs fetched from the backend

  // Fetch available programs when the component is mounted
  useEffect(() => {
    axios
      .get("http://localhost:5000/programs") // Assuming this is the API endpoint for programs
      .then((res) => {
        setPrograms(res.data); // Set programs into state
      })
      .catch((err) => console.error("Error fetching programs:", err));
  }, []);

  // Handle changes to the form inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setClientData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle checkbox changes for programs
  const handleProgramChange = (e) => {
    const { value, checked } = e.target;
    setClientData((prev) => {
      const programs = checked
        ? [...prev.programs, value] // Add program if checked
        : prev.programs.filter((program) => program !== value); // Remove program if unchecked

      return { ...prev, programs };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/clients", clientData)
      .then((res) => {
        console.log("Client registered:", res.data);
      })
      .catch((err) => console.error("Error registering client:", err));
  };

  return (
    <div>
      <h2>Register Client</h2>
      <div className="register-container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={clientData.name}
          onChange={handleChange}
          placeholder="Client Name"
          required
        />
        <input
          type="date"
          name="dob"
          value={clientData.dob}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="phone"
          maxLength="10"
          value={clientData.phone}
          onChange={handleChange}
          placeholder="Phone Number"
          required
        />
        <input
          type="text"
          name="country"
          value={clientData.country}
          onChange={handleChange}
          placeholder="Country"
          required
        />
        <input
          type="text"
          name="nextOfKinName"
          value={clientData.nextOfKinName}
          onChange={handleChange}
          placeholder="Next of Kin Name"
          required
        />
        <input
          type="text"
          name="nextOfKinRelation"
          value={clientData.nextOfKinRelation}
          onChange={handleChange}
          placeholder="Next of Kin Relation"
          required
        />
        <input
          type="text"
          name="nextOfKinPhone"
          maxLength="10"
          value={clientData.nextOfKinPhone}
          onChange={handleChange}
          placeholder="Next of Kin Phone"
          required
        />

        <div>
          <h4>Select Programs:</h4>
          {programs.length > 0 ? (
            programs.map((program) => (
              <div className="program-checkbox" key={program.name}>
                <input
                  type="checkbox"
                  value={program.name}
                  checked={clientData.programs.includes(program.name)}
                  onChange={handleProgramChange}
                />
                {program.name}
              </div>
            ))
          ) : (
            <p>Loading programs...</p>
          )}
        </div>

        <button type="submit">Register Client</button>
      </form>
    </div>
    </div>
  );
}

export default RegisterClient;
