import logo from "../assets/midislogoE.png";

function Home() {
  return (
    <div className="bg-gray-50 min-h-screen">

      {/* HEADER */}
      <header className="bg-white shadow-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center py-4">

          <div className="flex items-center gap-3">
            <img src={logo} className="w-14 h-14" />
            <h1 className="text-2xl font-bold text-gray-900">
              ME DESPACHE
            </h1>
          </div>

          <nav className="hidden md:flex gap-6">
            <a href="#produtos" className="hover:text-purple-700">Produtos</a>
            <a href="#categorias" className="hover:text-purple-700">Categorias</a>
            <a href="#" className="hover:text-purple-700">Sobre</a>
            <a href="#" className="hover:text-purple-700">Contato</a>
            <a href="/login" className="hover:text-purple-700">Login</a>
          </nav>

          <button className="text-gray-700 hover:text-purple-700">
            🛒
          </button>
        </div>
      </header>

      {/* HERO */}
      <section className="bg-purple-700 text-white py-20 text-center">
        <h2 className="text-4xl font-bold mb-3">
          Sua loja em ritmo digital!
        </h2>

        <p className="text-purple-200 mb-6">
          Os melhores produtos pertinho de você
        </p>

        <a
          href="#produtos"
          className="bg-amber-400 text-black px-6 py-3 rounded-lg font-semibold hover:bg-amber-500"
        >
          Ver Produtos
        </a>
      </section>

      {/* CATEGORIAS */}
      <section id="categorias" className="py-12 bg-white text-center">
        <h3 className="text-3xl font-bold mb-8">Categorias</h3>

        <div className="flex flex-wrap justify-center gap-4">
          <button className="px-4 py-2 bg-purple-700 text-white rounded-full">Todos</button>
          <button className="px-4 py-2 border rounded-full hover:bg-purple-100">Eletrônicos</button>
          <button className="px-4 py-2 border rounded-full hover:bg-purple-100">Acessórios</button>
          <button className="px-4 py-2 border rounded-full hover:bg-purple-100">Móveis</button>
        </div>
      </section>

      {/* PRODUTOS */}
      <section id="produtos" className="py-12">
        <h3 className="text-3xl font-bold text-center mb-12">
          Nossos Produtos
        </h3>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto px-4">

          {[1,2,3].map((item) => (
            <div key={item} className="bg-white p-4 rounded-xl shadow hover:scale-105 transition">
              <div className="h-40 bg-gray-200 rounded mb-4"></div>
              <h4 className="font-semibold">Produto {item}</h4>
              <p className="text-gray-500">R$ 99,90</p>

              <button className="mt-3 bg-amber-400 w-full py-2 rounded-lg">
                Comprar
              </button>
            </div>
          ))}

        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-950 text-white py-10 text-center">
        <h2 className="text-xl font-bold">ME DESPACHE</h2>
        <p className="text-gray-400">Sua loja em ritmo digital</p>
      </footer>

    </div>
  );
}

export default Home;