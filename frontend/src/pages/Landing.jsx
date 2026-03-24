import logo from "../assets/midislogoE.png";
import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">

      {/* HEADER */}
      <header className="fixed top-0 left-0 w-full bg-purple-50 shadow-md z-50">
        <nav className="flex justify-between items-center px-8 py-4">

          <div className="flex items-center gap-3">
            <img src={logo} alt="logo" className="h-14" />
            <h1 className="text-2xl font-bold text-purple-700">
              ME DESPACHE
            </h1>
          </div>

          <ul className="flex gap-6 text-purple-700 font-medium">
            <li>
              <Link to="/" className="hover:text-amber-400 transition">
                Home
              </Link>
            </li>
            <li>
              <a href="#" className="hover:text-amber-400 transition">
                Sobre
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-amber-400 transition">
                Contato
              </a>
            </li>
            <li>
              <Link
                to="/login"
                className="hover:text-amber-400 font-semibold"
              >
                Login
              </Link>
            </li>
          </ul>

        </nav>
      </header>

      {/* HERO */}
      <section className="h-[80vh] flex items-center justify-center bg-purple-700 mt-24">
        <div className="flex flex-col items-center text-center space-y-6 px-4">

          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Transforme seus desafios em oportunidades
          </h2>

          <p className="text-xl md:text-2xl text-white max-w-2xl">
            Descubra como nossa plataforma pode impulsionar seu negócio
            e melhorar a procura.
          </p>

          <Link to="/login">
            <button className="bg-amber-400 text-purple-900 font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-amber-500 transition duration-300">
              Comece agora!
            </button>
          </Link>

        </div>
      </section>

      {/* BENEFÍCIOS */}
      <section className="py-20 bg-purple-50 flex flex-col items-center gap-10 px-4">

        <h2 className="text-2xl font-bold text-purple-800 text-center">
          POR QUE ESCOLHER NOSSA PLATAFORMA?
        </h2>

        <div className="flex flex-wrap justify-center gap-6">

          {/* CARD 1 */}
          <div className="w-64 p-6 bg-purple-700 text-white rounded-lg shadow-md text-center transform hover:scale-105 hover:shadow-xl transition">
            <h3 className="text-lg font-semibold mb-2">
              FÁCIL DE USAR
            </h3>
            <p>
              Interface intuitiva e amigável para todos os níveis de experiência.
            </p>
          </div>

          {/* CARD 2 */}
          <div className="w-64 p-6 bg-purple-700 text-white rounded-lg shadow-md text-center transform hover:scale-105 hover:shadow-xl transition">
            <h3 className="text-lg font-semibold mb-2">
              DIGITALIZAÇÃO DO NEGÓCIO
            </h3>
            <p>
              Estímulo da economia local através da visibilidade dos comércios.
            </p>
          </div>

          {/* CARD 3 */}
          <div className="w-64 p-6 bg-purple-700 text-white rounded-lg shadow-md text-center transform hover:scale-105 hover:shadow-xl transition">
            <h3 className="text-lg font-semibold mb-2">
              SUPORTE DEDICADO
            </h3>
            <p>
              Equipe pronta para ajudar você em qualquer momento.
            </p>
          </div>

        </div>

      </section>

      {/* FOOTER */}
      <footer className="bg-black text-white py-6 px-10 flex flex-col md:flex-row items-center justify-between">

        <div className="flex items-center gap-3 mb-3 md:mb-0">
          <img src={logo} alt="logo" className="h-10" />
          <span className="text-lg font-semibold">ME DESPACHE</span>
        </div>

        <p className="text-sm opacity-80 text-center">
          © 2025 ME DESPACHE — Todos os direitos reservados.
        </p>

      </footer>

    </div>
  );
}

export default Home;