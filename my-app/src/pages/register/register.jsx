
import React, { useState } from "react";
import "./register.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [username1, setUsername] = useState("");
  const [email1, setEmail] = useState("");
  const [password1, setPassword] = useState("");

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const registerHandler = async (e) => {
    e.preventDefault(); // Prevent form from submitting the default way

    try {
      const response = await axios.post(
        "http://localhost/Recipe-App/Backend/auth/register.php",
        {
          username: username1,
          email: email1,
          password: password1,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(username1, email1, password1);

      if (response.data) {
        // Handle successful registration
        console.log("Registration successful:", response);
        navigate("/home");
      } else {
        // Handle registration error
        console.error("Registration failed:", response);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={registerHandler}>
        <h2>Register</h2>
        <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            value={username1}
            onChange={handleUsernameChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email1}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password1}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Register;