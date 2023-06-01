import {useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import logo from './img/logo.png'
import './css/projectStyles.css'

export default function LoginPage() {
    const [isButtonDisabled, setButtonDisabled] = useState(false);
    const [data, setData] = useState({email: '', password: ''})
    const [resMessage, setResMessage] = useState({message: ''})
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
            setButtonDisabled(true)
            const url = 'https://bankapp-backend.onrender.com/loginAPI'
            const {data: res} = await axios.post(url, data)
            localStorage.setItem("token", res.data)
            localStorage.setItem('studentData', JSON.stringify(res.model))
            navigate("/auth/platform");
        } catch (error) {
            setButtonDisabled(false)
            setResMessage({message: 'Correo o contraseña inválidos...'})
        }
    };

    return (
        <body>
        <section className="login-main-container">
            <div className="login-left-banner">
                <img src={logo} alt="Logo"></img>
                <h2>Bienvenido a nuestra plataforma de Banca en Línea</h2>
                <p>Por favor inicie sesión para continuar...</p>

            </div>

            <div className="login-right-banner">
                <div className="login-form-container">
                    <h2>Ingrese sus datos para continuar:</h2><br></br>
                    <div>
                        <form onSubmit={enviarDatos}>
                            <input type="email" placeholder="Correo electrónico" onChange={detectarCambio}
                                   required value={data.email} name="email"></input><br></br>
                            <input type="password" placeholder="Contraseña" onChange={detectarCambio} required
                                   value={data.password} name="password"></input><br></br>
                            <br></br>
                            <button type="submit" disabled={isButtonDisabled}>Iniciar Sesión</button>
                        </form>

                        {resMessage.message && <div className="login-error-message">{resMessage.message}</div>}
                    </div>
                    <p>¿Aún no tienes cuenta?</p>
                    <Link to="/userRegister" className="login-register-button">Registrate Aquí</Link>
                </div>
            </div>

            <div>
                <Link to="/" className="login-return-button">↶ Volver a la pagina principal</Link>
            </div>
        </section>
        </body>
    );
}