const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

pool.on("connect", () => {
  console.log("Banco PostgreSQL conectado");
});

pool.on("error", (err) => {
  console.error("Erro inesperado no PostgreSQL:", err.message);
});

module.exports = pool;