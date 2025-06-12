import "./Lista.css";
import Editar from "../../assets/Editar.png";
import Excluir from "../../assets/Excluir.png";
import descricao from "../../assets/descricao1.png";
import { format } from "date-fns";

const Lista = (props) => {
    return (

        <section className=" listagem">
            <div className="titulo_organizando">
                <h1>{props.tituloPagina}    </h1>
                <hr className="linha_titulo" />
            </div>

            <div className="tabela">
                <table>
                    <thead>
                        <tr className="table_cabecalho">
                            <th>{props.tituloEvento}</th>
                            <th style={{display: props.visibilidade}}>Data Evento</th>
                            <th style={{display: props.visibilidade}}>Tipo Evento</th>
                            <th>Editar</th>
                            <th>Excluir</th>
                            <th style={{display: props.visibilidade}}>Descrição</th>
                        </tr>
                    </thead>

                    <tbody>
                        {props.lista && props.lista.length > 0 ? (
                            props.lista.map((item) => (
                            <tr className="item_lista" key={props.tipoLista == "tiposEventos" ? item.idTipoEvento : (props.tipoLista == "tipoUsuarios" ? item.idTipoUsuario: item.idEvento)}>
                                <td data-cell="Origem" style={{display: props.visibilidade}}>
                                {props.tipoLista == "tiposEventos" ? item.tituloTipoEvento : (props.tipoLista == "tipoUsuarios" ? item.tituloTipoUsuario: item.nomeEvento)}
                                </td>
                                <td data-cell="Data">
                                    {item.dataEvento ? format(item.dataEvento, "dd/MM/yyyy") : ""}
                                </td>
                                <td data-cell="Evento">{item.tiposEvento?.tituloTipoEvento}</td>
                                 <td data-cell="Editar">
                                        <img src={Editar} alt="Imagem de uma caneta" 
                                        onClick={() => { props.funcEditar(item) }} 
                                        style={{ cursor: "pointer" }} 
                                        />
                                    </td>
                                <td data-cell="Excluir">
                                <img
                                    src={Excluir} alt="Lixeira" onClick={() => props.funcDeletar(item)}  style={{ cursor: "pointer" }}
                                />
                                </td>
                                <td data-cell="Descrição" style={{display: props.visibilidade}}>
                                    <img src={descricao} alt="detalhes" onClick={() => props.funcDescricao(item)} style={{curser: "pointer"}}/>
                                </td>
                            </tr>
                            ))
                        ) : (
                            <p>{props.listagemGenFil}</p>
                        )}
                        </tbody>
                </table>
            </div>
        </section>

    );
};

export default Lista;
