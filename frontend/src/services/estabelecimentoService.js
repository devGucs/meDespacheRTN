// services/estabelecimentoService.js
import axios from "axios";

const API = "http://localhost:3000/estabelecimentos";

export async function criarEstabelecimento(data) {
  const formData = new FormData();

  Object.keys(data).forEach((key) => {
    formData.append(key, data[key]);
  });

  const res = await axios.post(API, formData);
  return res.data;
}

export async function listarEstabelecimentos() {
  const res = await axios.get(API);
  return res.data;
}