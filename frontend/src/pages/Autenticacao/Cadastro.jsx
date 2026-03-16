import logo from "../../assets/midislogoE.png"
function Cadastro() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-purple-700 pt-24">
      <div className="bg-white shadow-xl rounded-xl p-10 w-full max-w-md flex flex-col items-center">

        <img src={logo} className="h-20 mb-4" alt="logo" />

        <h2 className="text-2xl font-bold text-purple-700 mb-6">
          Criar Conta
        </h2>

        <form className="w-full flex flex-col gap-4">

          <div className="flex flex-col">
            <label className="text-purple-700 font-medium mb-1">
              Nome Completo
            </label>

            <input
              type="text"
              placeholder="Seu nome"
              className="border border-purple-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-purple-700 font-medium mb-1">
              Email
            </label>

            <input
              type="email"
              placeholder="seuemail@gmail.com"
              className="border border-purple-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-purple-700 font-medium mb-1">
              Senha
            </label>

            <input
              type="password"
              placeholder="••••••••"
              className="border border-purple-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

         

          <button
            type="submit"
            className="bg-amber-400 text-purple-900 font-semibold py-2 rounded-lg shadow-md hover:bg-amber-500 transition duration-300 mt-2"
          >
            Criar Conta
          </button>

        </form>

        <p className="mt-6 text-purple-700 text-sm">
          Já possui uma conta?
          <a href="#" className="text-amber-500 font-semibold hover:text-amber-600">
             Entrar
          </a>
        </p>

      </div>
    </div>
  )
}

export default Cadastro