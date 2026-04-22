import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import { listarEstabelecimentos } from "@/services/estabelecimentoService";

function MapaClientes() {
  const [locais, setLocais] = useState([]);

  useEffect(() => {
    async function load() {
      const data = await listarEstabelecimentos();
      setLocais(data);
    }
    load();
  }, []);

  return (
    <MapContainer
      center={[-12.93, -38.38]}
      zoom={13}
      className="h-screen"
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {locais.map((l) => (
        <Marker
          key={l.id}
          position={[l.latitude, l.longitude]}
        />
      ))}
    </MapContainer>
  );
}

export default MapaClientes;