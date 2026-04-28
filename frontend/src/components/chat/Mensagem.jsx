export default function Mensagem({ msg, user }) {
  const enviado = msg.remetente_id === user.id;

  return (
    <div className={`flex ${enviado ? "justify-end" : "justify-start"}`}>
      <div
        className={`px-3 py-2 rounded-2xl text-xs max-w-[75%] shadow ${
          enviado
            ? "bg-gradient-to-r from-purple-600 to-pink-500 text-white"
            : "bg-[#1a1333] text-gray-200"
        }`}
      >
        {msg.tipo === "imagem" ? (
          <img
            src={msg.imagem_url}
            className="rounded-lg max-h-40 mb-1"
          />
        ) : (
          msg.conteudo
        )}

        {enviado && (
          <div className="text-right text-[10px] opacity-70">
            {msg.lido ? "✓✓" : "✓"}
          </div>
        )}
      </div>
    </div>
  );
}