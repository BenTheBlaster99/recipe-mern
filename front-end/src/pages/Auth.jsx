import React, { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
function Auth() {
  return (
    <div className="auth">
      <Login />
      <Register />
    </div>
  );
}
function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:http://localhost:3000/auth/register", {
        username,
        password,
      });
      alert("Registration completed! not Login.");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <Form
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        label="Register"
      />
    </>
  );
}
function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [_, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:http://localhost:3000/auth/login",
        {
          username,
          password,
        }
      );
      setCookies("access_token", response.data.token);
      window.localStorage.setItem("userID", response.data.userID);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <Form
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        label="Login"
        onSubmit={onSubmit}
      />
    </>
  );
}
function Form({
  username,
  setUsername,
  password,
  setPassword,
  label,
  onSubmit,
}) {
  return (
    <>
      <div className="auth-container">
        <form onSubmit={onSubmit}>
          <h2>{label}</h2>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <input type="submit" value={label} />
        </form>
      </div>
    </>
  );
}
export default Auth;
