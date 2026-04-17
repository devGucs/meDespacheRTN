import api from "./api";

// buscar todos
export const getEstabelecimentos = async () => {
  const res = await api.get("/estabelecimentos");
  return res.data;
};

// buscar próximos
export const getProximos = async (lat, lng) => {
  const res = await api.get(
    `/estabelecimentos/proximos?lat=${lat}&lng=${lng}`
  );
  return res.data;
};

// criar
export const criarEstabelecimento = async (data) => {
  const res = await api.post("/estabelecimentos", data);
  return res.data;
};