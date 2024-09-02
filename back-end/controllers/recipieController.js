const RecipieModel = require("../models/Recipes");
const UserModel = require("../models/User");

//all the saved recipes
const getAllRecipies = async (req, res) => {
  try {
    const user = await UserModel.findById(req.body.userID);
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    //grap the saved recipes where their id is inside the list
    const savedRecipes = await RecipieModel.find({
      _id: { $in: user.savedRecipes },
    });
    res.json({ savedRecipes });
  } catch (error) {
    res.status(500).json({ message: "error fetching ecipes", error });
  }
};

// creating new recipe
const createNewRecipie = async (req, res) => {
  const { name, ingredients, instructions, imageUrl, cookingTime, userOwner } =
    req.body;
  const recipie = await RecipieModel.create({
    name,
    ingredients,
    instructions,
    imageUrl,
    cookingTime,
    userOwner,
  });
  res.json(recipie);
};
//saving the recipes
const saveRecipie = async (req, res) => {
  try {
    const recipie = await RecipieModel.findById(req.body.recipieID);
    if (!recipie) {
      return res.status(404).json({ message: "recipe not found" });
    }
    const user = await UserModel.findById(req.params.userID);
    // re-check this part
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (!user.savedRecipes.includes(req.params.recipieID)) {
      user.savedRecipes.push(recipie);
      await user.save();
    }
    res
      .status(200)
      .json({
        message: "Recipe saved successfully",
        savedRecipes: user.savedRecipes,
      });
  } catch (error) {
    res.status(500).json({ message: "error saving recipe", error });
  }
};
module.exports = {
  getAllRecipies,
  createNewRecipie,
  saveRecipie,

};
