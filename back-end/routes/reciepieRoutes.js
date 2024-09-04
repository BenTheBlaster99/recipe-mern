const express = require("express");
const { authentication, authorization } = require("../middleware/auth");
const {
  getAllRecipies,
  createNewRecipie,
  saveRecipie,
  getSavedRecipes,
} = require("../controllers/recipieController");
const router = express.Router();
router
  .route("/api/recipes")
  .get(authentication, getAllRecipies)
  .post(authentication, createNewRecipie);
router
  .route("/api/savedRecipes/id/:recipeID")
  .put(authentication, authorization("user"), saveRecipie);

router
  .route("/api/savedRecipes")
  .get(authentication, authorization("user"), getSavedRecipes);
// need another route for the SAVED recipes

//check the routes if its correct + how i could good routes and test them out
module.exports = router;
