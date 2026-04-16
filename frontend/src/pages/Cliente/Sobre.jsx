import { Link } from "react-router-dom";

function Sobre() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">

      {/* NAVBAR */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-800">Me Despache</h1>

          <nav className="flex gap-6">
            <Link to="/" className="text-gray-600 hover:text-black">Home</Link>
            <Link to="/sobre" className="text-black font-semibold">Sobre</Link>
            <Link to="/login" className="text-gray-600 hover:text-black">Entrar</Link>
          </nav>
        </div>
      </header>

      {/* HERO */}
      <section className="bg-gradient-to-r from-purple-600 to-purple-800 text-white text-center py-20">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Sobre o Me Despache
        </h1>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto">
          Simplificando pagamentos e conectando pessoas com tecnologia de forma rápida, segura e moderna.
        </p>
      </section>

      {/* QUEM SOMOS */}
      <section className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10 items-center">
        
        <div>
          <h2 className="text-3xl  text-purple-600 font-bold mb-4">Quem somos</h2>
          <p className="text-gray-600 mb-4">
            O <span className="font-semibold">Me Despache</span> nasceu com o objetivo de facilitar a vida dos comerciantes e consumidores, oferecendo uma plataforma de pagamentos digitais que é rápida, segura e fácil de usar. Nossa missão é conectar pessoas e negócios por meio da tecnologia,
            trazendo praticidade tanto para comerciantes quanto para consumidores.
          </p>
          <p className="text-gray-600">
            Nossa plataforma integra soluções modernas como PIX, cartões e gestão de transações
            em um só lugar.
          </p>
        </div>

        <div className="bg-gray-200 h-64 rounded-2xl flex items-center justify-center">
          <span className="text-gray-500">Imagem / Ilustração</span>
        </div>

      </section>

      {/* MISSÃO VISÃO VALORES */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8 text-center">

          <div className="p-6 rounded-2xl shadow hover:shadow-lg transition">
            <h3 className="text-xl font-bold mb-2">Missão</h3>
            <p className="text-gray-600">
              Aumentar a visibilidade de pequenos comércios.
            </p>
          </div>

          <div className="p-6 rounded-2xl shadow hover:shadow-lg transition">
            <h3 className="text-xl font-bold mb-2">Visão</h3>
            <p className="text-gray-600">
              Ser referência em soluções digitais no Brasil.
            </p>
          </div>

          <div className="p-6 rounded-2xl shadow hover:shadow-lg transition">
            <h3 className="text-xl font-bold mb-2">Valores</h3>
            <p className="text-gray-600">
              Inovação, transparência e foco no cliente.
            </p>
          </div>

        </div>
      </section>

      {/* CTA FINAL */}
      <section className="bg-black text-white text-center py-16">
        <h2 className="text-3xl font-bold mb-4">
          Pronto para começar?
        </h2>
        <p className="text-gray-400 mb-6">
          Crie sua conta e comece a usar agora mesmo.
        </p>

        <Link
          to="/cadastro"
          className="bg-white text-black px-6 py-3 rounded-xl font-semibold hover:bg-gray-200 transition"
        >
          Criar conta
        </Link>
      </section>

    </div>
  );
}

export default Sobre;