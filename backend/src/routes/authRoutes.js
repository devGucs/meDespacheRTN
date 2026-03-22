const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");



// Cadastro
router.post("/cadastro", authController.register);

// Login
router.post("/login", authController.login);


module.exports = router;