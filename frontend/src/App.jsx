import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Autenticacao/Login";
import Cadastro from "./pages/Autenticacao/Cadastro";
import CadEmpresa from "./pages/Comerciante/CadEmpresa";
import Header from "./components/Header";
import Footers from "./components/Footers";
import Landing from "./pages/landing";
import Home from "./pages/home";
import Dashboard from "./pages/Cliente/Dashboard";
import Pagamento from "./pages/Pagamento";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Pagamento />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/cadastro-empresa" element={<CadEmpresa />} />
        <Route path="/home" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/landing" element={<Landing />} />
      </Routes>
      <Footers />
    </BrowserRouter>
  );
}

export default App;