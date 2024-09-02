import axios from "axios";
import React, { useEffect, useState } from "react";
import { UseGetUserID } from "../hooks/UseGetUserId";

function SavedRecipe(props) {
  const [savedRecipes, setSavedRecipes] = useState([]);
  

  const userID = UseGetUserID();
  useEffect(() => {
    
    const fetchSavedRecipe = async () => {
      try {
        const response = await axios.get(
          `http://localhost:http://localhost:3000//api/saveRecipes/${userID}`
        );
        setSavedRecipes(response.data.savedRecipes);
        //check this over again
        // here get the url and api to send the data to the backend which is the worst part again
      } catch (error) {
        console.error(error);
      }
    };
   
    fetchSavedRecipe();
  }, []);

 

 

  return (
    <div>
      <h2>Saved Recipes</h2>
      <ul>
        {savedRecipes.map((recipe) => (
          <li key={recipe._id}>
            <div>
              <h2>{recipe.name}</h2>
              
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

export default SavedRecipe;
