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
  login,
};