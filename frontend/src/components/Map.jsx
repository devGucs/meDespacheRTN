import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// Corrige ícone do marker
const DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;

function Map() {
  const position = [-12.938416, -38.387138]; // Salvador

  return (
    <MapContainer
      center={position}
      zoom={17}
      className="w-full h-full rounded-2xl"
    >
      <TileLayer
        attribution="© OpenStreetMap"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Marker position={position}>
        <Popup>Você está aqui 📍</Popup>
      </Marker>
    </MapContainer>
  );
}

export default Map;