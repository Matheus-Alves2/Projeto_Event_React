import "./Login.css";
import LogoEvent from "../../assets/logoEvent.svg";
import Logo from "../../assets/logo.png";
import Botao from "../../components/botao/Botao";
import api from "../../Services/services";
import { useState } from "react";
import secureLocalStorage from "react-secure-storage";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContexts";
import {userDecodeToken} from "../../auth/Auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();
  const { setUsuario } = useAuth(); 

  async function realizarAutenticacao(e) {
    e.preventDefault();

    const dadosUsuario = {
      email: email,
      senha: senha,
    };

    if (email.trim() !== "" && senha.trim() !== "") {
      try {
        const resposta = await api.post("Login", dadosUsuario);
        const token = resposta.data.token;

        if (token) {
          const usuarioDecodificado = userDecodeToken(token);
          
          secureLocalStorage.setItem("tokenLogin", JSON.stringify(token));
          setUsuario(usuarioDecodificado);

          if (usuarioDecodificado.tipoUsuario === "aluno") {
            navigate("/Eventos");
          } else {
            navigate("/CadastroEventos");
          }
        }
      } catch (error) {
        console.log(error);
        alert("E-mail ou senha inválido. Para dúvidas, entre em contato com o suporte.");
      }
    } else {
      alert("Preencha todos os campos.");
    }
  }

  return (
    <main className="main_login">
      <div className="logoBanner">
        <img src={Logo} alt="Logo" />
      </div>

      <section className="section_login">
        <form className="form_cadastro" onSubmit={realizarAutenticacao}>
          <img src={LogoEvent} alt="Logo do event+" />

          <div className="campos_login">
            <div className="campo_input">
              <input
                type="email"
                name="email"
                placeholder="E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="campo_input">
              <input
                type="password"
                name="senha"
                placeholder="Senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              />
            </div>
          </div>

          <a href="#">Esqueceu a senha?</a>
          <Botao nomeDoBotao="Login" />
        </form>
      </section>
    </main>
  );
};

export default Login;