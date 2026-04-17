import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import MapClickHandler from "./MapClickHandler";

// Corrige ícone do marker
const DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;

function Map({ position, setPosition, estabelecimentos = [] }) {
  const defaultPosition = [-12.938416, -38.387138];

  return (
    <MapContainer
      center={position || defaultPosition}
      zoom={15}
      className="w-full h-full rounded-2xl"
    >
      <TileLayer
        attribution="© OpenStreetMap"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* clique no mapa */}
      {setPosition && <MapClickHandler setPosition={setPosition} />}

      {/* marcador do usuário */}
      {position && (
        <Marker position={position}>
          <Popup>Sua localização 📍</Popup>
        </Marker>
      )}

      {/* estabelecimentos */}
      {estabelecimentos.map((est) => (
        <Marker
          key={est.id}
          position={[est.latitude, est.longitude]}
        >
          <Popup>{est.nome}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default Map;