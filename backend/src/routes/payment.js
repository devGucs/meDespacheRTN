const express = require("express");
const router = express.Router();
const mercadopago = require("../config/mercadoPago");
const paymentRoutes = require("./paymentRoutes");

app.use("/payment", paymentRoutes);

router.post("/create-pix", async (req, res) => {
  try {
    const { valor, descricao, email } = req.body;

    const payment_data = {
      transaction_amount: Number(valor),
      description: descricao,
      payment_method_id: "pix",
      payer: {
        email: email
      }
    };

    const response = await mercadopago.payment.create(payment_data);

    const data = response.body.point_of_interaction.transaction_data;

    res.json({
      id: response.body.id,
      qr_code: data.qr_code,
      qr_code_base64: data.qr_code_base64
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao gerar Pix" });
  }
});

module.exports = router;