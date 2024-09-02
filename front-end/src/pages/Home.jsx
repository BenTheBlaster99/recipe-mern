import axios from "axios";
import React, { useEffect, useState } from "react";
import { UseGetUserID } from "../hooks/UseGetUserId";
import { useCookies } from "react-cookie";

function Home(props) {
  const [recipes, setRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [cookies, _] = useCookies(["access_token"]);

  const userID = UseGetUserID();
  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(
          "http://localhost:http://localhost:3000/api/recipes"
        );
        setRecipes(response.data);

        // here get the url and api to send the data to the backend which is the worst part again
      } catch (error) {
        console.error(error);
      }
    };
    const fetchSavedRecipe = async () => {
      try {
        const response = await axios.get(
          `http://localhost:http://localhost:3000//api/saveRecipes/ids/${userID}`
        );
        setRecipes(response.data.savedRecipes);
        //check this over again
        // here get the url and api to send the data to the backend which is the worst part again
      } catch (error) {
        console.error(error);
      }
    };
    fetchRecipe();
    if (cookies.access_token) fetchSavedRecipe();
  }, []);

  const saveRecipe = async (recipeID) => {
    try {
      //revisit this aswell!!
      const response = await axios.put(
        "http://localhost:http://localhost:3000/api/recipes",
        { recipeID, userID },
        { headers: { authorization: cookies.access_token } }
      );
      setSavedRecipes(response.data.savedRecipes);

      setRecipes(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const isRecipeSaved = (id) => savedRecipes.includes(id);

  return (
    <div>
      <h2>Recipes</h2>
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe._id}>
            <div>
              <h2>{recipe.name}</h2>
              <input
                type="button"
                value={isRecipeSaved(recipe._id ? "Saved" : "Save")}
                onClick={() => saveRecipe(recipe._id)}
                disabled={isRecipeSaved(recipe._id)}
              />
            </div>
            <div className="instructions">
              <p>{recipe.instructions}</p>
            </div>
            <img src={recipe.imageUrl} alt={recipe.name} />
            <p>Cooking Time : {recipe.cookingTime} minutes</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
