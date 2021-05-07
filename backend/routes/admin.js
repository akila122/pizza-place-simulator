const express = require("express");
const { Time } = require("../models");
const authenticateJWT = require("./auth").authenticateJWT;
const router = express.Router();

router.get("/times", authenticateJWT, async function (req, res) {
  time = await Time.findOne({}).exec();
  res.json(time);
});

module.exports = router;
