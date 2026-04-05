const authService = require("../services/authService");

// =======================
// CADASTRO
// =======================
const register = async (req, res) => {
  try {
    const { nome, email, senha } = req.body;

    const result = await authService.register(nome, email, senha);

    return res.status(201).json(result);
  } catch (err) {
    if (err.message === "Preencha todos os campos") {
      return res.status(400).json({ error: err.message });
    }

    if (err.message === "Email já cadastrado") {
      return res.status(409).json({ error: err.message });
    }

    return res.status(500).json({ error: "Erro interno no servidor" });
  }
};

// =======================
// LOGIN
// =======================
const login = async (req, res) => {
  try {
    const { email, senha } = req.body;

    const usuario = await authService.login(email, senha);

    return res.status(200).json(usuario);
  } catch (err) {
    if (err.message === "Preencha todos os campos") {
      return res.status(400).json({ error: err.message });
    }

    if (err.message === "Usuário não encontrado") {
      return res.status(404).json({ error: err.message });
    }

    if (err.message === "Senha incorreta") {
      return res.status(401).json({ error: err.message });
    }

    return res.status(500).json({ error: "Erro interno no servidor" });
  }
};

module.exports = {
  register,
  login,
};
``