import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/login", credentials)
      .then((res) => {
        if (res.data.success) {
          localStorage.setItem("token", res.data.token); //Save the token
          toast.success("Login successful!");
          navigate("/home"); //Navigate to home page
        } else {
          toast.error("Invalid credentials, please try again.");
        }
      })
      .catch((err) => {
        console.error("Login failed:", err);
        toast.error("Error logging in.");
      });
  };

  return (
    <div className="login-container">
      <h2>Doctor Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          value={credentials.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <input
          type="password"
          name="password"
          value={credentials.password}
          onChange={handleChange}
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
