const mongoose = require("mongoose");

const wishlistSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  cards: [],
});

const WishList = mongoose.model("wishlists", wishlistSchema);
module.exports = WishList;
