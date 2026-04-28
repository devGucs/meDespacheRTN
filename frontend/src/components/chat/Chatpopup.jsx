import { useState } from "react";
import ChatBox from "./ChatBox";
import { MessageCircle } from "lucide-react";

export default function ChatPopup({ vendedorId, user }) {
  const [aberto, setAberto] = useState(false);

  return (
    <>
      {/* BOTÃO */}
      <button
        onClick={() => setAberto(!aberto)}
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-purple-600 to-pink-500 text-white p-4 rounded-full shadow-xl hover:scale-110 transition-all">
        <MessageCircle />
      </button>

      {/* CHAT */}
      {aberto && (
       <div className="fixed bottom-20 right-6 w-[360px] h-[520px] bg-[#0f0a1f] text-white rounded-2xl shadow-2xl flex flex-col border border-white/10 backdrop-blur-lg">
          <ChatBox
            vendedorId={vendedorId}
            user={user}
            fechar={() => setAberto(false)}
          />
        </div>
      )}
    </>
  );
}