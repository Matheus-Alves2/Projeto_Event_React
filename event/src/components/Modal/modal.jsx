import './modal.css';
import ImgDeletar from "../../assets/Excluir.png";
import { useEffect, useState } from "react";
import api from "../../Services/services";
import Swal from 'sweetalert2';

const Modal = (props) => {
    const [comentarios, setComentarios] = useState([])
    const [novoComentario, setNovoComentario] = useState("")
    const [usuarioid, setUsuarioId] = useState()

    async function listarComentarios() {
        try {
            const resposta = await api.get(`comentariosEventos/ListatarSomenteExibe?id=${props.get}`);
            setComentarios(resposta.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        listarComentarios();
    }, []);

async function CadastrarComentario() {
        // Aqui vai o código para cadastrar comentário
        try {
            await api.post("ComentariosEventos",{
                idUsuario: usuarioId , 
                idEvento: props.idEvento,
                descricao: comentarios
            })
        } catch (error) {
            
        }
    }

    async function DeletarComentario() {
        
    }

    async function manipularPresenca(idEvento, presenca, idPresenca) {
    try {
        if (presenca && idPresenca != "") {
            // atualização: situação para false
            await api.put(`presencaEventos/${idPresenca}`, { situacao: false });
            Swal.fire('Removido', 'Sua presença foi removida.', 'success');
        } else if (idPresenca != "") {
            // autorização: situação true
            await api.put(`PresencaEventos/${idPresenca}`, { situacao: true });
            Swal.fire('Confirmado!', 'Sua presença foi confirmada.', 'success');
        } else {
            // cadastrar uma nova presença
            await api.post("PresencasEventos", { situacao: true, idUsuario: props.usuarioId, idEvento: idEvento });
            Swal.fire('Confirmado!', 'Sua presença foi confirmada.', 'success');
        }
    } catch (error) {
        console.log(error);
    }

    function filtrarEventos() {
        const hoje = new Date();

        return listarEventos.filter(evento => {
            const dataEvento = new Date(evento.dataEvento);

            if (filtroData.includes("todos")) return true;
            if (filtroData.includes("futuros") && dataEvento > hoje) return true;
            if (filtroData.includes("passados") && dataEvento < hoje) return true;

            return false;
        })
    }


}


    return (
        <>
            <div className="modal-overlay" onClick={props.fecharModal}></div>
            <div className="modal">
                <h1>{props.titulo}</h1>
                <div className="modal_conteudo">
                    {props.tipoModal === "descricaoEvento" ? (
                        <p>{props.descricao}</p>
                    ) : (
                        <>
                            {comentarios.map((item) => (
                                <div key={item.idComentarioEvento}>
                                    <strong>{item.usuario.nomeUsuario}</strong>
                                    <img src={ImgDeletar} alt="Deletar" />
                                    <p>{item.descricao}</p>
                                    <hr />
                                </div>
                            ))}
                            <div>
                                <input type="text" placeholder="Escreva seu comentário..." />
                                <button>Cadastrar</button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    )
}

export default Modal;