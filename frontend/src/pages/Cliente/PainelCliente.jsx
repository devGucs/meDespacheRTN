function PainelCliente() {

  const usuario = JSON.parse(localStorage.getItem("usuario"));

  return (
    <div>
      <h1>Olá, {usuario?.nome || "Usuário"}</h1>
    </div>
  );
}

export default PainelCliente;