import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify"; 

function AddProgram() {
  const [programName, setProgramName] = useState("");
  const [programDescription, setProgramDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newProgram = {
      name: programName,
      description: programDescription,
    };

    axios
      .post("http://localhost:5000/programs", newProgram)
      .then((response) => {
        console.log("New Health Program Created:", response.data);
        toast.success("Program added successfully! "); 
        setProgramName("");
        setProgramDescription("");
      })
      .catch((error) => {
        console.error("Error adding new program:", error);
        toast.error("Failed to add program. Please try again."); 
      });
  };

  return (
    <div className="add-program-container">
      <h2>Add Health Program</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Program Name:
          <input
            type="text"
            value={programName}
            onChange={(e) => setProgramName(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Program Description:
          <input
            type="text"
            value={programDescription}
            onChange={(e) => setProgramDescription(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">Create Program</button>
      </form>
    </div>
  );
}

export default AddProgram;
