import "./Header.css"
import Logo from "../botao/Botao"
const Header = () =>{
    return(
        <header>
            <div className="layout_grid cabecalho">
                <Link to="/">
                    <img src={Logo} alt="logo do Event+" />
                </Link>
            <nav className="event_header">
                <Link className="link_header" to="/Filme">Home</Link>
                <Link className="link_header" to="/Genero">Eventos</Link>
                <Link className="link_header" to="/Genero">Usuarios</Link>
                <Link className="link_header" to="/Genero">Contatos</Link>
            </nav>  
            </div>
        </header>
    )
}

export default Header;