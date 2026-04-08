import logo from "../../assets/midislogoE.png";


function CadEmpresa() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-purple-700 pt-24">
      <div className="bg-white shadow-xl rounded-xl p-10 w-full max-w-lg flex flex-col items-center">

        <img src={logo} className="h-20 mb-4" alt="logo" />

        <h2 className="text-2xl font-bold text-purple-700 mb-6">
          Cadastro da Empresa
        </h2>

        <form className="w-full flex flex-col gap-4">

          <div className="flex flex-col">
            <label className="text-purple-700 font-medium mb-1">
              Nome da Empresa
            </label>
            <input
              type="text"
              placeholder="Ex: Padaria Central"
              className="border border-purple-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-purple-700 font-medium mb-1">
              CNPJ
            </label>
            <input
              type="text"
              placeholder="00.000.000/0000-00"
              className="border border-purple-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-purple-700 font-medium mb-1">
              Ramo de Negócio
            </label>
            <select className="border border-purple-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500">
              <option>Selecione...</option>
              <option>Alimentação</option>
              <option>Vestuário</option>
              <option>Mercado / Mini Mercado</option>
              <option>Serviços</option>
              <option>Beleza / Cosméticos</option>
              <option>Saúde</option>
              <option>Eletrônicos</option>
              <option>Outro</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label className="text-purple-700 font-medium mb-1">
              Telefone
            </label>
            <input
              type="text"
              placeholder="(00) 00000-0000"
              className="border border-purple-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-purple-700 font-medium mb-1">
              Email Comercial
            </label>
            <input
              type="email"
              placeholder="empresa@gmail.com"
              className="border border-purple-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div className="flex gap-4">
            <div className="flex flex-col w-1/2">
              <label className="text-purple-700 font-medium mb-1">
                Cidade
              </label>
              <input
                type="text"
                placeholder="Cidade"
                className="border border-purple-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div className="flex flex-col w-1/2">
              <label className="text-purple-700 font-medium mb-1">
                Estado
              </label>
              <input
                type="text"
                placeholder="UF"
                maxLength="2"
                className="border border-purple-300 rounded-lg px-4 py-2 uppercase focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          <button
            type="submit"
            className="bg-amber-400 text-purple-900 font-semibold py-2 rounded-lg shadow-md hover:bg-amber-500 transition duration-300 mt-2"
          >
            Cadastrar Empresa
          </button>

        </form>

        <p className="mt-6 text-purple-700 text-sm">
          Já possui conta empresarial?
          <a href="#" className="text-amber-500 font-semibold hover:text-amber-600">
            Entrar
          </a>
        </p>

      </div>
    </div>
  );
}

export default CadEmpresa;