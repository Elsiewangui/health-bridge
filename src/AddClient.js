import React, { useState, useEffect} from "react";
import { useNavigate } from 'react-router-dom';

import axios from "axios";
import { toast } from "react-toastify";

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

  const [programs, setPrograms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/programs")
      .then((res) => {
        setPrograms(res.data);
      })
      .catch((err) => {
        console.error("Error fetching programs:", err);
        toast.error("Failed to load programs.");
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClientData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleProgramChange = (e) => {
    const { value, checked } = e.target;
    setClientData((prev) => {
      const programs = checked
        ? [...prev.programs, value]
        : prev.programs.filter((program) => program !== value);

      return { ...prev, programs };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/clients", clientData)
      .then((res) => {
        console.log("Client registered:", res.data);
        toast.success("Client registered successfully!");
        navigate("/clients");
      })
      .catch((err) => {
        console.error("Error registering client:", err);
        toast.error("Error registering client.");
      });
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
