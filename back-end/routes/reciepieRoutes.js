const express = require("express");
const {authentication , authorization} = require("../middleware/auth")
const {
  getAllRecipies,
  createNewRecipie,
  saveRecipie,
} = require("../controllers/recipieController");
const router = express.router();
router.route("/api/recipes").get(authentication, authorization).get(getAllRecipies);
router.route("/api/").get(authentication, authorization).post(createNewRecipie);
router.route("/api/saveRecipes/id/:userID").get(authentication, authorization).put(saveRecipie);
// need another route for the SAVED recipes

//check the routes if its correct + how i could good routes and test them out
module.exports = router