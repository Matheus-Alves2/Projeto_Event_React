import "./Header.css"
import Logo from "../../assets/logoEvent.svg"
import Logo_adm from "../../assets/Vector.png"
import { Link } from "react-router-dom";

const Header = (props) => {
    return (

        <header>
            <div className="layout_grid cabecalho">
                <img src={Logo} alt="Logo Evento" />
                <nav className="nav_header">
                    {/* <Link className="link"></Link>
                    <a href="" className="link_header">Home</a>
                    <a href="" className="link_header">Eventos</a>
                    <a href="" className="link_header">Usuários</a>
                    <a href="" className="link_header">Contatos</a> */}

                <Link className="link_header" to="/">Home</Link>
                    <Link className="link_header" to="/TipoEvento">Eventos</Link>
                    <Link className="link_header" to="/Tipousuario" style={{display:props.Usuario}} >Usuários</Link>
                    <Link className="link_header" to="/ListaEventos">Contatos</Link>
                    {/* <Link className="link_header" to="/cadastroEvento">cadastro</Link> */}

                    <Link to="/Login"><button className="logar" style={{display:props.botaozinho}}>Logar</button></Link>
                </nav>
                <nav className="Adm"  style={{display:props.naver}}>
                    <Link className="link_header" to="/cadastroEvento">{props.nomeUsuario}</Link>
                    <img src={Logo_adm} alt="Vetor"/>
                </nav>
                

            </div>
        </header>

    )
}

export default Header;