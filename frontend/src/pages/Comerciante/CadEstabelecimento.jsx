import { useState } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import MapClickHandler from "@/components/MapClickHandler";
import { buscarCoordenadas } from "@/services/geocoding";
import { criarEstabelecimento } from "@/services/estabelecimentoService";

function CadEstabelecimento() {
  const [form, setForm] = useState({
    nome: "",
    descricao: "",
    endereco: "",
    categoria: "",
  });

  const [position, setPosition] = useState(null);
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null); // 🔥 ARQUIVO REAL

  const categorias = [
    "Restaurante",
    "Lanchonete",
    "Mercado",
    "Farmácia",
    "Loja",
    "Serviços",
  ];

  // 📍 GPS
  const usarLocalizacao = () => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setPosition({
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
      });
    });
  };

  // 🔎 Buscar endereço
  const buscarEndereco = async () => {
    const coords = await buscarCoordenadas(form.endereco);
    if (coords) setPosition(coords);
  };

  // 🧠 Atualizar campos
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🖼️ Upload imagem (CORRIGIDO)
  const handleImagem = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      setFile(selectedFile); // 🔥 salva arquivo
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  // 💾 Salvar (CORRIGIDO)
  const handleSubmit = async () => {
    if (!form.nome || !form.endereco || !position) {
      alert("Preencha os campos obrigatórios");
      return;
    }

    const response = await criarEstabelecimento({
      nome: form.nome,
      descricao: form.descricao,
      endereco: form.endereco,
      categoria: form.categoria,
      latitude: position.lat,
      longitude: position.lng,
      imagem: file, // 🔥 ENVIA ARQUIVO REAL
    });

    if (response?.error) {
      console.log(response.error);
      alert("Erro ao salvar ❌");
      return;
    }

    alert("Loja cadastrada 🚀");

    // reset
    setForm({
      nome: "",
      descricao: "",
      endereco: "",
      categoria: "",
    });
    setPosition(null);
    setPreview(null);
    setFile(null);
  };

  return (
    <div className="pt-28 px-6 bg-[#070014] min-h-screen text-white">

      <h2 className="text-3xl font-bold mb-6">
        🏪 Cadastro de Estabelecimento
      </h2>

      <div className="grid md:grid-cols-2 gap-6">

        {/* FORM */}
        <div className="bg-white text-black p-6 rounded-2xl shadow-lg">

          <input
            name="nome"
            placeholder="Nome da loja"
            value={form.nome}
            onChange={handleChange}
            className="w-full p-3 mb-3 border rounded"
          />

          <textarea
            name="descricao"
            placeholder="Descrição da loja"
            value={form.descricao}
            onChange={handleChange}
            className="w-full p-3 mb-3 border rounded"
          />

          <select
            name="categoria"
            value={form.categoria}
            onChange={handleChange}
            className="w-full p-3 mb-3 border rounded"
          >
            <option value="">Selecione a categoria</option>
            {categorias.map((cat) => (
              <option key={cat}>{cat}</option>
            ))}
          </select>

          <input
            name="endereco"
            placeholder="Endereço"
            value={form.endereco}
            onChange={handleChange}
            className="w-full p-3 mb-3 border rounded"
          />

          <div className="flex gap-2 mb-3">
            <button
              type="button"
              onClick={buscarEndereco}
              className="flex-1 bg-indigo-500 text-white p-2 rounded"
            >
              🔎 Buscar
            </button>

            <button
              type="button"
              onClick={usarLocalizacao}
              className="flex-1 bg-emerald-500 text-white p-2 rounded"
            >
              📡 GPS
            </button>
          </div>

          {/* 🖼️ UPLOAD */}
          <div className="mb-4">

            <label className="block text-sm font-semibold mb-2">
              🖼️ Foto da loja
            </label>

            <label className="flex items-center justify-center w-full aspect-square max-w-[250px]
              border-2 border-dashed border-gray-300 rounded-xl cursor-pointer
              hover:border-purple-500 hover:bg-purple-50 transition overflow-hidden">

              {preview ? (
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex flex-col items-center justify-center text-gray-500 text-sm text-center px-2">
                  <span className="text-3xl mb-2">📸</span>
                  <p className="font-medium">Foto da sua loja</p>
                  <p className="text-xs text-gray-400 mt-1">
                    Formato quadrado recomendado
                  </p>
                </div>
              )}

              <input
                type="file"
                accept="image/*"
                onChange={handleImagem}
                className="hidden"
              />
            </label>

            {preview && (
              <button
                type="button"
                onClick={() => {
                  setPreview(null);
                  setFile(null);
                }}
                className="mt-2 text-sm text-red-500 hover:underline"
              >
                Remover imagem
              </button>
            )}
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-semibold"
          >
            💾 Salvar Estabelecimento
          </button>
        </div>

        {/* MAPA */}
        <div className="bg-white p-4 rounded-2xl shadow-lg text-black">

          <div className="h-[300px] mb-4 rounded-xl overflow-hidden">
            <MapContainer
              center={
                position
                  ? [position.lat, position.lng]
                  : [-12.93, -38.38]
              }
              zoom={13}
              className="w-full h-full"
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <MapClickHandler setPosition={setPosition} />
              {position && (
                <Marker position={[position.lat, position.lng]} />
              )}
            </MapContainer>
          </div>

          {/* PREVIEW */}
          <div className="bg-gray-100 p-4 rounded-xl shadow">

            {preview && (
              <img
                src={preview}
                className="w-full h-32 object-cover rounded mb-2"
              />
            )}

            <h3 className="font-bold text-lg">
              {form.nome || "Nome da loja"}
            </h3>

            <p className="text-sm text-gray-600 mb-1">
              {form.categoria || "Categoria"}
            </p>

            <p className="text-sm text-gray-500">
              {form.descricao || "Descrição da loja..."}
            </p>

            <p className="mt-2 text-yellow-500 font-semibold">
              ⭐ 0.0
            </p>

          </div>
        </div>

      </div>
    </div>
  );
}

export default CadEstabelecimento;