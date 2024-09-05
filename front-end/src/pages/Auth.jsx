import React from "react";
import Login from "../Components/Login";
import Register from "../Components/Register";
function Auth(props) {
  return (
    <div className="auth">
      <Login />
      <Register />
    </div>
  );
}

export default Auth;
