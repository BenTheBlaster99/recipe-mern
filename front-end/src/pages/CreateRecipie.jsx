import axios from "axios";
import React, { useState } from "react";
import UseGetUserID from "../hooks/UseGetUserId";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

function CreateRecipie() {
  const userID = UseGetUserID();
  const [cookies, _] = useCookies(["access_token"]);
  const [recipe, setRecipe] = useState({
    name: "",
    ingredients: [],
    instructions: "",
    imageUrl: "",
    cookingTime: 0,
    userOwner: userID,
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setRecipe({ ...recipe, [name]: value });
  };
  const addIngredient = () => {
    setRecipe({ ...recipe, ingredients: [...recipe.ingredients, ""] });
  };
  const handleIngredientChange = (event, index) => {
    const { value } = event.target;
    const ingredients = recipe.ingredients;
    ingredients[index] = value;
    setRecipe({ ...recipe, ingredients });
  };
  const onSubmit = async (event) => {
    console.log("Hi there");
    event.preventDefault();
    console.log(cookies);
    try {
      await axios.post("//localhost:3000/api/recipes", recipe, {
        headers: { authorization: "Bearer " + cookies.access_token },
      });
      alert("recipe created :D");
      // here get the url and api to send the data to the backend which is the worst part
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="create-recipe">
      <h2>Create recipe</h2>
      <form onSubmit={(e) => onSubmit(e)}>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" onChange={handleChange} />

        <label htmlFor="">Ingredients</label>
        {recipe.ingredients.map((ingredients, index) => (
          <input
            key={index}
            type="text"
            name="ingredients"
            value={ingredients}
            onChange={(event) => handleIngredientChange(event, index)}
          />
        ))}
        <input type="text" id="ingredients" onChange={handleChange} />
        <input type="button" value="Add Ingredient" onClick={addIngredient} />
        <label htmlFor="instructions">Instruction</label>
        <textarea
          name="instructions"
          id="instructions"
          onChange={handleChange}
        ></textarea>
        <label htmlFor="imageUrl">Image URL</label>
        <input
          type="text"
          id="imageUrl"
          name="imageUrl"
          onChange={handleChange}
        />
        <label htmlFor="cookingTime">Cooking Time *minutes*</label>
        <input
          type="number"
          id="cookingTime"
          name="cookingTime"
          onChange={handleChange}
        />
        <input type="submit" value="Create Recipe" />
      </form>
    </div>
  );
}

export default CreateRecipie;
