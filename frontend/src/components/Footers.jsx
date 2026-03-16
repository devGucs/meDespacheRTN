import logo from "../assets/midislogoE.png"
function Footers() {
  return (
    <footer className="w-full bg-[#0b0b0f] text-white py-6 px-10 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <img src={logo} className="h-12" />
        <span className="text-xl font-semibold">Me Despache</span>
      </div>

      <p className="text-sm opacity-80">
        © 2025 Me Despache — Todos os direitos reservados.
      </p>
    </footer>
  )
}

export default Footers
//<img src={logo} className="h-20 mb-4" alt="logo" />