const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken")
const {registerUser,loginUser,logout} = require("../controllers/authcontroller")

router.get("/", function (req, res) {
  res.send("hey its working");
});

router.post("/register", registerUser );
router.post("/login", loginUser );
router.get("/logout", logout );

module.exports = router;
