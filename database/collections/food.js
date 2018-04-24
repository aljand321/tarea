const mongoose = require("../connect");
var foodSchema = {
  name : String,
  descripcion : String,
  ingredients : String
};
var food = mongoose.model("food", foodSchema);
module.exports = food;
