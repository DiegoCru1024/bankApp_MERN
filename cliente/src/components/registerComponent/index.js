import React, {useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {Helmet} from "react-helmet";
import axios from "axios";
import logo from '../img/logo.png'
import './registerStyle.css'

export default function RegisterPage() {
    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    })

    const [error, setError] = useState("");
    const navigate = useNavigate();

    const detectarCambios = ({currentTarget: input}) => {
        setData({...data, [input.name]: [input.value]})
    }

    const enviarDatos = async (e) => {
        e.preventDefault();
        try {
            const url = 'IP/registerAPI';
            const {data: res} = await axios.post(url, data);
            navigate("/userLogin");
            console.log(res.message);
        } catch (error) {
            if (
                error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
            ) {
                setError(error.response.data.message);
            }
        }
    };

    return (
        <body>
        <Helmet>
            <title>BCF | Registro</title>
        </Helmet>
        <section className="main-container">
            <div className="left-banner">
                <img src={logo} alt="Logo"></img>
                <h2>Bienvenido a nuestra plataforma de Banca en Línea</h2>
                <p>Por favor registre una nueva cuenta para poder utilizar nuestra plataforma...</p>

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