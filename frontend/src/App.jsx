import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Autenticacao/Login";
import Cadastro from "./pages/Autenticacao/Cadastro";
import CadEmpresa from "./pages/Autenticacao/CadEmpresa";
import Escolha from "./pages/Autenticacao/Escolha";
import Header from "./components/Header";
import Footers from "./components/Footers";
import PainelCliente from "./pages/Cliente/PainelCliente";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/escolha" element={<Escolha />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Cadastro />} />
        <Route path="/cadastro-empresa" element={<CadEmpresa />} />
        <Route path="/painel-cliente" element={<PainelCliente />} />

      </Routes>
      <Footers />
    </BrowserRouter>
  );
}

export default App;