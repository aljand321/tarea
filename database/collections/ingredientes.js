const mongoose = require("../connect");
var ingredientesSchema = {
  name : String,
  kcal : Number,
  peso : Number
};
var ingredientes = mongoose.model("ingredientes", ingredientesSchema);
module.exports = ingredientes;
