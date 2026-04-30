// routes/chatRoutes.js
const express = require("express");
const router = express.Router();

const chatController = require("../controllers/chatController");

router.post("/conversa", chatController.getOrCreateConversa);
router.get("/mensagens/:id", chatController.getMensagens);
router.post("/mensagem", chatController.enviarMensagem);

module.exports = router;