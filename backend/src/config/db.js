const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "2408",
  database: "meDespacheRTN_db",
});

db.connect((err) => {
  if (err) {
    console.log("Erro ao conectar no banco");
  } else {
    console.log("Banco conectado");
  }
});

module.exports = db;