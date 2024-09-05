import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

function Navbar(props) {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const logout = () => {
    setCookies("access_token", "");
    window.localStorage.removeItem("userID");
    navigate("/auth");
  };
  return (
    <div className="navbar">
      <Link to="/">Home</Link>
      <Link to="/createRecipie">Create Recipe</Link>
      {!cookies.access_token ? (
        <Link to="/auth">Login/Register</Link>
      ) : (
        <>
          <Link to="/savedRecipe">Saved Recipes</Link>
          <button onClick={logout}>LogOut</button>
        </>
      )}
    </div>
  );
}

export default Navbar;
