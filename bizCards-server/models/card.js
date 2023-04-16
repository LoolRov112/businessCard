const mongoose = require("mongoose");

const cardsSchema = new mongoose.Schema({
  userId: { type: String },
  name: { type: String, required: true, minlength: 2 },
  description: { type: String, required: true, minlength: 2 },
  address: { type: String, required: true, minlength: 2 },
  phone: { type: String, required: true, minlength: 2 },
  image: { type: String, required: true, minlength: 2 },
});

const Card = mongoose.model("cards", cardsSchema);
module.exports = Card;
