import logo from "../../assets/midislogoE.png"
import { Link, useNavigate } from "react-router-dom"; // 🔥 TROCA AQUI
import Swal from "sweetalert2";
import { useState } from "react";

function Cadastro() {

  const navigate = useNavigate(); // 🔥 AQUI

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleCadastro = async (e) => {
    e.preventDefault();

    if (!nome || !email || !senha) {
      Swal.fire({
        icon: "error",
        title: "Erro",
        text: "Preencha todos os campos",
      });
      return;
    }

    if (senha.length < 6) {
      Swal.fire({
        icon: "warning",
        title: "Senha fraca",
        text: "Mínimo 6 caracteres",
      });
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/auth/cadastro", { // 🔥 AJUSTEI ROTA
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nome, email, senha }),
      });

      const data = await response.json();

      if (!response.ok) {
        Swal.fire({
          icon: "error",
          title: "Erro",
          text: data.error,
        });
        return;
      }

      Swal.fire({
        icon: "success",
        title: "Cadastro realizado!",
      }).then(() => {
        navigate("/login"); // 🔥 CORRETO
      });

    } catch {
      Swal.fire({
        icon: "error",
        title: "Erro",
        text: "Erro ao conectar com servidor",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-purple-700 pt-24">
      <div className="bg-white shadow-xl rounded-xl p-10 w-full max-w-md flex flex-col items-center">

        <img src={logo} className="h-20 mb-4" alt="logo" />

        <h2 className="text-2xl font-bold text-purple-700 mb-6">
          Criar Conta
        </h2>

        <form onSubmit={handleCadastro} className="w-full flex flex-col gap-4">

          <input
            type="text"
            placeholder="Seu nome"
            value={nome}
            onChange={(e)=> setNome(e.target.value)}
            className="border rounded-lg px-4 py-2"
          />

          <input
            type="email"
            placeholder="seuemail@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border rounded-lg px-4 py-2"
          />

          <input
            type="password"
            placeholder="••••••••"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className="border rounded-lg px-4 py-2"
          />

          <button type="submit" className="bg-amber-400 py-2 rounded-lg">
            Criar Conta
          </button>

        </form>

        <p className="mt-6 text-sm">
          Já possui uma conta?
          <Link to="/login" className="text-amber-500">
            Entrar
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Cadastro;