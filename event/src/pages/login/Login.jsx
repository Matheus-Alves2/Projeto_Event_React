import "./Login.css";
import LogoEvent from "../../assets/logoEvent.svg"
import Logo from "../../assets/logo.png"
import Botao from "../../components/botao/Botao";
import api from "../../Services/services";
import { useState } from "react";
import { userDecodeToken } from "../../auth/Auth";
import secureLocalStorage from "react-secure-storage";
import { Navigate,useNavigate } from "react-router-dom";
const Login = () =>{
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const navigate = useNavigate

async function realizarAutenticacao(){
    
    
    const usuario = {
        email: email,
        senha: senha
    }
    
    if(senha.trim() != "" || email.trim() != ""){
   try {
    const resposta = await api.post("Login", usuario);
    const token = resposta.data.token;
       await api.post("Login",usuario)

       if(token){
            //token sera decodificado:
            const tokenDecodificado = userDecodeToken(token);
            secureLocalStorage.setItem ("tokenLogin", JSON. stringify(tokenDecodificado));

            if(tokenDecodificado.tipoUsuario === "aluno"){
                navigate("/Eventos")
            }else{
                navigate("/CadastroEventos")
            }
       }
    
   } catch (error) {
    
       console.log(error);     
       alert("E-mail ou senha invalido, para duvidas por favor entre em contato com o suporte")
   }
    }else{
        alert(" ");
    }
}

    return (
        <main className="main_login">
            <div className="logoBanner"> 
                <img src={Logo} alt="" />

            </div>
            <form action=""className="formularLogin" onSubmit={realizarAutenticacao}>
                <img src="" alt="logo_img" />
            </form>
            <section className="section_login">

                <form action="" className="form_cadastro">
                <img src= {LogoEvent} alt="Logo do event+" />
                
                <div className="campos_login">

                <div className="campo_input">
                <input type="email" name="email"
                placeholder="E-mail"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}/> 
                </div>

                <div className="campo_input">
                    <input type="nome" name="nome" placeholder="Password" />
                </div>
                </div>
                <a href="">Esqueceu a senha?</a>
                <Botao nomeDoBotao = "Login"/>
                </form>
                
            </section>
        </main>
    )
}

export default Login;