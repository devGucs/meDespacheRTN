const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");

// Cadastro
router.post("/cadastro", authController.register);

// Login
router.post("/login", authController.login);

// Melhores avaliações
router.get("/melhores_avaliacoes", authController.GetMelhoresEmpresas);

// 💬 CHAT 
router.post("/conversa", authController.getOrCreateConversa);
router.get("/mensagens/:id", authController.getMensagens);
router.post("/mensagem", authController.enviarMensagem);

module.exports = router;