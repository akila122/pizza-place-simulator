const express = require("express");
const { Admin } = require("../models");
const sha1 = require("sha1");
const { ACCESS_TOKEN_SECRET,REFRESH_TOKEN_SECRET } = require("../config");
const jwt = require("jsonwebtoken");
const router = express.Router();

router.post("/login", async function (req, res) {
  const { username, password } = req.body;

  const admin = await Admin.findOne({ username: username }).exec();
  if (!admin) {
    res.status(401);
    res.send("Invalid username");
  } else {
    const hashInput = password + admin._id;
    const passwordHash = sha1(hashInput);

    if (admin.passwordHash != passwordHash) {
      res.status(401);
      res.send("Password incorrect");
    } else {
      const accessToken = jwt.sign(
        { username: admin.username },
        ACCESS_TOKEN_SECRET,
        { expiresIn: "1m" }
      );
      const refreshToken = jwt.sign(
        { username: admin.username },
        REFRESH_TOKEN_SECRET
      );
      router.refreshTokens.push(refreshToken);

      res.json({
        accessToken,
        refreshToken,
      });
    }
  }
});

router.post("/signup", async function (req, res) {
  const { username, password } = req.body;
  let admin = await Admin.findOne({ username: username }).exec();
  if (admin) {
    res.status(400);
    res.send("Username already in use.");
  } else {
    admin = new Admin({ username: username });
    await admin.save();
    const hashInput = password + admin._id;
    const passwordHash = sha1(hashInput);
    admin.passwordHash = passwordHash;
    await admin.save();
    res.send("Admin created.");
  }
});

router.post("/token", (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.sendStatus(401);
  }

  if (!router.refreshTokens.includes(token)) {
    return res.sendStatus(403);
  }

  jwt.verify(token, REFRESH_TOKEN_SECRET, (err, admin) => {
    if (err) {
      return res.sendStatus(403);
    }

    const accessToken = jwt.sign(
      { username: admin.username },
      ACCESS_TOKEN_SECRET,
      { expiresIn: "1m" }
    );

    res.json({
      accessToken,
    });
  });
});

router.post("/logout", (req, res) => {
  const { token } = req.body;
  router.refreshTokens = router.refreshTokens.filter((token) => t !== token);

  res.send("Logout successful");
});

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, ACCESS_TOKEN_SECRET, (err, admin) => {
      if (err) {
        return res.sendStatus(403);
      }

      req.username = admin.username;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

module.exports.router = router;
module.exports.authenticateJWT = authenticateJWT;
