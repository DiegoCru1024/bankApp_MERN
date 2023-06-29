import React, {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import Header from "./headerComponent"
import axios from "axios"
import './css/projectStyles.css'
import {API_URL} from "../config"

export default function CreateAccountPage() {
    // Estado para almacenar el mensaje de respuesta
    const [resMessage, setResMessage] = useState({message: ''})

    // Obtiene los datos almacenados en el localStorage
    const storedModel = localStorage.getItem('studentData')
    const parsedModel = JSON.parse(storedModel)

    // Estado para almacenar los datos del formulario
    const [data, setData] = useState({
        ownerFirstName: parsedModel.firstName,
        ownerLastName: parsedModel.lastName,
        ownerUserID: parsedModel.studentCode,
        accountName: '',
        accountID: '',
        accountBalance: '100.0',
        accountCurrencyType: 'PEN'
    })

    // Estado para habilitar o deshabilitar el botón
    const [isButtonDisabled, setButtonDisabled] = useState(false)

    // Hook de navegación
    const navigate = useNavigate()

    // Hook de efecto para verificar el token al cargar el componente
    useEffect(() => {
        // Verifica si hay un JWT en el almacenamiento
        const jwtToken = localStorage.getItem('token')

        if (!jwtToken) {
            navigate('/')
        }
    }, [navigate])

    // Función para detectar el cambio en los campos del formulario
    const detectarCambio = (event) => {
        const {name, value} = event.target
        setData(prevState => ({
            ...prevState, [name]: value
        }))
    }

    // Función para enviar los datos del formulario
    const enviarDatos = async (e) => {
        e.preventDefault()
        try {
            setButtonDisabled(true)
            const url = `${API_URL}/operationsAPI/createAccount`
            const {data: res} = await axios.post(url, data)
            alert('Su cuenta ha sido creada con exito... \nSerá redirigido a la página principal...')
            navigate('/auth/platform')
            console.log(res.message)
        } catch (error) {
            setButtonDisabled(false)
            setResMessage({message: error.response.data.message})
        }
    }

    return (
        <main>
            <Header/>
            <div className="create-account-main-container">
                <div className="create-account-menu">
                    <h1>Creación de Cuenta de Ahorros</h1>
                    <form className="create-account-form" onSubmit={enviarDatos}>
                        <p>Ingrese un nombre para su cuenta de ahorros:</p>
                        <input type="text" placeholder="Nombre distintivo de cuenta" onChange={detectarCambio} required
                               value={data.accountName} name="accountName"></input><br></br>
                        <p>Seleccione el tipo de divisa:</p>
                        <div className="radio-button">
                            <input type="radio" id="option1" name="accountCurrencyType" value="PEN"
                                   onChange={detectarCambio}></input>
                            <label htmlFor="option1">S/. Soles</label>
                        </div>
                        <div className="radio-button">
                            <input type="radio" id="option2" name="accountCurrencyType" value="USD"
                                   onChange={detectarCambio}></input>
                            <label htmlFor="option2">$ Dolares</label>
                        </div>

                        <button className="main-button-style" type="submit" disabled={isButtonDisabled}>Crear Cuenta
                        </button>
                    </form>

                    {resMessage.message && <div className="error-message">{resMessage.message}</div>}
                </div>
            </div>
        </main>
    )
}

