import axios from "axios";
import React, { useEffect, useState } from "react";
import UseGetUserID from "../hooks/UseGetUserId";
import { useCookies } from "react-cookie";
import Modal from "../Components/Modal";

function Home() {
  const [recipes, setRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [cookies, _] = useCookies(["access_token"]);
  const [selectedRecipe, setSelectedRecipe] = useState(null); // for modal
  const userID = UseGetUserID();

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get("//localhost:3000/api/recipes", {
          headers: { Authorization: "Bearer " + cookies.access_token },
        });
        setRecipes([...response.data.savedRecipes]);

        setSavedRecipes(savedResponse.data.savedRecipes);
      } catch (error) {
        console.error(error);
      }
    };
    fetchRecipe();
  }, []);

  const saveRecipe = async (recipeID) => {
    console.log(recipeID);
    try {
      const response = await axios.put(
        "//localhost:3000/api/savedRecipes/id/" + recipeID,
        null,
        {
          headers: { Authorization: "Bearer " + cookies.access_token },
        }
      );
      console.log(response.data.message);
      setSavedRecipes(response.data.savedRecipes);
    } catch (error) {
      console.error(error);
    }
  };

  const isRecipeSaved = (id) =>
    savedRecipes.some((recipe) => recipe._id === id);
  // const handleCreateRecipe = () =>{
  //   if(!cookies.access_token){
  //     alert("you need to log in to create a recipe!");
  //     return;
  //   }
  //   window.location.href = '/createRecipie'
  // }
  const handleDetailClick = (recipe) => {
    console.log("detail button clicked, recipe:", recipe);
    setSelectedRecipe(recipe);
  };

  return (
    <div>
      <h2>Recipes</h2>
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe._id}>
            <div>
              <h2>{recipe.name}</h2>

              <img src={recipe.imageUrl} alt={recipe.name} />
              <div>
                <input
                  type="button"
                  onClick={() => saveRecipe(recipe._id)}
                  disabled={isRecipeSaved(recipe._id)}
                  value={isRecipeSaved(recipe._id ? "Saved" : "Save")}
                />
                <input
                  type="button"
                  value="Details"
                  onClick={() => handleDetailClick(recipe)}
                />
              </div>
            </div>
          </li>
        ))}
      </ul>
      {selectedRecipe && (
        <Modal
          recipe={selectedRecipe}
          onClose={() => setSelectedRecipe(null)}
        />
      )}
    </div>
  );
}

export default Home;
