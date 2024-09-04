const mongoose = require("mongoose");

const RecipeSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  ingredients: [
    {
      type: String,
      require: true,
    },
  ],
  instructions: {
    type: String,
    require: true,
  },
  imageUrl: { type: String, require: true },
  cookingTime: { type: Number, require: true },
  userOwner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user-auth",
    required: true,
  },
});
const RecipieModel = mongoose.model("recipes", RecipeSchema);
module.exports = RecipieModel;
