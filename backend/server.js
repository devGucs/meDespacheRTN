const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./src/routes/authRoutes");
const db = require("./src/config/supabase");

const app = express();

// ⚠️ CORS liberado (ajusta depois com domínio do Vercel)
app.use(cors({
  origin: "*"
}));

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
    console.error(error);
    res.status(500).json({
      message: "Erro ao testar conexão com banco",
      error: error.message,
    });
  }
});

// rotas
app.use("/auth", authRoutes);

// 🚀 PORTA DINÂMICA (OBRIGATÓRIO NO RENDER)
const PORT = process.env.PORT || 3001;

// 🔥 MELHORADO: escutar em 0.0.0.0
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});