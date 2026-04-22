import { useState } from "react";
import Map from "../../components/Map";

function HomeVendedor() {
  const [banners, setBanners] = useState([]);
  const [comentarios] = useState([
    { nome: "João", msg: "Ótimo atendimento!", nota: 5 },
    { nome: "Maria", msg: "Entrega rápida 👏", nota: 4 },
    { nome: "Carlos", msg: "Preço poderia melhorar", nota: 3 },
  ]);

  // Upload de banners
  const handleUpload = (e) => {
    const files = Array.from(e.target.files);
    const urls = files.map((file) => URL.createObjectURL(file));
    setBanners((prev) => [...prev, ...urls]);
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#070014] text-white">

      {/* BACKGROUND */}
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-purple-600 rounded-full blur-[180px] opacity-50"></div>
      <div className="absolute top-[10%] right-[-200px] w-[600px] h-[600px] bg-fuchsia-500 rounded-full blur-[180px] opacity-50"></div>
      <div className="absolute bottom-[-250px] left-[20%] w-[700px] h-[700px] bg-indigo-500 rounded-full blur-[200px] opacity-40"></div>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(168,85,247,0.35),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-purple-950/50 via-transparent to-indigo-950/50"></div>

      {/* SIDEBAR */}
      <aside className="w-64 fixed top-0 left-0 h-full pt-28 z-10
        bg-gradient-to-b from-purple-950/70 via-purple-900/60 to-indigo-950/70
        backdrop-blur-2xl border-r border-white/10 shadow-2xl">

        <div className="px-6 mb-8">
          <h2 className="text-2xl font-bold text-purple-200">
            Painel Vendedor
          </h2>
          <p className="text-sm text-purple-400">
            Gerencie sua loja
          </p>
        </div>

        <nav className="flex flex-col gap-2 px-4">
          {["Minha Loja", "Banners", "Avaliações", "Configurações"].map((item, i) => (
            <a
              key={i}
              href="#"
              className="px-4 py-3 rounded-xl text-purple-200
              hover:bg-white/10 hover:text-white transition-all duration-200"
            >
              {item}
            </a>
          ))}
        </nav>
      </aside>

      {/* CONTEÚDO */}
      <main className="relative z-10 flex-1 ml-64 flex flex-col p-6 gap-8 pt-32">

        {/* CADASTRO DA LOJA */}
        <section className="bg-white/10 p-6 rounded-2xl backdrop-blur shadow">
          <h2 className="text-xl font-bold text-purple-200 mb-4">
            🏪 Cadastrar sua loja
          </h2>

          <button
            className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-xl font-semibold transition"
          >
            Cadastrar Loja com Localização
          </button>

          <div className="mt-6 h-[300px] rounded-xl overflow-hidden">
            <Map />
          </div>
        </section>

        {/* UPLOAD DE BANNERS */}
        <section className="bg-white/10 p-6 rounded-2xl backdrop-blur shadow">
          <h2 className="text-xl font-bold text-purple-200 mb-4">
            🖼️ Upload de Banners
          </h2>

          <input
            type="file"
            multiple
            onChange={handleUpload}
            className="mb-4"
          />

          <div className="flex gap-4 overflow-x-auto">
            {banners.map((img, i) => (
              <img
                key={i}
                src={img}
                alt="banner"
                className="h-32 rounded-xl"
              />
            ))}
          </div>
        </section>

        {/* DASHBOARD DE AVALIAÇÕES */}
        <section className="bg-white/10 p-6 rounded-2xl backdrop-blur shadow">
          <h2 className="text-xl font-bold text-purple-200 mb-4">
            ⭐ Avaliações da sua loja
          </h2>

          <div className="grid md:grid-cols-3 gap-4">
            {comentarios.map((c, i) => (
              <div
                key={i}
                className="bg-white/90 text-black p-4 rounded-xl shadow"
              >
                <h3 className="font-semibold">{c.nome}</h3>
                <p className="text-sm text-gray-600">{c.msg}</p>
                <p className="mt-2">⭐ {c.nota}</p>
              </div>
            ))}
          </div>
        </section>

      </main>
    </div>
  );
}

export default HomeVendedor;