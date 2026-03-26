import logo from "../../assets/midislogoE.png";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";


function Login() {

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const navigate = useNavigate();

   const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/auth/login", {
        email,
        senha
      });

      const usuario = response.data;

      // salvar usuário
      localStorage.setItem("usuario", JSON.stringify(usuario));

      // alerta sucesso
      Swal.fire({
        icon: "success",
        title: "Login realizado!",
        text: `Bem-vindo, ${usuario.nome}`
      });

      // 🚀 AQUI FICA SUA LÓGICA
      if (usuario.temEmpresa) {
        navigate("/painel-vendedor");
      } else {
        navigate("/escolha");
      }

    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Erro",
        text: err.response?.data?.error || "Erro ao fazer login"
      });
    }
  };




  return (
    <div className="min-h-screen flex items-center justify-center bg-purple-700 pt-24">
      <div className="bg-white shadow-xl rounded-xl p-10 w-full max-w-md flex flex-col items-center">

        {/* Logo */}
        <img src={logo} className="h-20 mb-4" alt="logo" />

        <h2 className="text-2xl font-bold text-purple-700 mb-6">
          Entrar na Conta
        </h2>

        <form  onSubmit={handleLogin} className="w-full flex flex-col gap-4">

          <div className="flex flex-col">
            <label className="text-purple-700 font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="seuemail@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-purple-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div className="flex flex-col">
  <label className="text-purple-700 font-medium mb-1">
    Senha
  </label>

  <div className="relative">
    <input
      type={mostrarSenha ? "text" : "password"}
      placeholder="••••••••"
      value={senha}
      onChange={(e) => setSenha(e.target.value)}
      className="border border-purple-300 rounded-lg px-4 py-2 pr-10 w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
    />

    <button
      type="button"
      onClick={() => setMostrarSenha(!mostrarSenha)}
      className="absolute right-3 top-1/2 -translate-y-1/2 text-purple-500 hover:text-purple-700"
    >
      {mostrarSenha ? <EyeOff size={20} /> : <Eye size={20} />}
    </button>
  </div>
</div>

          <button
            type="submit"
            className="bg-purple-500 text-white font-semibold py-2 rounded-lg shadow-md hover:bg-purple-600 transition duration-300"
          >
            Entrar
          </button>

        </form>

        <p className="mt-6 text-purple-700 text-sm">
          Ainda não tem conta?{" "}
          <Link
            to="/cadastro"
            className="text-amber-500 font-semibold hover:text-amber-600">
            Criar cadastro
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Login;