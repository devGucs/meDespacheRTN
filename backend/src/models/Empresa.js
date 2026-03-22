const db = require("../config/db");

// buscar empresa pelo usuário
const findByUsuarioId = (usuarioId, callback) => {
  const sql = "SELECT * FROM empresas WHERE usuario_id = ?";
  db.query(sql, [usuarioId], callback);
};

// criar empresa
const create = (nome, usuarioId, callback) => {
  const sql = "INSERT INTO empresas (nome, usuario_id) VALUES (?, ?)";
  db.query(sql, [nome, usuarioId], callback);
};

module.exports = {
  findByUsuarioId,
  create
};