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

  // uscar usuário pelo email dele rs
  const { data: usuario, error } = await supabase
    .from('usuarios')
    .select('*')
    .eq('email', email)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  if (!usuario) {
    throw new Error("Usuário não encontrado");
  }

  // comparar senha do cara
  const senhaValida = await bcrypt.compare(senha, usuario.senha);

  if (!senhaValida) {
    throw new Error("Senha incorreta");
  }

  //verificar se tem empresa (se for comerciante)
  let temEmpresa = false;

  if (usuario.tipo === "comerciante") {
    const { data: empresa } = await supabase
      .from('empresas')
      .select('*')
      .eq('usuario_id', usuario.id)
      .maybeSingle();

    temEmpresa = !!empresa;
  }

  return {
    id: usuario.id,
    nome: usuario.nome,
    email: usuario.email,
    tipo: usuario.tipo,
    temEmpresa
  };
};

module.exports = {
  register,
  login
};