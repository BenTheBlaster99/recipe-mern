import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import SavedRecipe from "./pages/SavedRecipe";
import CreateRecipie from "./pages/CreateRecipie";
import Navbar from "./Components/Navbar";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="auth" element={<Auth />}></Route>
          <Route path="savedRecipe" element={<SavedRecipe />}></Route>
          <Route path="createRecipie" element={<CreateRecipie />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
