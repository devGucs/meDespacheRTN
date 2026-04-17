require("dotenv").config();

const express = require("express");
const cors = require("cors");
const paymentRoutes = require("./src/routes/payment");

const authRoutes = require("./src/routes/authRoutes");
const estabelecimentosRoutes = require("./src/routes/estabelecimento");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/payment", paymentRoutes);
app.use("/estabelecimentos", estabelecimentosRoutes);

// rota base
app.use("/auth", authRoutes);

app.listen(5005, () => {
  console.log("Servidor rodando na porta 5005");
});