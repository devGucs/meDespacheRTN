const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");

// Cadastro
router.post("/cadastro", authController.register);

// Login
router.post("/login", authController.login);

router.get("/melhores_avaliacoes", authController.GetMelhoresEmpresas)

module.exports = router;