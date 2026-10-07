const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const { SECRET } = require("../midware/auth");

// Endpoint: POST /api/auth/login
router.post("/login", async (req, res) => {
  const { username, passwd } = req.body;

  if (!username || !passwd) { //handles missing parameters in body
    return res
      .status(400)
      .json({ success: false, error: "Username and password required" });
  }

  try {
    const user = await User.findByUsername(username);
    if (!user || user.passwd !== passwd) { //check if given info is in database
      return res
        .status(401)
        .json({ success: false, error: "Invalid credentials" });
    }

    const payload = {
      userID: user.userID,
      username: user.username,
      urole: user.urole,
    };
    const token = jwt.sign(payload, SECRET, { expiresIn: "1h" }); //displays token

    res.status(200).json({ success: true, token });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;