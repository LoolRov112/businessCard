const express = require("express");
const joi = require("joi");
const WishList = require("../models/wishlist");
const auth = require("../middleware/auth");
const router = express.Router();

const cardSchema = joi.object({
  userId: joi.string(),
  name: joi.string().required().min(2),
  description: joi.string().required().min(3),
  address: joi.string().required().min(3),
  phone: joi.string().required().min(10).max(10),
  image: joi.string().required(),
  _id: joi.string(),
  __v: joi.number(),
});

router.post("/", auth, async (req, res) => {
  try {
    const { error } = cardSchema.validate(req.body);
    if (error) return res.status(400).send(error.message);

    let wishList = await WishList.findOne({ userId: req.payload._id });
    if (!wishList) return res.status(404).send("No Wishlist for this user");

    const existingCard = wishList.cards.find(
      (card) => card._id === req.body._id
    );
    if (existingCard) {
      return res.status(400).send("Card already exists in the wishlist");
    }

    wishList.cards.push(req.body);
    await wishList.save();
    res.status(201).send(wishList);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/", auth, async (req, res) => {
  try {
    let wishList = await WishList.findOne({
      userId: req.payload._id,
    });
    if (!wishList) return res.status(404).send("No Wish List for this user");
    res.status(200).send(wishList.cards);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete("/:cardId", auth, async (req, res) => {
  try {
    const { cardId } = req.params;
    let wishList = await WishList.findOne({ userId: req.payload._id });
    if (!wishList) return res.status(404).send("No Wishlist for this user");

    const cardIndex = wishList.cards.findIndex((card) => card._id == cardId);
    if (cardIndex === -1)
      return res.status(404).send("Card not found in the Wish List");

    wishList.cards.splice(cardIndex, 1);
    await wishList.save();
    res.status(200).send(wishList.cards);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
