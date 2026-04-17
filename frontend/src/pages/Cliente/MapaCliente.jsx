import { useEffect, useState } from "react";
import Map from "../../components/Map";
import { getProximos } from "../../services/estabelecimentoService";

function MapaCliente() {
  const [position, setPosition] = useState(null);
  const [estabelecimentos, setEstabelecimentos] = useState([]);

  // pega localização do usuário
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setPosition([pos.coords.latitude, pos.coords.longitude]);
    });
  }, []);

  // busca estabelecimentos próximos
  useEffect(() => {
    if (!position) return;

    getProximos(position[0], position[1])
      .then(setEstabelecimentos);
  }, [position]);

  return (
    <div className="h-screen p-4">
      <Map
        position={position}
        estabelecimentos={estabelecimentos}
      />
    </div>
  );
}

export default MapaCliente;