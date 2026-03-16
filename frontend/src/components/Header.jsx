import logo from "../assets/midislogoE.png"
function Header() {
  return (
    <header className="fixed top-0 left-0 w-full bg-purple-50 shadow-md text-purple-600 z-50">
      <nav className="flex justify-between items-center px-8 py-4">

        <div className="flex items-center gap-3">
          <img src={logo} className="h-20" />
          <h1 className="text-2xl font-bold">Me Despache</h1>
        </div>

        <ul className="flex gap-6">
          <li>
            <a href="/" className="hover:text-amber-400">Home</a>
          </li>

          <li>
            <a href="#" className="hover:text-amber-400">Sobre</a>
          </li>

          <li>
            <a href="#" className="hover:text-amber-400">Contato</a>
          </li>

          <li>
            <a href="/login" className="hover:text-amber-400 font-semibold">
              Login
            </a>
          </li>
        </ul>

      </nav>
    </header>
  )
}

export default Header