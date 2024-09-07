import axios from "axios";
import { useEffect, useState } from "react";
import UseGetUserID from "../hooks/UseGetUserId";
import { useCookies } from "react-cookie";

function SavedRecipe() {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [cookies, _] = useCookies(["access_token"]);
  const userID = UseGetUserID();
  useEffect(() => {
    const fetchSavedRecipe = async () => {
      try {
        const response = await axios.get(`//localhost:3000/api/savedRecipes`, {
          headers: { Authorization: "Bearer " + cookies.access_token },
        });
        setSavedRecipes(response.data.savedRecipes);
        //check this over again
        // here get the url and api to send the data to the backend which is the worst part again
      } catch (error) {
        console.error(error);
      }
    };

    fetchSavedRecipe();
  }, []);

  const unsaveRecipe = async (recipeID) => {
    try {
      const response = await axios.delete(
        `//localhost:3000/api/unsaveRecipes/id/${recipeID}`,

        {
          headers: { Authorization: "Bearer " + cookies.access_token },
        }
      );
      setSavedRecipes((prevRecipes) =>
        prevRecipes.filter((recipe) => recipe._id !== recipeID)
      );
    } catch (error) {
      console.error(error);
      console.log("unsaving didnt happen");
    }
  };

  return (
    <div>
      <h2>Saved Recipes</h2>
      <ul>
        {savedRecipes &&
          savedRecipes.length > 0 &&
          savedRecipes.map((recipe) => (
            <li key={recipe._id}>
              <div>
                <h2>{recipe.name}</h2>
              </div>
              <div className="instructions">
                <p>{recipe.instructions}</p>
              </div>
              <img src={recipe.imageUrl} alt={recipe.name} />
              <p>Cooking Time : {recipe.cookingTime} minutes</p>
              <input
                type="button"
                value="Unsave"
                onClick={(e) => {
                  e.preventDefault();
                  unsaveRecipe(recipe._id);
                }}
              />
            </li>
          ))}
      </ul>
    </div>
  );
}

export default SavedRecipe;
