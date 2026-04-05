const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const db = require("./config/db");

const app = express();

app.use(cors());
app.use(express.json());

// rota de teste
app.get("/", async (req, res) => {
  try {
    const result = await db.query("SELECT NOW()");
    res.status(200).json({
      message: "API funcionando",
      serverTime: result.rows[0].now,
    });
  } catch (error) {
    res.status(500).json({
      message: "Erro ao testar conexão com banco",
      error: error.message,
    });
  }
});

// rotas
app.use("/auth", authRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});