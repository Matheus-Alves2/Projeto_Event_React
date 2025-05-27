import "./Lista.css";
import Lixo from "../../assets/img/Lixo_Branco.png";
import Caneta from "../../assets/img/caneta.png";

// Componente Lista que recebe dados e funções via props para mostrar uma tabela
const Lista = (props) => {
  return (
    <section className="listagem">
      {/* Título da lista vindo das props */}
      <h1>{props.tituloLista}</h1>
      <hr />

      <table className="tabela">
        <thead>
          <tr className="tabela_cabecalho">
            {/* Cabeçalho da tabela */}
            <th>Título</th>
            {/* Coluna Gênero pode ser escondida usando estilo via props */}
            <th style={{ display: props.visibilidade }}>Gênero</th>
            <th>Editar</th>
            <th>Deletar</th>
          </tr>
        </thead>
        <tbody>
          {/* Verifica se tem itens na lista para mostrar */}
          {props.lista && props.lista.length > 0 ? (
            // Mapeia cada item para uma linha da tabela
            props.lista.map((item) => (
              <tr className="item_lista" key={item[props.chaveId]}>
                {/* Mostra o nome do item */}
                <td data-cell="Nome">{item[props.chaveNome]}</td>

                {/* Mostra o gênero, pode ser ocultado conforme visibilidade */}
                <td data-cell="Genero" style={{ display: props.visibilidade }}>
                  {item.genero?.nome || "-"}
                </td>

                {/* Ícone para editar, chama a função passada por props */}
                <td>
                  <img
                    className="icone_lista" src={Caneta} alt="ícone de editar" style={{ cursor: "pointer" }}
                    onClick={() => props.funcEditar(item)}
                  />
                </td>

                {/* Ícone para excluir, chama a função passada por props */}
                <td>
                  <img
                    className="icone_lista" src={Lixo} alt="ícone de excluir" style={{ cursor: "pointer" }}
                    onClick={() => props.funcExcluir(item[props.chaveId])}
                  />
                </td>
              </tr>
            ))
          ) : (
            // Caso a lista esteja vazia, mostra essa mensagem
            <tr>
              <td colSpan={4}>Nenhum item encontrado.</td>
            </tr>
          )}
        </tbody>
      </table>
    </section>
  );
};

export default Lista;
