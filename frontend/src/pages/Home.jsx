import { useState, useEffect } from "react";
import Map from "../components/Map";

// IMPORT DAS IMAGENS
import banner1 from "../assets/banners/banner1.png";
import banner2 from "../assets/banners/banner2.png";
import banner3 from "../assets/banners/banner3.png";

function Home() {
  const [search, setSearch] = useState("");
  const [index, setIndex] = useState(0);
  
  const [melhoresEmpresas, setMelhoresEmpresas] = useState([]);

  const banners = [banner1, banner2, banner3];

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % banners.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const buscarMelhoresAvaliacoes = async () => {
      try {
      
        const response = await fetch("http://localhost:5005/auth/melhores_avaliacoes");
        const data = await response.json();
        
        if (response.ok) {
          setMelhoresEmpresas(data);
        }
      } catch (error) {
        console.error("Erro ao buscar avaliações:", error);
      }
    };

    buscarMelhoresAvaliacoes();
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

      <main className="flex-1 ml-64 flex flex-col p-6 gap-6 pt-32">

        <div className="w-full flex justify-center">
          <input
            type="text"
            placeholder="Buscar comércios..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-2xl px-5 py-3 rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
        </div>

        {/* CARROSSEL*/}
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

        {/* AVALIAÇ~EOS  */}
        <section>
          <h2 className="text-xl font-bold text-purple-800 mb-4">
            ⭐ Mais bem avaliados
          </h2>

          <div className="flex gap-4 overflow-x-auto pb-2">
            {melhoresEmpresas.length > 0 ? (
              melhoresEmpresas.map((empresa) => (
                <div
                  key={empresa.id}
                  className="min-w-[200px] bg-white p-4 rounded-xl shadow hover:scale-105 transition"
                >
                  <div className="h-24 bg-gray-200 rounded mb-2 flex items-center justify-center text-gray-400 text-xs">
                    Sem Imagem
                  </div>
                  <h3 className="font-semibold truncate" title={empresa.nome_loja}>
                    {empresa.nome_loja}
                  </h3>
                  <p className="text-sm text-gray-500">
                    ⭐ {empresa.nota ? empresa.nota.toFixed(1) : "N/A"}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-500">Nenhuma empresa encontrada...</p>
            )}
          </div>
        </section>

        <div className="w-full h-[420px] rounded-2xl shadow-inner overflow-hidden relative z-0">
          <Map />
        </div>

      </main>
    </div>
  );
}

export default Home;