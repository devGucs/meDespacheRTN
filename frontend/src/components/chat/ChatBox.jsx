import { useEffect, useState } from "react";
import Mensagem from "./Mensagem";
import { Send, X } from "lucide-react";

export default function ChatBox({ vendedorId, user, fechar }) {
  const [mensagem, setMensagem] = useState("");
  const [chat, setChat] = useState([]);
  const [conversaId, setConversaId] = useState(null);

  // 🔎 criar/buscar conversa
  useEffect(() => {
    const iniciar = async () => {
      const res = await fetch("http://localhost:5005/chat/conversa", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cliente_id: user.id,
          vendedor_id: vendedorId,
        }),
      });

      const data = await res.json();
      setConversaId(data.id);
    };

    iniciar();
  }, []);

  // 📥 buscar mensagens
  useEffect(() => {
    if (!conversaId) return;

    const buscarMensagens = async () => {
      const res = await fetch(
        `http://localhost:5005/chat/mensagens/${conversaId}`
      );
      const data = await res.json();
      setChat(data);
    };

    buscarMensagens();

    // 🔄 simula "tempo real"
    const interval = setInterval(buscarMensagens, 2000);

    return () => clearInterval(interval);
  }, [conversaId]);

  // 💬 enviar mensagem
  const enviarMensagem = async () => {
    if (!mensagem.trim()) return;

    await fetch("http://localhost:5005/chat/mensagem", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        conversa_id: conversaId,
        remetente_id: user.id,
        destinatario_id: vendedorId,
        conteudo: mensagem,
      }),
    });

    setMensagem("");
  };

  return (
    <>
      {/* HEADER */}
      <div className="flex justify-between items-center p-4 border-b border-white/10 bg-gradient-to-r from-purple-700 to-pink-600 rounded-t-2xl">
        <h2 className="text-sm font-semibold">Chat com vendedor</h2>

        <button onClick={fechar}>
          <X size={18} />
        </button>
      </div>

      {/* MENSAGENS */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {chat.map((msg) => (
          <Mensagem key={msg.id} msg={msg} user={user} />
        ))}
      </div>

      {/* INPUT */}
      <div className="p-3 border-t border-white/10 bg-[#0f0a1f]">
        <div className="flex gap-2">
          <input
            value={mensagem}
            onChange={(e) => setMensagem(e.target.value)}
            placeholder="Digite sua mensagem..."
            className="flex-1 bg-[#1a1333] border border-white/10 rounded-full px-4 py-2 text-sm text-white outline-none"
          />

          <button
            onClick={enviarMensagem}
            className="bg-gradient-to-r from-purple-600 to-pink-500 text-white p-2 rounded-full"
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </>
  );
}