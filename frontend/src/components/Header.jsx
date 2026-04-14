import logo from "../assets/midislogoE.png";
import { FaUser } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Header() {

  const [usuario, setUsuario] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("usuario");

    if (user) {
      setUsuario(JSON.parse(user));
    }
  }, []);

  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-6xl z-50">
      <nav className="flex items-center justify-between px-6 py-3 bg-white rounded-2xl shadow-md border border-gray-200">

        {/* Logo */}
        <div className="flex items-center gap-2">
          <img src={logo} className="h-10" />
          <h1 className="text-lg font-semibold text-purple-600">
            Me Despache
          </h1>
        </div>

        {/* Menu com seus nomes */}
        <ul className="flex items-center gap-6 text-gray-700 font-medium text-sm">
          <li>
            <a href="/" className="hover:text-black transition">
              Home
            </a>
          </li>

          <li>
            <a href="#" className="hover:text-black transition">
              Sobre
            </a>
          </li>

          <li>
            <a href="#" className="hover:text-black transition">
              Contato
            </a>
          </li>
        </ul>

        {/* Ações */}
        <div className="flex items-center gap-4">
          {usuario ? (
            <>
              <span className="text-gray-700 font-medium">
                Olá, {usuario.nome}
              </span>

              <button
                onClick={() => {
                  localStorage.removeItem("usuario");
                  navigate("/login");
                }}
                className="bg-purple-500 text-white px-4 py-2 rounded-full text-sm hover:bg-black-600 transition"
              >
                Sair
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="flex items-center gap-2 text-gray-700 hover:text-black transition"
              >
                <FaUser />
                Login
              </Link>

              <Link
                to="/cadastro"
                className="bg-black text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-800 transition"
              >
                Criar conta
              </Link>
            </>
          )}
        </div>

      </nav>
    </header>
  );
}

export default Header;