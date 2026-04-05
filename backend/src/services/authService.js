const bcrypt = require("bcrypt");
const User = require("../models/user");
const Empresa = require("../models/empresa");

// =======================
// CADASTRO
// =======================
const register = async (nome, email, senha) => {
  if (!nome || !email || !senha) {
    throw new Error("Preencha todos os campos");
  }

  const usuarioExistente = await User.findByEmail(email);

  if (usuarioExistente.length > 0) {
    throw new Error("Email já cadastrado");
  }

  const senhaHash = await bcrypt.hash(senha, 10);

  await User.create(nome, email, senhaHash);

  return { message: "Usuário cadastrado com sucesso" };
};

// =======================
// LOGIN
// =======================
const login = async (email, senha) => {
  if (!email || !senha) {
    throw new Error("Preencha todos os campos");
  }

  const result = await User.findByEmail(email);

  if (result.length === 0) {
    throw new Error("Usuário não encontrado");
  }

  const usuario = result[0];

  const senhaValida = await bcrypt.compare(senha, usuario.senha);

  if (!senhaValida) {
    throw new Error("Senha incorreta");
  }

  const empresa = await Empresa.findByUsuarioId(usuario.id);

  return {
    id: usuario.id,
    nome: usuario.nome,
    email: usuario.email,
    temEmpresa: empresa.length > 0,
  };
};

module.exports = {
  register,
  login,
};
``