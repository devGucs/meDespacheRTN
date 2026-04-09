import { useEffect, useState } from "react";

export default function Pendente() {
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
    <div className="min-h-screen flex items-center justify-center bg-yellow-100">
      <div className="bg-white p-6 rounded-2xl shadow text-center">
        
        <h1 className="text-xl font-bold text-yellow-600">
          Pagamento pendente ⏳
        </h1>

        <p className="text-gray-600 mt-2">
          Seu pagamento ainda está sendo processado.
        </p>

        <p className="text-sm text-gray-500 mt-2">
          Assim que for confirmado, seu pedido será liberado.
        </p>

        {paymentId && (
          <p className="text-sm text-gray-400 mt-4">
            ID do pagamento: {paymentId}
          </p>
        )}

        <button
          onClick={() => window.location.href = "/"}
          className="mt-4 bg-yellow-600 text-white px-4 py-2 rounded"
        >
          Voltar para o início
        </button>
      </div>
    </div>
  );
}