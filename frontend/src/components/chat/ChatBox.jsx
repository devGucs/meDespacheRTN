import { useEffect, useState } from "react";
import supabase from "../../lib/supabase";
import Mensagem from "./Mensagem";
import { Send, X } from "lucide-react";

export default function ChatBox({ vendedorId, user, fechar }) {
  const [mensagem, setMensagem] = useState("");
  const [chat, setChat] = useState([]);
  const [conversaId, setConversaId] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);

  // 🔎 criar/buscar conversa
  useEffect(() => {
    const iniciar = async () => {
      let { data } = await supabase
        .from("conversas")
        .select("*")
        .eq("cliente_id", user.id)
        .eq("vendedor_id", vendedorId)
        .single();

      if (!data) {
        const { data: nova } = await supabase
          .from("conversas")
          .insert([
            {
              cliente_id: user.id,
              vendedor_id: vendedorId,
            },
          ])
          .select()
          .single();

        setConversaId(nova.id);
      } else {
        setConversaId(data.id);
      }
    };

    iniciar();
  }, []);

  // 📥 carregar histórico
  useEffect(() => {
    if (!conversaId) return;

    const carregar = async () => {
      let { data } = await supabase
        .from("mensagens")
        .select("*")
        .eq("conversa_id", conversaId)
        .order("criado_em");

      setChat(data);
    };

    carregar();
  }, [conversaId]);

  // ⚡ realtime
  useEffect(() => {
    if (!conversaId) return;

    const channel = supabase
      .channel("chat")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "mensagens",
          filter: `conversa_id=eq.${conversaId}`,
        },
        (payload) => {
          setChat((prev) => [...prev, payload.new]);

          if (Notification.permission === "granted") {
            new Notification("Nova mensagem", {
              body:
                payload.new.tipo === "imagem"
                  ? "📷 Imagem recebida"
                  : payload.new.conteudo,
            });
          }
        }
      )
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, [conversaId]);

  // 🟢 presença
  useEffect(() => {
    const channel = supabase.channel("online-users", {
      config: { presence: { key: user.id } },
    });

    channel.on("presence", { event: "sync" }, () => {
      const state = channel.presenceState();
      setOnlineUsers(Object.keys(state));
    });

    channel.subscribe(async (status) => {
      if (status === "SUBSCRIBED") {
        await channel.track({ user: user.id });
      }
    });

    return () => supabase.removeChannel(channel);
  }, []);

  const vendedorOnline = onlineUsers.includes(vendedorId);

  // ✔️ marcar como lido
  useEffect(() => {
    if (!conversaId) return;

    supabase
      .from("mensagens")
      .update({ lido: true })
      .eq("conversa_id", conversaId)
      .neq("remetente_id", user.id);
  }, [chat]);

  // 💬 enviar texto
  const enviarMensagem = async () => {
    if (!mensagem.trim()) return;

    await supabase.from("mensagens").insert([
      {
        conversa_id: conversaId,
        remetente_id: user.id,
        destinatario_id: vendedorId,
        conteudo: mensagem,
      },
    ]);

    setMensagem("");
  };

  // 📎 enviar imagem
  const enviarImagem = async (file) => {
    const fileName = `${Date.now()}-${file.name}`;

    await supabase.storage.from("chat").upload(fileName, file);

    const { data } = supabase.storage
      .from("chat")
      .getPublicUrl(fileName);

    await supabase.from("mensagens").insert([
      {
        conversa_id: conversaId,
        remetente_id: user.id,
        destinatario_id: vendedorId,
        tipo: "imagem",
        imagem_url: data.publicUrl,
      },
    ]);
  };

  // 🔔 pedir permissão
  useEffect(() => {
    if (Notification.permission !== "granted") {
      Notification.requestPermission();
    }
  }, []);

  return (
    <>
      {/* HEADER */}
      <div className="flex justify-between items-center p-3 border-b">
        <h2 className="text-sm font-semibold">
          {vendedorOnline ? "🟢 Online" : "⚪ Offline"}
        </h2>
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
      <div className="p-2 border-t space-y-2">
        <input
          type="file"
          onChange={(e) => enviarImagem(e.target.files[0])}
        />

        <div className="flex gap-2">
          <input
            value={mensagem}
            onChange={(e) => setMensagem(e.target.value)}
            placeholder="Digite..."
            className="flex-1 border rounded-lg px-3 py-2 text-sm"
          />

          <button
            onClick={enviarMensagem}
            className="bg-orange-500 text-white p-2 rounded-lg"
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </>
  );
}