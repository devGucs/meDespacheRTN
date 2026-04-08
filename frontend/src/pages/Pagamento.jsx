import { useState } from "react";
import api from "../services/api";

export default function PaymentPage() {
  const [qrCode, setQrCode] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handlePix() {
    try {
      setLoading(true);
      const response = await api.post("/payment/create-pix", {
        valor: 50,
        descricao: "Pagamento TCC",
        email: "test_user@test.com",
      });

      setQrCode(response.data.qr_code_base64);
    } catch (err) {
      console.error(err);
      alert("Erro ao gerar pagamento");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-600 to-indigo-700 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Finalizar Pagamento
        </h1>
        <p className="text-gray-500 mb-6">
          Escolha uma forma de pagamento segura
        </p>

        <button
          onClick={handlePix}
          disabled={loading}
          className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-xl transition mb-4"
        >
          {loading ? "Gerando Pix..." : "Pagar com Pix"}
        </button>

        <button
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-xl transition"
        >
          Pagar com Cartão
        </button>

        {qrCode && (
          <div className="mt-6">
            <p className="text-gray-700 mb-2">Escaneie o QR Code:</p>
          </div>
        )}
      </div>
    </div>
  );
}