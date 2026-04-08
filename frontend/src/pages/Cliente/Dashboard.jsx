import { useState } from "react";
import { Search } from "lucide-react";

export default function Dashboard() {
  const [busca, setBusca] = useState("");

// dados
const pedidos = [
  { id: 1, nome: "João", status: "Entregue" },
  { id: 2, nome: "Maria", status: "Pendente" },
  { id: 3, nome: "Pedro", status: "Cancelado" },
  { id: 4, nome: "Ana", status: "Entregue" },
];

const pedidosFiltrados = pedidos.filter((pedido) => {
  const termo = busca.toLowerCase();

  return (
    pedido.nome.toLowerCase().includes(termo) ||
    pedido.status.toLowerCase().includes(termo) ||
    pedido.id.toString().includes(termo)
  );
});

  return (
    <div className="flex h-screen bg-gray-100">

      {/* SIDEBAR */}
      <aside className="w-64 bg-purple-700 text-white p-5">
        <h2 className="text-2xl font-bold mb-8">Me Despache</h2>

        <nav className="flex flex-col gap-4">
          <button className="hover:bg-purple-600 p-2 rounded text-left">Dashboard</button>
          <button className="hover:bg-purple-600 p-2 rounded text-left">Pedidos</button>
          <button className="hover:bg-purple-600 p-2 rounded text-left">Clientes</button>
          <button className="hover:bg-purple-600 p-2 rounded text-left">Configurações</button>
        </nav>
      </aside>

      {/* CONTEÚDO */}
      <main className="flex-1 p-6">

        {/* NAVBAR */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Dashboard</h1>

          <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition">
            Sair
          </button>
        </div>

        {/* 🔍 BUSCA PROFISSIONAL */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />

          <input
            type="text"
            placeholder="Buscar por nome, status ou ID..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="w-full pl-10 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* CARDS */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-4 rounded shadow">
            <p className="text-gray-500">Pedidos</p>
            <h2 className="text-2xl font-bold">{pedidos.length}</h2>
          </div>

          <div className="bg-white p-4 rounded shadow">
            <p className="text-gray-500">Clientes</p>
            <h2 className="text-2xl font-bold">80</h2>
          </div>

          <div className="bg-white p-4 rounded shadow">
            <p className="text-gray-500">Receita</p>
            <h2 className="text-2xl font-bold">R$ 5.000</h2>
          </div>
        </div>

        {/* LISTA */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-bold mb-4">Pedidos recentes</h2>

          {pedidosFiltrados.length === 0 ? (
            <p className="text-gray-500">Nenhum resultado encontrado...</p>
          ) : (
            <ul className="space-y-2">
              {pedidosFiltrados.map((pedido) => (
                <li
                  key={pedido.id}
                  className="border-b pb-2 flex justify-between"
                >
                  <span>
                    Pedido #{pedido.id.toString().padStart(3, "0")} - {pedido.nome}
                  </span>

                  <span className="text-sm text-gray-500">
                    {pedido.status}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

      </main>
    </div>
  );
}