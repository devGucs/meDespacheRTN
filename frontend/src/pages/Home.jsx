import { useState, useEffect } from "react";
import Map from "../components/Map";

// IMPORT DAS IMAGENS
import banner1 from "../assets/banner1.png";
import banner2 from "../assets/banner2.png";
import banner3 from "../assets/banner3.png";

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
    <div className="min-h-screen relative overflow-hidden bg-[#070014] text-white">

      {/* 🔥 BLOBS GRANDES (AGORA VISÍVEIS) */}
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-purple-600 rounded-full blur-[180px] opacity-50"></div>

      <div className="absolute top-[10%] right-[-200px] w-[600px] h-[600px] bg-fuchsia-500 rounded-full blur-[180px] opacity-50"></div>

      <div className="absolute bottom-[-250px] left-[20%] w-[700px] h-[700px] bg-indigo-500 rounded-full blur-[200px] opacity-40"></div>

      {/* 🌟 LUZ CENTRAL (ESSENCIAL) */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(168,85,247,0.35),transparent_50%)]"></div>

      {/* 🎨 OVERLAY AJUSTADO */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-950/50 via-transparent to-indigo-950/50"></div>


      {/* SIDEBAR */}
      <aside className="w-64 fixed top-0 left-0 h-full pt-28 z-10
        bg-gradient-to-b from-purple-950/70 via-purple-900/60 to-indigo-950/70
        backdrop-blur-2xl border-r border-white/10 shadow-2xl">

        <div className="px-6 mb-8">
          <h2 className="text-2xl font-bold text-purple-200">
            Menu
          </h2>
          <p className="text-sm text-purple-400">
            Navegação
          </p>
        </div>

        <nav className="flex flex-col gap-2 px-4">

          {[
            "Categorias",
            "Próximos",
            "Avaliados",
            "Configurações"
          ].map((item, i) => (
            <a
              key={i}
              href="#"
              className="px-4 py-3 rounded-xl text-purple-200
              hover:bg-white/10 hover:text-white
              transition-all duration-200
              hover:pl-6 flex items-center justify-between"
            >
              {item}

              {/* efeito de destaque */}
              <span className="w-2 h-2 bg-purple-400 rounded-full opacity-0 group-hover:opacity-100"></span>
            </a>
          ))}

        </nav>

      </aside>

      {/* CONTEÚDO */}
      <main className="relative z-10 flex-1 ml-64 flex flex-col p-6 gap-6 pt-32">

        {/* BUSCA */}
        <div className="w-full flex justify-center">
          <input
            type="text"
            placeholder="Buscar comércios..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-2xl px-5 py-3 rounded-xl bg-white/90 text-black border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
        </div>

        {/* CARROSSEL */}
        <section>
          <h2 className="text-xl font-bold text-purple-200 mb-4">
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
          <h2 className="text-xl font-bold text-purple-200 mb-4">
            ⭐ Mais bem avaliados
          </h2>

          <div className="flex gap-4 overflow-x-auto pb-2">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="min-w-[200px] bg-white/95 text-black p-4 rounded-xl shadow hover:scale-105 transition"
              >
                <div className="h-24 bg-gray-200 rounded mb-2"></div>
                <h3 className="font-semibold">Comércio {item}</h3>
                <p className="text-sm text-gray-500">⭐ 4.{item}</p>
              </div>
            ))}
          </div>
        </section>

        {/* MAPA */}
        <div className="w-full h-[420px] rounded-2xl shadow-inner overflow-hidden">
          <Map />
        </div>

      </main>
    </div>
  );
}

export default Home;