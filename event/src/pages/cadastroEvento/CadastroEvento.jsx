import Header from "../../components/header/Header"
import Cadastro from "../../components/cadastro/Cadastro"
import Lista from "../../components/lista/Lista"
import Footer from "../../components/footer/Footer"
import Banner from "../../assets/bannerCadastroEvento.png"

const CadastroEvento = () => {
    return(

        <>
        <Header 
            nomeUsuario = "Administrador"
            botaozinho = "none"
        />
        <main>
            <Cadastro tituloCadastro="CADASTRO DE EVENTO"
                namePlace="Titulo"
                
                imagem= {Banner}
            />
            <Lista
            tituloPagina="LISTA DE EVENTOS"
            />
        </main>
        <Footer />
    </>
    
    )
}

export default CadastroEvento;