export default function Sidebar({ setPage }) {
  const items = ["Resumo", "Lojas", "Promoções", "Avaliações", "Perguntas", "Configurações"];

  return (
    <aside className="w-64 fixed top-0 left-0 h-full pt-28 z-10
    bg-gradient-to-b from-purple-950/70 via-purple-900/60 to-indigo-950/70
    backdrop-blur-2xl border-r border-white/10 shadow-2xl">

      <div className="px-6 mb-8">
        <h2 className="text-2xl font-bold text-purple-200">Painel</h2>
      </div>

      <nav className="flex flex-col gap-2 px-4">
        {items.map((item) => (
          <button
            key={item}
            onClick={() => setPage(item)}
            className="px-4 py-3 rounded-xl text-purple-200 text-left hover:bg-white/10"
          >
            {item}
          </button>
        ))}
      </nav>
    </aside>
  );
}