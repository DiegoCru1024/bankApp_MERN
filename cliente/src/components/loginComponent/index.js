import React, {Component} from 'react';
import {Helmet} from "react-helmet";
import logo from '../img/logo.png'
import './loginStyle.css'
import {Link} from "react-router-dom";

class LoginPage extends Component {
    render() {
        return (
            <body>
            <Helmet>
                <title>BCF | Iniciar Sesion</title>
            </Helmet>
            <section className="main-container">
                <div className="left-banner">
                    <img src={logo} alt="Logo"></img>
                    <h2>Bienvenido a nuestra plataforma de Banca en Línea</h2>
                    <p>Por favor inicie sesión para continuar...</p>

                </div>

                <div className="right-banner">
                    <div className="login-container">
                        <h2>Ingrese sus datos para continuar:</h2><br></br>
                        <div>
                            <label htmlFor="username">Usuario:</label><br></br>
                            <input type="text" id="username" name="username"></input><br></br>
                            <br></br><br></br>
                            <label htmlFor="password">Contraseña:</label><br></br>
                            <input type="password" id="password" name="password"></input><br></br>
                            <br></br>
                            <button>Iniciar Sesión</button>
                        </div>
                        <p>¿Aún no tienes cuenta?</p>
                        <Link to="/userRegister" className="register-button">Registrate Aquí</Link>
                    </div>
                </div>

                <div>
                    <Link to="/" className="return-button">↶ Volver a la pagina principal</Link>
                </div>
            </section>
            </body>
        );
    }
}

export default LoginPage;