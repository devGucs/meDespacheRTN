// services/chatService.js
const supabase = require('../config/db');

// 🔎 criar ou buscar conversa
const getOrCreateConversa = async (cliente_id, vendedor_id) => {
  const { data: conversaExistente } = await supabase
    .from("conversas") // ✅ CORRETO
    .select("*")
    .eq("cliente_id", cliente_id)
    .eq("vendedor_id", vendedor_id)
    .maybeSingle();

  if (conversaExistente) return conversaExistente;

  const { data, error } = await supabase
    .from("conversas")
    .insert([{ cliente_id, vendedor_id }])
    .select()
    .single();

  if (error) throw new Error(error.message);

  return data;
};

// 📥 mensagens
const getMensagens = async (conversa_id) => {
  const { data, error } = await supabase
    .from("conversas")
    .select("*")
    .eq("conversa_id", conversa_id)
    .order("criado_em");

  if (error) throw new Error(error.message);

  return data;
};

// 💬 enviar
const enviarMensagem = async (mensagem) => {
  const { data, error } = await supabase
    .from("conversas")
    .insert([mensagem])
    .select()
    .single();

  if (error) throw new Error(error.message);

  return data;
};

module.exports = {
  getOrCreateConversa,
  getMensagens,
  enviarMensagem,
};