import Logo from "../../assets/img/logo1.png"
const Login = () => {
    return (
        <main className="event_login">
            <div className="banner"></div>
            <section className="login_section">
                <img src={Logo} alt="Logo do Event" />
                <form action="" className="login_form">
                    <h1>Login</h1>

                    <div className="login_event"></div>
                    <div className="campo_login"></div>
                    <label htmlFor="Email"></label>
                    <input type="Email" />
                    <div className="campo_input"></div>
                    <label htmlFor="">Senha</label>
                    <input type="passworld" />
                </form>
            </section>
        </main>
    )
}