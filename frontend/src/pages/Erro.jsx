import { useEffect, useState } from "react";

export default function Erro() {
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
    <div className="min-h-screen flex items-center justify-center bg-red-100">
      <div className="bg-white p-6 rounded-2xl shadow text-center">
        
        <h1 className="text-xl font-bold text-red-600">
          Pagamento recusado ❌
        </h1>

        <p className="text-gray-600 mt-2">
          Não foi possível processar seu pagamento.
        </p>

        <p className="text-sm text-gray-500 mt-2">
          Tente novamente ou utilize outro método de pagamento.
        </p>

        {paymentId && (
          <p className="text-sm text-gray-400 mt-4">
            ID do pagamento: {paymentId}
          </p>
        )}

        <button
          onClick={() => window.location.href = "/"}
          className="mt-4 bg-red-600 text-white px-4 py-2 rounded"
        >
          Voltar e tentar novamente
        </button>
      </div>
    </div>
  );
}