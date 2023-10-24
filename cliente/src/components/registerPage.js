import {useState} from 'react'
import {Link, useNavigate} from "react-router-dom"
import axios from "axios"
import logo from './img/logo.png'
import './css/projectStyles.css'
import {API_URL} from "../config"

export default function RegisterPage() {
    // Estado para almacenar los datos del formulario de registro
    const [data, setData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        number: '',
        studentCode: '',
        isAdmin: false
    })

    // Estado para deshabilitar el botón de envío
    const [buttonDisabled, setButtonDisabled] = useState(false)

    // Estado para almacenar el mensaje de error
    const [error, setError] = useState("")

    // Hook de navegación
    const navigate = useNavigate()

    // Función para detectar el cambio en los campos de entrada
    const detectarCambio = (event) => {
        const {name, value} = event.target
        setData(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    // Función para enviar los datos del formulario
    const enviarDatos = async (e) => {
        e.preventDefault()
        try {
            setButtonDisabled(true)
            const url = `${API_URL}/registerAPI`
            const response = await axios.post(url, data)
            console.log(response)
            navigate("/userLogin")
        } catch (error) {
            setButtonDisabled(false)
            setError(error.response.data.message)
            console.log(error)
        }
    }


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
                            {error && <div className='error-message'>{error}</div>}
                            <br></br>
                            <button className="main-button-style" type="submit"
                                    disabled={buttonDisabled}>Registrarse
                            </button>
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
    )
}