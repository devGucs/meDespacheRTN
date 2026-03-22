const bcrypt = require("bcrypt");
const User = require("../models/User");
const Empresa = require("../models/Empresa");

// =======================
// 📌 CADASTRO
// =======================
const register = async (nome, email, senha) => {

  if (!nome || !email || !senha) {
    throw new Error("Preencha todos os campos");
  }

  // verificar se já existe
  const usuarioExistente = await new Promise((resolve, reject) => {
    User.findByEmail(email, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });

  if (usuarioExistente.length > 0) {
    throw new Error("Email já cadastrado");
  }

  // criptografar senha
  const senhaHash = await bcrypt.hash(senha, 10);

  // salvar
  await new Promise((resolve, reject) => {
    User.create(nome, email, senhaHash, (err) => {
      if (err) return reject(err);
      resolve();
    });
  });

  return { message: "Usuário cadastrado com sucesso" };
};


// =======================
// 📌 LOGIN
// =======================
const login = async (email, senha) => {

  if (!email || !senha) {
    throw new Error("Preencha todos os campos");
  }

  // buscar usuário
  const result = await new Promise((resolve, reject) => {
    User.findByEmail(email, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });

  if (result.length === 0) {
    throw new Error("Usuário não encontrado");
  }

  const usuario = result[0];

  // verificar senha
  const senhaValida = await bcrypt.compare(senha, usuario.senha);

  if (!senhaValida) {
    throw new Error("Senha incorreta");
  }

  // 🔥 VERIFICAR SE TEM EMPRESA
  const empresa = await new Promise((resolve, reject) => {
    Empresa.findByUsuarioId(usuario.id, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });

  // 🚀 RETORNO FINAL
  return {
    id: usuario.id,
    nome: usuario.nome,
    email: usuario.email,
    temEmpresa: empresa.length > 0
  };
};

module.exports = {
  register,
  login
};