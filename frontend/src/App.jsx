import Header from "./components/Header"
import Footers from "./components/Footers"
import Cadastro from "./pages/Autenticacao/Cadastro"


function App() {
  return (
    <>
      <Header />

      <div>
        <Cadastro />
      </div>

       <Footers />
    </>
    
  )
}

export default App