import logo from "../../assets/midislogoE.png";
import { useNavigate } from "react-router-dom";

function Escolha() {

  const navigate = useNavigate();

  const escolherTipo = (tipo) => {
    // opcional salvar (pode ajudar depois)
    localStorage.setItem("tipoEscolhido", tipo);

    if (tipo === "comprador") {
      navigate("/painel-cliente");
    } else {
      navigate("/cadastro-empresa");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-purple-700 pt-24">

      <div className="bg-white shadow-xl rounded-lg w-[40%] max-w-4xl min-h-[60vh] px-12 py-14 flex flex-col items-center justify-center gap-10">

        <img src={logo} alt="logo" className="h-20" />

        <h2 className="text-3xl font-bold text-purple-700 text-center">
          Como você deseja usar a plataforma?
        </h2>

        <div className="flex gap-10">

          <button
            onClick={() => escolherTipo("comprador")}
            className="bg-purple-700 text-white px-10 py-6 rounded-xl text-2xl font-semibold shadow-lg hover:bg-purple-800 transition-transform duration-300 hover:scale-105"
          >
            Quero Comprar
          </button>

          <button
            onClick={() => escolherTipo("vendedor")}
            className="bg-amber-400 text-purple-900 px-10 py-6 rounded-xl text-2xl font-semibold shadow-lg hover:bg-amber-500 transition-transform duration-300 hover:scale-105"
          >
            Quero Vender
          </button>

        </div>

      </div>

    </div>
  );
}

export default Escolha;