const db = require("../config/supabase");

// buscar empresa pelo usuário
const findByUsuarioId = async (usuarioId) => {
  const sql = "SELECT * FROM empresas WHERE usuario_id = $1";
  const result = await db.query(sql, [usuarioId]);
  return result.rows;
};

// criar empresa
const create = async (nome, usuarioId) => {
  const sql = `
    INSERT INTO empresas (nome, usuario_id)
    VALUES ($1, $2)
    RETURNING *
  `;
  const result = await db.query(sql, [nome, usuarioId]);
  return result.rows[0];
};

module.exports = {
  findByUsuarioId,
  create,
};