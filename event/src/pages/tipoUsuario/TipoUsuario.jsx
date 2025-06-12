import Header from "../../components/header/Header"
import Cadastro from "../../components/cadastro/Cadastro"
import Lista from "../../components/lista/Lista"
import Footer from "../../components/footer/Footer"
import Banner from "../../assets/bannerTipoUsuario.png"
import api from "../../Services/services"
import Swal from 'sweetalert2'
import { useEffect, useState } from "react";

const TipoUsuario = () => {

    const[tipoUsuario, setTipoUsario] = useState ("")
    const[listaTiposUsuarios, setListaTiposUsuarios] = useState([]);


     function alertar(icone, mensagem) {
            const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                }
            });
            Toast.fire({
                icon: icone,
                title: mensagem
            });
        }
    
        
    async function cadastrarTipoEvento(e){
        e.preventDefault();
        //Verificar se o input esta sendo cadastrado vazio
        if (tipoUsuario.trim() != "") {
            //try => tentar 
            //catch => lanca a excesao
        try{
            await api.post("tiposUsuarios", {tituloTipoUsuario: tipoUsuario});
            setTipoUsario("");
            await listarTiposUsuarios();

            let timerInterval;
                Swal.fire({ 
                title: "Cadastrando Titulo !",
                html: "Demora apenas... <b></b> milliseconds.",
                timer: 2000,
                timerProgressBar: true,
                didOpen: () => {
                    Swal.showLoading();
                    const timer = Swal.getPopup().querySelector("b");
                    timerInterval = setInterval(() => {
                    timer.textContent = `${Swal.getTimerLeft()}`;
                    }, 100);
                },
                willClose: () => {
                    clearInterval(timerInterval);
                }
                }).then((result) => {
                /* Read more about handling dismissals below */
                if (result.dismiss === Swal.DismissReason.timer) {
                    console.log("I was closed by the timer");
                }
                });
            
            
        }catch(error){
            alertar("error", "Entre em contato com o suporte :(")
        }

        }else{
            alertar("error", "O campo esta vazio :(")
        }

    }

   async function listarTiposUsuarios(){
    try {
        const resposta = await api.get("tiposUsuarios");
        setListaTiposUsuarios(resposta.data);
    } catch (error) {
        console.log(error);
    }
}

    useEffect(() => {
        listarTiposUsuarios();

    }, []);

    async function deletarTipoUsuario(id) {
        try {
            const result = await Swal.fire({
            title: 'Tem certeza?',
            text: "Essa ação não poderá ser desfeita!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sim, apagar!',
            cancelButtonText: 'Cancelar',
        });

        if (result.isConfirmed) {
            console.log("Deletando ID:", id); // Ajuda a depurar
            await api.delete(`tiposUsuarios/${id.idTipoUsuario}`);
            listarTiposUsuarios();
            alertar("success", "Tipo de evento excluído!");
        }
        } catch (error) {
            console.error("Erro ao excluir:");
            alertar("error", "Erro ao excluir tipo de evento. Veja o console.");
        }
    }

        async function editarTipoUsuario(tipoUsuario) {
            const { value: novoTipoUsuario } = await Swal.fire({
                title: "Edite seu tipo de usuário",
                input: "text",
                inputLabel: "Novo Tipo de Usuário",
                inputValue: tipoUsuario.tituloTipoUsuario,
                showCancelButton: true,
                inputValidator: (value) => {
                if (!value) {
                    return "O campo não pode estar vazio";
                }
                },
            });

            if (novoTipoUsuario) {
                try {
                await api.put(`tiposUsuarios/${tipoUsuario.idTipoUsuario}`, {
                    tituloTipoUsuario: novoTipoUsuario,
                });
                Swal.fire(`O tipo de usuário foi modificado para ${novoTipoUsuario}`);
                listarTiposUsuarios();  
                } catch (error) {
                console.error("Erro ao editar tipo de usuário:", error);
                alertar("error", "Erro ao editar. Veja o console.");
                }
            }
        }

    return(

        <>
        <Header 
        nomeUsuario = "Administrador"
        botaozinho = "none"
        />
        <main>
            <Cadastro 
                tituloCadastro="CADASTRO TIPO DE USUÁRIO"
                namePlace="Titulo"
                visibilidade="none"
                Inst="none"
                desc="none"
                data="none"
                imagem= {Banner}
                funcCadastro={cadastrarTipoEvento}
                ValorInput={tipoUsuario}
                setValorInput={setTipoUsario}
            />
            <Lista
            tituloEvento="Titulo"
            Descrição="none"
            tituloPagina="LISTA TIPO DE USUÁRIO"
            visibilidade="none"
            visibol="none"
            visi="none"
            funcDescricao="none"
            lista={listaTiposUsuarios}
            funcDeletar={deletarTipoUsuario}
            funcEditar={editarTipoUsuario}
            />
            
        </main>
        <Footer />
    </>
    
    )
}

export default TipoUsuario