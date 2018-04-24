const mongoose = require("../connect");
var ingredientesSchema = {
  name : String,
  kcal : Number,
  peso : Number
};
var ingredientes = mongoose.model("ingredient", ingredientesSchema);
module.exports = ingredientes;
