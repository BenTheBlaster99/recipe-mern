const mongoose = require("mongoose");
const {
  default: SavedRecipe,
} = require("../../front-end/src/pages/SavedRecipe");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  savedRecipes: [{ type: mongoose.Schema.Types.ObjectId, ref: "recipes" }],
});
const UserModel = mongoose.model("user-auth", userSchema);
module.exports = UserModel;
