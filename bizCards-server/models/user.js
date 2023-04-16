const { string } = require("joi");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userId: { type: String },
  name: { type: String, minlength: 2 },
  email: { type: String, minlength: 6, unique: true, require: true },
  password: { type: String, minlength: 8, require: true },
  businessMan: { type: Boolean },
});

const User = mongoose.model("users", userSchema);
module.exports = User;
