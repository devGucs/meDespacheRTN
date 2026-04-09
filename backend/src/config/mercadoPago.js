const { MercadoPagoConfig } = require("mercadopago");

const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN,
});

console.log("TOKEN:", process.env.MP_ACCESS_TOKEN);

module.exports = client;