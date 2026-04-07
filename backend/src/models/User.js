const db = require("../config/supabase");

// buscar por email
const findByEmail = async (email) => {
  const sql = "SELECT * FROM usuarios WHERE email = $1";
  const result = await db.query(sql, [email]);
  return result.rows;
};

// criar usuário
const create = async (nome, email, senha) => {
  const sql = `
    INSERT INTO usuarios (nome, email, senha)
    VALUES ($1, $2, $3)
    RETURNING id, nome, email
  `;
  const result = await db.query(sql, [nome, email, senha]);
  return result.rows[0];
};

module.exports = {
  findByEmail,
  create,
};
