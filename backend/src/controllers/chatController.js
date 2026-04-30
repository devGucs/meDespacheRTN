const chatService = require("../services/chatService");

// 🔎 conversa
const getOrCreateConversa = async (req, res) => {
  try {
    const { cliente_id, vendedor_id } = req.body;

    const result = await chatService.getOrCreateConversa(
      cliente_id,
      vendedor_id
    );

    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// 📥 mensagens
const getMensagens = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await chatService.getMensagens(id);

    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// 💬 enviar
const enviarMensagem = async (req, res) => {
  try {
    const result = await chatService.enviarMensagem(req.body);

    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  getOrCreateConversa,
  getMensagens,
  enviarMensagem,
};