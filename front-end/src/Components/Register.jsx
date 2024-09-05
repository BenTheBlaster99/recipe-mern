import axios from "axios";
import { useState } from "react";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("//localhost:3000/auth/register", {
        username,
        password,
      });
      alert("Registration Completed! now login.");
    } catch (error) {
      console.error("registration failed:", error);
    }
  };
  return (
    <div className="auth-container">
      <form onSubmit={onSubmit}>
        <h2>Register</h2>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <input type="submit" value="Register" />
      </form>
    </div>
  );
}

export default Register;
