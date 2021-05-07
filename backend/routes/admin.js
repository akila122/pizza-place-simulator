const express = require("express");
const { Time, Ingredient } = require("../models");
const authenticateJWT = require("./auth").authenticateJWT;
const router = express.Router();

router.get("/times", authenticateJWT, async function (req, res) {
  time = await Time.findOne({}).exec();
  res.json(time);
});

router.get("/ingredients/top", authenticateJWT, async function (req, res) {
  ingredients = await Ingredient.find({})
    .sort({ demand: "desc" })
    .limit(5)
    .exec();
  res.json(ingredients);
});

router.get("/money", authenticateJWT, async function (req, res) {
  money = await OrderDone.aggregate([
    { $match: {} },
    { $group: { _id: null, money: { $sum: "$order.$price" } } },
  ]).exec();
  res.json(money);
});

router.get("/history", authenticateJWT, async function (req, res) {
  ordersDone = await OrderDone.find({}).exec();
  res.json(ordersDone);
});

module.exports = router;
