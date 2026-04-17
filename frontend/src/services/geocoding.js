export async function buscarCoordenadas(endereco) {
  const res = await fetch(
    `https://nominatim.openstreetmap.org/search?format=json&q=${endereco}`
  );

  const data = await res.json();

  return {
    lat: parseFloat(data[0].lat),
    lng: parseFloat(data[0].lon),
  };
}