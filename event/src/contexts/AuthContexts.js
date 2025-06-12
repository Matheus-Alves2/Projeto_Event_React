// Importa funções do React necessárias para criar e usar contexto
import { createContext, useState, useContext } from "react";

// Cria o contexto de autenticação
const AuthContext = createContext();

// Componente que envolve a aplicação e fornece o contexto de autenticação
export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);

  return (
    <AuthContext.Provider value={{ usuario, setUsuario }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para acessar o contexto facilmente
export const useAuth = () => useContext(AuthContext);