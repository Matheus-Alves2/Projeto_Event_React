import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContexts'; // Certifique-se que isso existe e está correto

import Login from "../pages/login/Login";
import TipoEvento from "../pages/tipoEvento/TipoEvento";
import TipoUsuario from "../pages/tipoUsuario/TipoUsuario";
import ListaEventos from "../pages/listagemEvento/ListagemEvento";
import CadastroEventos from "../pages/cadastroEvento/CadastroEvento";
import Home from "../pages/home/Home";

// exemplo: import CadastroUsuario e Eventos
//import CadastroUsuario from "../pages/cadastroUsuario/CadastroUsuario";
//import Eventos from "../pages/eventos/Eventos";

const Privado = ({ tipoPermitido, Item }) => {
  const { usuario } = useAuth();

  if (!usuario) {
    return <Navigate to="/" />;
  }

  if (usuario.TipoUsuario !== tipoPermitido) {
    return <Navigate to="/" />;
  }

  return <Item />;
};

const Rotas = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/TipoEvento" element={<TipoEvento />} />
        <Route path="/TipoUsuario" element={<TipoUsuario />} />
        <Route path="/ListaEventos" element={<ListaEventos />} />
        <Route path="/CadastroEvento" element={<CadastroEventos />} />

        {/* Rotas privadas (corrigidas): */}
        <Route
          path="/CadastroEventos"
          element={<Privado tipoPermitido="admin" Item={CadastroEventos} />}
        />
        <Route
          path="/tipoEvento"
          element={<Privado tipoPermitido="admin" Item={TipoEvento} />}
        />
        <Route
          path="/CadastroTipoUsuario"
          element={<Privado tipoPermitido="admin" Item={TipoUsuario} />}
        />
        <Route
          path="/login"
          element={<Privado tipoPermitido="aluno" Item={ListaEventos} />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Rotas;
