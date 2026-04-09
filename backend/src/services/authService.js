const bcrypt = require("bcrypt");
const User = require("../models/User");
const Empresa = require("../models/Empresa");
const supabase = require('../config/db')

// =======================
// CADASTRO
// =======================
const register = async (nome, email, senha, tipo, nomeLoja, cnpj) => {

  if (!nome || !email || !senha) {
    throw new Error("Preencha todos os campos");
  }

  // verificar se já existe
  const { data: usuarioExistente } = await supabase
    .from('usuarios')
    .select('*')
    .eq('email', email)
    .maybeSingle();

  if (usuarioExistente) {
    throw new Error('Esse usuário já existe');
  }

  // criptografar senha
  const senhaHash = await bcrypt.hash(senha, 10);

  // inserir no banco
  const { data: usuario, error } = await supabase
  .from('usuarios')
  .insert([{ nome, email, senha: senhaHash, tipo }])
  .select()
  .single();

  if (error) {
    throw new Error(error.message);
  }

  if (tipo === "comerciante") {

    const { error: errorEmpresa } = await supabase
      .from('empresas')
      .insert([{
        nome_loja: nomeLoja,
        cnpj,
        usuario_id: usuario.id
      }]);

    if (errorEmpresa) {
      throw new Error(errorEmpresa.message);
    }
  }

  return { message: "Usuário cadastrado com sucesso" };

};


// =======================
// LOGIN
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

  // ERIFICAR SE TEM EMPRESA
  const empresa = await new Promise((resolve, reject) => {
    Empresa.findByUsuarioId(usuario.id, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });

  // RETORNO FINAL
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