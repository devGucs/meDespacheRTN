const db = require("../config/db");

// buscar por email
const findByEmail = (email, callback) => {
  const sql = "SELECT * FROM usuarios WHERE email = ?";
  db.query(sql, [email], callback);
};

// criar usuário
const create = (nome, email, senha, callback) => {
  const sql = "INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)";
  db.query(sql, [nome, email, senha], callback);
};

module.exports = {
  findByEmail,
  create
};