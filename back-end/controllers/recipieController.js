const RecipieModel = require("../models/Recipes");
const UserModel = require("../models/User");
const mongoose = require("mongoose");

//all the saved recipes
const getAllRecipies = async (req, res) => {
  try {
    //grap the saved recipes where their id is inside the list
    const savedRecipes = await RecipieModel.find();
    res.json({ savedRecipes });
  } catch (error) {
    res.status(500).json({ message: "error fetching ecipes", error });
  }
};

// creating new recipe
const createNewRecipie = async (req, res) => {
  const { name, ingredients, instructions, imageUrl, cookingTime } = req.body;

  console.log(req.user);
  const recipie = await RecipieModel.create({
    name,
    ingredients,
    instructions,
    imageUrl,
    cookingTime,
    userOwner: new mongoose.Types.ObjectId(req.user.id),
  });
  res.json(recipie);
};
//saving the recipes
const saveRecipie = async (req, res) => {
  const { recipeID } = req.params;
  console.log(recipeID);
  try {
    const recipie = await RecipieModel.findById(recipeID);
    if (!recipie) {
      return res.status(404).json({ message: "recipe not found" });
    }
    const user = await UserModel.findById(req.user.id);
    // re-check this part
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (!user.savedRecipes.includes(req.params.recipeID)) {
      user.savedRecipes.push(recipie);
      await user.save();
    }
    res.status(200).json({
      message: "Recipe saved successfully",
      savedRecipes: user.savedRecipes,
    });
  } catch (error) {
    res.status(500).json({ message: "error saving recipe", error });
  }
};
const getSavedRecipes = async (req, res) => {
  try {
    //grap the saved recipes where their id is inside the list
    const savedRecipeId = await UserModel.findById(req.user.id);
    let savedRecipes = [];
    for (var recipeID of savedRecipeId.savedRecipes) {
      const recipe = await RecipieModel.findById(recipeID);
      savedRecipes.push(recipe);
    }
    console.log(savedRecipes);
    res.json({ savedRecipes });
  } catch (error) {
    res.status(500).json({ message: "error fetching ecipes", error });
  }
};
const unsaveRecipe = async (req, res) => {
  try {
    const { recipeID } = req.params;
    const user = await UserModel.findById(req.user.id);
    user.savedRecipes = user.savedRecipes.filter(
      (id) => id.toString() !== recipeID
    );
    await user.save();
    res.status(200).json({
      message: "Recipe unsaved Successfully",
      savedRecipe: user.savedRecipes,
    });
  } catch (error) {
    res.status(500).json({ message: "error unsaving recipe", error });
    console.log("unsaving didnt happen?");
  }
};

module.exports = {
  getAllRecipies,
  createNewRecipie,
  saveRecipie,
  getSavedRecipes,
  unsaveRecipe,
};
