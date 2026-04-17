import { useState } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import MapClickHandler from "../../components/MapClickHandler";
import { buscarCoordenadas } from "../../services/geocoding";
import { criarEstabelecimento } from "../../services/estabelecimentoService";

function CadEstabelecimento() {
  const [nome, setNome] = useState("");
  const [endereco, setEndereco] = useState("");
  const [position, setPosition] = useState(null);

  // GPS
  const usarLocalizacao = () => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setPosition([pos.coords.latitude, pos.coords.longitude]);
    });
  };

  // buscar endereço
  const buscarEndereco = async () => {
    const coords = await buscarCoordenadas(endereco);
    setPosition([coords.lat, coords.lng]);
  };

  const handleSubmit = async () => {
    if (!position) return alert("Selecione uma localização");

    await criarEstabelecimento({
      nome,
      endereco,
      latitude: position[0],
      longitude: position[1],
      empresa_id: "ID_DA_EMPRESA_AQUI",
    });

    alert("Estabelecimento cadastrado!");
  };

  return (
    <div className="p-6">

      <h2 className="text-xl font-bold mb-4">
        Cadastrar Estabelecimento
      </h2>

      <input
        type="text"
        placeholder="Nome do estabelecimento"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        className="border p-2 w-full mb-2"
      />

      <input
        type="text"
        placeholder="Digite o endereço"
        value={endereco}
        onChange={(e) => setEndereco(e.target.value)}
        className="border p-2 w-full mb-2"
      />

      <button onClick={buscarEndereco} className="bg-blue-500 text-white px-4 py-2 mr-2">
        Buscar endereço
      </button>

      <button onClick={usarLocalizacao} className="bg-green-500 text-white px-4 py-2">
        Usar minha localização
      </button>

      <div className="h-96 mt-4">
        <MapContainer
          center={position || [-12.93, -38.38]}
          zoom={13}
          className="w-full h-full"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <MapClickHandler setPosition={setPosition} />

          {position && <Marker position={position} />}
        </MapContainer>
      </div>

      <button
        onClick={handleSubmit}
        className="bg-purple-600 text-white px-4 py-2 mt-4"
      >
        Salvar
      </button>

    </div>
  );
}

export default CadEstabelecimento;