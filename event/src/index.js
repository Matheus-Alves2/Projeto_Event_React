import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthProvider } from './contexts/AuthContexts';
// import Rotas from "../src/routes/routes"
// import ListagemEvento from "../src/pages/listagemEvento/ListagemEvento"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

 // <React.StrictMode>
 <AuthProvider>
    <>
      <App/>
    </>
 </AuthProvider>
//</React.StrictMode>
);

