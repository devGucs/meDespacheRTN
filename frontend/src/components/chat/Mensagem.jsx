export default function Mensagem({ msg, user }) {
  const enviado = msg.remetente_id === user.id;

  return (
    <div className={`flex ${enviado ? "justify-end" : "justify-start"}`}>
      <div
        className={`px-3 py-2 rounded-xl text-xs max-w-[70%] ${
          enviado
            ? "bg-orange-500 text-white"
            : "bg-gray-200 text-gray-800"
        }`}
      >
        {msg.tipo === "imagem" ? (
          <img src={msg.imagem_url} className="rounded-lg max-h-40" />
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