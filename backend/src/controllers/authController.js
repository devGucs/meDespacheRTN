const authService = require("../services/authService");


// =======================
// 📌 CADASTRO
// =======================
const register = async (req, res) => {
  try {
    const { nome, email, senha } = req.body;

    const result = await authService.register(nome, email, senha);

    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


// =======================
// 📌 LOGIN
// =======================
const login = async (req, res) => {
  try {
    const { email, senha } = req.body;

    const usuario = await authService.login(email, senha);

    res.status(200).json(usuario);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


module.exports = {
  register,
  login,
};