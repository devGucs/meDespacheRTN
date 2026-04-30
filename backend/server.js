require("dotenv").config();

const express = require("express");
const cors = require("cors");
const paymentRoutes = require("./src/routes/payment");
const authRoutes = require("./src/routes/authRoutes");
const chatRoutes = require("./src/routes/chatRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/payment", paymentRoutes);

// rota base
app.use("/auth", authRoutes);
app.use("/chat", chatRoutes);

app.listen(5005, () => {
  console.log("Servidor rodando na porta 5005");
});