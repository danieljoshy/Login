const express = require("express");
const { registerUser, userLogin } = require("../controller/authController");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", userLogin);

// Export the router using CommonJS syntax
module.exports = router;