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
        className="fixed bottom-6 right-6 bg-orange-500 text-white p-4 rounded-full shadow-lg"
      >
        <MessageCircle />
      </button>

      {/* CHAT */}
      {aberto && (
        <div className="fixed bottom-20 right-6 w-[350px] h-[500px] bg-white rounded-2xl shadow-xl flex flex-col">
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