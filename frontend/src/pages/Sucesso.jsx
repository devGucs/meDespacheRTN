import { useEffect, useState } from "react";

export default function Sucesso() {
  const [status, setStatus] = useState(null);
  const [paymentId, setPaymentId] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const statusParam = params.get("status") || params.get("collection_status");
    const paymentIdParam = params.get("payment_id");

    setStatus(statusParam);
    setPaymentId(paymentIdParam);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-100">
      <div className="bg-white p-6 rounded-2xl shadow text-center">
        
        <h1 className="text-xl font-bold text-green-600">
          {status === "approved"
            ? "Pagamento aprovado ✅"
            : "Pagamento recebido 🎉"}
        </h1>

        <p className="text-gray-600 mt-2">
          Seu pedido foi confirmado com sucesso.
        </p>

        {paymentId && (
          <p className="text-sm text-gray-400 mt-4">
            ID do pagamento: {paymentId}
          </p>
        )}
      </div>
    </div>
  );
}