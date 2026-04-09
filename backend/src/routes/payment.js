const express = require("express");
const router = express.Router();

const { MercadoPagoConfig, Preference } = require("mercadopago");

const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN,
});

const preference = new Preference(client);

router.post("/create-checkout", async (req, res) => {
  try {
    const { valor, descricao } = req.body;

    // validação básica (evita erro silencioso)
    if (!valor || !descricao) {
      return res.status(400).json({
        error: "Dados inválidos",
      });
    }

    const result = await preference.create({
      body: {
        items: [
          {
            title: descricao,
            quantity: 1,
            unit_price: Number(valor),
            currency_id: "BRL",
          },
        ],

        // URLs de retorno (obrigatório)
        back_urls: {
          success: "http://localhost:5173/sucesso",
          failure: "http://localhost:5173/erro",
          pending: "http://localhost:5173/pendente",
        },

        external_reference: "pedido_123",
        
        auto_return: "approved", // opcional, pode ser usado para identificar o pedido no seu sistema
      },
    });

    return res.json({
      init_point: result.init_point,
    });

  } catch (error) {
  console.error("ERRO COMPLETO MP:", error);
  console.error("DETALHE:", error?.cause);

  return res.status(500).json({
    error: "Erro no checkout",
    detalhe: error.message,
    full: error,
  });
}
});

module.exports = router;