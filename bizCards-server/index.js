const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const register = require("./routes/register");
const login = require("./routes/login");
const me = require("./routes/me");
const cards = require("./routes/cards");
const wishlists = require("./routes/wishlists");
const cors = require("cors");
const app = express();

const port = process.env.PORT || 3000;

const logger = (req, res, next) => {
  console.log(`${req.method}, ${req.url}`);
  next();
};

app.use(express.json());
app.use(cors());
app.use(logger);

app.use("/api/register", register);
app.use("/api/login", login);
app.use("/api/me", me);
app.use("/api/cards", cards);
app.use("/api/wishlists", wishlists);

mongoose
  .connect(process.env.DB, { useNewUrlParser: true })
  .then(() => console.log("Mongodb connected"))
  .catch((err) => console.log(err));
app.listen(port, () => console.log(`server started on port ${port}`));
