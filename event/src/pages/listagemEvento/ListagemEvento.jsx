import "./ListagemEvento.css"
import Header from "../../components/header/Header"
import Footer from "../../components/footer/Footer"
import Comentar from "../../assets/comentar.png"
import Checkin from "../../components/checkin/Checkin"
import Descricao from "../../assets/descricao2.png"
import api from "../../Services/services";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import Modal from "../../components/Modal/modal";

const ListagemEvento = () => {

    const usuarioId = localStorage.getItem('usuarioId');

    const [listaEvento, setListaEvento] = useState([]);
    const [tipoModal, setTipoModal] = useState("");
    const [dadosModal, setDadosModal] = useState({});
    const [modalAberto, setModalAberto] = useState(false);
    const [filtroData, setFiltroData] = useState(["todos"]);

  async function listarEventos() {
    try {
        const resposta = await api.get("Eventos");
        const respostaPresenca = await api.get("PresencaEventos/ListarMinhas/" + usuarioId);

        const todosOsEventos = resposta.data;
        const minhasPresencas = respostaPresenca.data;

        const eventosComPresencas = todosOsEventos.map((atualEvento) => {
            const presenca = minhasPresencas.find(p => p.idEvento === atualEvento.idEvento);

            return {
                ...atualEvento,
                possuiPresenca: presenca?.situacao === true,
                idPresenaca: presenca?.idPresencaEvento || null
            };
        });

        setListaEvento(eventosComPresencas);

        console.log(`Informações de todos os eventos:`);
        console.log(todosOsEventos);

        console.log(`Informações de eventos com presença:`);
        console.log(minhasPresencas);
        
    } catch (error) {
        console.log(error);
    }
}

 
    useEffect(() => {
        listarEventos();
    }, []);

    function abrirModal(tipo, dados) {
        setModalAberto(true);
        setTipoModal(tipo);
        setDadosModal(dados);
    }

    function fecharModal() {
        setModalAberto(false);
        setDadosModal({});
        setTipoModal("");
    }

    return (
        <>
            <Header
                nomeUsuario="Administrador"
                botaozinho="none"
            />
            <main>
                <section className="layout_grid listagem_evento">
                    <h1>Lista De Eventos</h1>
                    <hr />
                    <div className="tabela_evento">
                        <select onChange={(e) => setFiltroData([e.target.value])} name="Todos os Eventos" id="" className="select_evento">
                            <option value="" disabled selected>Todos os Eventos</option>
                            <option value="">op 1</option>
                            <option value="">op 2</option>
                            <option value="">op 3</option>
                        </select>
                        <table>
                            <thead>
                                <tr className="table_evento">
                                    <th>Titulo</th>
                                    <th>Data Do Evento</th>
                                    <th>Tipo Evento</th>
                                    <th>Descrição</th>
                                    <th>Comentários</th>
                                    <th>Participar</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listaEvento.length > 0 ? (
                                    listaEvento.map((item) => (
                                        <tr className="item_evento" key={item.idEvento}>
                                            <td>{item.nomeEvento}</td>
                                            <td>{format(new Date(item.dataEvento), "dd/MM/yy")}</td>
                                            <td>{item.tipoEvento.tituloTipoEvento}</td>
                                            <td>
                                                <button className="icon" onClick={() => abrirModal("descricaoEvento", { descricao: item.descricao })}>
                                                    <img src={Descricao} alt="Descrição" />
                                                </button>
                                            </td>
                                            <td>
                                                <button className="icon" onClick={() => abrirModal("comentarios", { idEvento: item.idEvento })}>
                                                    <img src={Comentar} alt="Comentar" />
                                                </button>
                                            </td>
                                            <td data-cell="Checkin">    
                                                <Checkin />
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colt="6">Nenhum evento encontrado</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </section>
            </main>
            <Footer />
            {modalAberto && (
                <Modal
                    titulo={tipoModal === "descricaoEvento" ? "Descrição do evento" : "Comentário"}
                    tipoModal={tipoModal}
                    idEvento={dadosModal.idEvento}
                    descricao={dadosModal.descricao}
                    fecharModal={fecharModal}
                />
            )}
        </>
    );
}

export default ListagemEvento;