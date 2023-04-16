const express = require("express");
const joi = require("joi");
const User = require("../models/user");
const Card = require("../models/card");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();
const WishList = require("../models/wishlist");

const registerSchema = joi.object({
  name: joi.string().required().min(2),
  email: joi.string().required().min(6).email(),
  password: joi.string().required().min(8),
  businessMan: joi.boolean().required(),
});

router.post("/", async (req, res) => {
  try {
    const { error } = registerSchema.validate(req.body);
    if (error) return res.status(400).send("Wrong body");

    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send("User already exists");

    user = new User(req.body);
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(req.body.password, salt);
    await user.save();

    let wishList = new WishList({
      userId: user._id,
      cards: [],
    });
    await wishList.save();

    const token = jwt.sign(
      { _id: user._id, name: req.body.name, businessMan: req.body.businessMan },
      process.env.JWTKEY
    );
    res.status(201).send(token);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
