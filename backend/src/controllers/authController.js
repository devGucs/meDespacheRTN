const authService = require("../services/authService");

// 📌 CADASTRO
const register = async (req, res) => {
  try {
    const { nome, email, senha, tipo, nomeLoja, cnpj } = req.body;

    const result = await authService.register(nome, email, senha, tipo, nomeLoja, cnpj);

    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// LOGIN,
const login = async (req, res) => {

  try {
    const {email, senha} = req.body;

    const result = await authService.login(email, senha);

    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }

};

const GetMelhoresEmpresas = async(req, res) =>{
  try {
    
    const result = await authService.GetMelhoresEmpresas();

    res.status(201).json(result);
    
  } catch (error) {
    
    res.status(400).json({ error: err.message });

  }
}
module.exports = {
  register,
  login,
  GetMelhoresEmpresas,
};