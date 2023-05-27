import {useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import logo from '../img/logo.png'
import './loginStyle.css'


export default function LoginPage() {
    const [data, setData] = useState({email: '', password: ''})
    const navigate = useNavigate()

    const detectarCambio = (event) => {
        const {name, value} = event.target
        setData(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const enviarDatos = async (e) => {
        e.preventDefault();
        try {
            const url = 'http://192.168.18.27:5000/loginAPI';
            const {data: res} = await axios.post(url, data);
            localStorage.setItem("token", res.data)
            navigate("/auth/platform");
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <body>
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
                        <form onSubmit={enviarDatos}>
                            <input type="email" placeholder="Correo electrónico" onChange={detectarCambio}
                                   required value={data.email} name="email"></input><br></br>
                            <input type="password" placeholder="Contraseña" onChange={detectarCambio} required
                                   value={data.password} name="password"></input><br></br>
                            <br></br>
                            <button type="submit">Iniciar Sesión</button>
                        </form>
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