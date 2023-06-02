import {useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import logo from './img/logo.png'
import './css/projectStyles.css'

export default function RegisterPage() {
    const [data, setData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        number: '',
        studentCode: '',
        isAdmin: false
    })

    const [isButtonDisabled, setButtonDisabled] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

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
            const url = 'https://bankapp-backend.onrender.com/registerAPI';
            const {data: res} = await axios.post(url, data);
            navigate("/userLogin");
            console.log(res.body.message)
        } catch (error) {
            setButtonDisabled(false)
            console.log(error.response.data)
            if (error.response && error.response.status >= 400 && error.response.status <= 500) {
                setError(error.response.data.message);
            }
        }
    };

    return (

        <section className="login-main-container">
            <div className="login-left-banner">
                <img src={logo} alt="Logo"></img>
                <h2>Bienvenido a nuestra plataforma de Banca en Línea</h2>
                <p>Por favor registre una nueva cuenta para poder utilizar nuestra plataforma...</p>

            </div>

            <div className="login-right-banner">
                <div className="login-form-container">
                    <h2>Ingrese sus datos para registrarse:</h2><br></br>
                    <div>
                        <form onSubmit={enviarDatos}>
                            <input type="text" placeholder="Nombre" onChange={detectarCambio} required
                                   value={data.firstName} name="firstName"></input><br></br>
                            <input type="text" placeholder="Apellido" onChange={detectarCambio}
                                   required value={data.lastName} name="lastName"></input><br></br>
                            <input type="email" placeholder="Correo electrónico" onChange={detectarCambio}
                                   required value={data.email} name="email"></input><br></br>
                            <input type="password" placeholder="Contraseña" onChange={detectarCambio} required
                                   value={data.password} name="password"></input><br></br>
                            <input type="number" placeholder="Teléfono" onChange={detectarCambio} required
                                   value={data.number} name="number"></input><br></br>
                            <input type="number" placeholder="Código de Estudiante" onChange={detectarCambio} required
                                   value={data.studentCode} name="studentCode"></input><br></br>
                            {error && <div>{error}</div>}
                            <br></br>
                            <button className="main-button-style" type="submit" disabled={isButtonDisabled}>Registrarse</button>
                        </form>
                    </div>
                    <p>¿Ya estas registrado?</p>
                    <Link to="/userLogin" className="login-register-button">Inicia sesión aquí</Link>
                </div>
            </div>

            <div>
                <Link to="/" className="login-return-button">↶ Volver a la pagina principal</Link>
            </div>
        </section>
    );
}