import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import MapClickHandler from "@/components/MapClickHandler";

// 🔧 Corrige ícone padrão do Leaflet
const DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;

function Map({
  position,            // { lat, lng }
  setPosition,         // função pra atualizar posição (clique/drag)
  estabelecimentos = [] // lista vinda do banco
}) {

  const defaultPosition = {
    lat: -12.938416,
    lng: -38.387138,
  };

  const center = position || defaultPosition;

  return (
    <MapContainer
      center={[center.lat, center.lng]}
      zoom={15}
      className="w-full h-full rounded-2xl"
    >
      <TileLayer
        attribution="© OpenStreetMap"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* 📍 Clique no mapa (somente se for edição/cadastro) */}
      {setPosition && (
        <MapClickHandler setPosition={setPosition} />
      )}

      {/* 📌 Marker do usuário */}
      {position && (
        <Marker position={[position.lat, position.lng]}>
          <Popup>Sua localização 📍</Popup>
        </Marker>
      )}

      {/* 🏪 Estabelecimentos */}
      {estabelecimentos.map((est) =>
        est.latitude && est.longitude ? (
          <Marker
            key={est.id}
            position={[est.latitude, est.longitude]}
          >
            <Popup>
              <strong>{est.nome}</strong><br />
              {est.endereco}
            </Popup>
          </Marker>
        ) : null
      )}
    </MapContainer>
  );
}

export default Map;