import "./Login.css";
import Logo from "../../assets/img/logo1.svg";
import Botao from "../../components/botao/Botao";

const Login = () => {
    return (
        <main className="login-container">
            <link rel="stylesheet" href="https://use.typekit.net/pam4ubo.css"></link>
            <div className="login-banner"></div>
            <section className="login-content">
                <img className="login-logo" src={Logo} alt="Event+" />

                <form action="" className="login-form">
                    <div className="login-fields">

                        <div className="login-input">
                            <input type="email" placeholder="Username" />
                        </div>

                        <div className="login-input">
                            <input type="password" placeholder="Password" />
                        </div>

                        <p className="login-forgot-password">Esqueceu a senha?</p>
                    </div>

                    <Botao nomeDoBotao="Login" />
                </form>
            </section>
        </main>
    );
};
export default Login;