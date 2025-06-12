import "./ListagemEvento.css";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import Comentar from "../../assets/comentar.png";
import Checkin from "../../components/checkin/Checkin";
import Descricao from "../../assets/descricao2.png";
import api from "../../Services/services";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import Modal from "../modal/Modal.jsx";
import { useAuth } from "../../contexts/AuthContexts";

const ListagemEvento = () => {
    const [listaEvento, setListaEvento] = useState([]);
    const { usuario } = useAuth(); // 

    async function listarEventos() {
        try {
            const resposta = await api.get("Eventos");
            setListaEvento(resposta.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        listarEventos();
    }, []);

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
                        <select name="eventos" className="select_evento">
                            <option value="" disabled selected>Todos os Eventos</option>
                            <option value="">Opção 1</option>
                            <option value="">Opção 2</option>
                            <option value="">Opção 3</option>
                        </select>

                        <table>
                            <thead>
                                <tr className="table_evento">
                                    <th>Título</th>
                                    <th>Data do Evento</th>
                                    <th>Tipo do Evento</th>
                                    <th>Descrição</th>
                                    <th>Comentários</th>
                                    <th>Participar</th>
                                </tr>
                            </thead>

                            <tbody>
                                {listaEvento.length > 0 ? (
                                    listaEvento.map((item, index) => (
                                        <tr className="item_evento" key={index}>
                                            <td>{item.nomeEvento}</td>
                                            <td>{format(new Date(item.dataEvento), "dd/MM/yy")}</td>
                                            <td>{item.tipoEvento.tituloTipoEvento}</td>
                                            <td>
                                                <button className="icon">
                                                    <img src={Descricao} alt="Ícone de descrição" />
                                                </button>
                                            </td>
                                            <td>
                                                <img src={Comentar} alt="Ícone de comentário" />
                                            </td>
                                            <td>
                                                <Checkin />
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" style={{ textAlign: "center" }}>
                                            Nenhum evento encontrado.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </section>
            </main>

            <Footer />
            <Modal />
        </>
    );
};

export default ListagemEvento;