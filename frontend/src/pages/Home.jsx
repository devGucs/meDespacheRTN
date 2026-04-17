import { useState, useEffect } from "react";
import Map from "../components/Map";

// IMPORT DAS IMAGENS
import banner1 from "../assets/banners/banner1.png";
import banner2 from "../assets/banners/banner2.png";
import banner3 from "../assets/banners/banner3.png";

function Home() {
  const [search, setSearch] = useState("");
  const [index, setIndex] = useState(0);

  const banners = [banner1, banner2, banner3];

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % banners.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex bg-gray-100 min-h-screen">

      {/* SIDEBAR */}
      <aside className="w-64 bg-purple-800 text-white flex flex-col p-6 space-y-6 shadow-lg fixed top-0 left-0 h-full pt-28">
        <h2 className="text-2xl font-bold">Menu</h2>

        <nav className="flex flex-col gap-4">
          <a href="#" className="hover:text-amber-300">Categorias</a>
          <a href="#" className="hover:text-amber-300">Próximos</a>
          <a href="#" className="hover:text-amber-300">Avaliados</a> 
          <a href="#" className="hover:text-amber-300">Configurações</a>
        </nav>
      </aside>

      {/* CONTEÚDO */}
      <main className="flex-1 ml-64 flex flex-col p-6 gap-6 pt-32">

        {/* BUSCA */}
        <div className="w-full flex justify-center">
          <input
            type="text"
            placeholder="Buscar comércios..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-2xl px-5 py-3 rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
        </div>

        {/* CARROSSEL (PRIMEIRO E MAIOR) */}
        <section>
          <h2 className="text-xl font-bold text-purple-800 mb-4">
            🎯 Promoções
          </h2>

          <div className="w-full h-72 md:h-80 relative overflow-hidden rounded-2xl shadow-lg">
            <div
              className="flex transition-transform duration-700"
              style={{ transform: `translateX(-${index * 100}%)` }}
            >
              {banners.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`Banner ${i}`}
                  className="w-full h-72 md:h-80 object-cover flex-shrink-0"
                />
              ))}
            </div>

            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
              {banners.map((_, i) => (
                <div
                  key={i}
                  className={`w-3 h-3 rounded-full ${
                    i === index ? "bg-white" : "bg-white/50"
                  }`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* MAIS BEM AVALIADOS */}
        <section>
          <h2 className="text-xl font-bold text-purple-800 mb-4">
            ⭐ Mais bem avaliados
          </h2>

          <div className="flex gap-4 overflow-x-auto pb-2">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="min-w-[200px] bg-white p-4 rounded-xl shadow hover:scale-105 transition"
              >
                <div className="h-24 bg-gray-200 rounded mb-2"></div>
                <h3 className="font-semibold">Comércio {item}</h3>
                <p className="text-sm text-gray-500">⭐ 4.{item}</p>
              </div>
            ))}
          </div>
        </section>

        {/* MAPA (AGORA EMBAIXO DOS AVALIADOS) */}
        <div className="w-full h-[420px] rounded-2xl shadow-inner overflow-hidden relative z-0">
          <Map />
        </div>

      </main>
    </div>
  );
}

export default Home;