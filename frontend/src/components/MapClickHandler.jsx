import { useMapEvents } from "react-leaflet";

function MapClickHandler({ setPosition }) {
  useMapEvents({
    click(e) {
      setPosition({
        lat: e.latlng.lat,
        lng: e.latlng.lng,
      });
    },
  });

  return null;
}

export default MapClickHandler;