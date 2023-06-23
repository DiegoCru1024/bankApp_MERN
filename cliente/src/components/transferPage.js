import React, {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import Header from "./headerComponent"
import axios from "axios"
import './css/projectStyles.css'
import {API_URL} from "../config"

export default function TransferPage() {
    // Obtener el modelo almacenado en el localStorage y parsearlo
    const storedModel = localStorage.getItem('studentData')
    const parsedModel = JSON.parse(storedModel)

    // Estado para almacenar los datos de transferencia
    const [data, setData] = useState({
        accountOriginID: '', accountDestinyID: '', transferValue: '',
    })

    // Estado para almacenar las cuentas disponibles
    const [accounts, setAccounts] = useState([])

    // Estado para almacenar el mensaje de respuesta
    const [resMessage, setResMessage] = useState({message: ''})

    // Estado para deshabilitar el botón de envío
    const [isButtonDisabled, setButtonDisabled] = useState(false)

    // Hook de navegación
    const navigate = useNavigate()

    useEffect(() => {
        // Verifica si hay un JWT en el almacenamiento
        const jwtToken = localStorage.getItem('token')

        if (!jwtToken) {
            navigate('/')
        }

        // Función para buscar las cuentas de transferencia
        const searchAccountsTransfer = async () => {
            try {
                const url = `${API_URL}/operationsAPI/getAccounts`
                const response = await axios.get(url, {
                    params: {
                        studentCode: parsedModel.studentCode
                    }
                })
                setAccounts(response.data)
            } catch (error) {
                console.error(error)
            }
        }

        // Realizar la búsqueda de las cuentas de transferencia
        searchAccountsTransfer()
            .then(() => {
                console.log('Datos recibidos...')
            })
            .catch((error) => {
                console.log(error)
            })
    }, [navigate, parsedModel.studentCode])

    // Función para detectar el cambio en los campos de entrada
    const detectarCambio = (event) => {
        const {name, value} = event.target
        setData(prevState => ({
            ...prevState, [name]: value
        }))
    }

    // Función para enviar los datos de transferencia
    const enviarDatos = async (e) => {
        e.preventDefault()
        try {
            setButtonDisabled(true)
            const url = `${API_URL}/operationsAPI/transferMoney`
            const response = await axios.post(url, data)

            if (response.status === 201) {
                const movementData = {
                    accountOriginID: data.accountOriginID,
                    accountDestinyID: data.accountDestinyID,
                    movementValue: data.transferValue,
                    movementType: 'Transferencia',
                    movementDate: new Date().toISOString()
                }

                const url = `${API_URL}/operationsAPI/saveMovementInfo`
                const response = await axios.post(url, movementData)
                console.log(response)
            }

            navigate("/auth/platform")
        } catch (error) {
            setResMessage({message: error.response.data.message})
            setButtonDisabled(false)
        }
    }

    return (
        <main>
            <Header/>
            <div className="create-account-main-container">
                <div className="create-account-menu">
                    <h1>Transferencia de Dinero</h1>
                    <form className="create-account-form" onSubmit={enviarDatos}>
                        <p>Seleccione la cuenta de origen:</p>
                        <select className="combobox" title="origin" name="accountOriginID" onChange={detectarCambio}>
                            <option value="">-- Elija una opción --</option>
                            {accounts.map((account) => (<option key={account.accountID}
                                                                value={account.accountID}>{account.accountName + " - " + account.accountCurrencyType + " " + account.accountBalance}</option>))}
                        </select>

                        <p>Ingrese el ID de la cuenta de destino:</p>
                        <input type="text" placeholder="Cuenta Destino ID" onChange={detectarCambio} required
                               value={data.accountDestinyID} name="accountDestinyID"></input><br></br>

                        <p>Ingrese el monto a transferir:</p>
                        <input type="text" placeholder="Monto a transferir" onChange={detectarCambio} required
                               value={data.transferValue} name="transferValue"></input><br></br>

                        <button className="main-button-style" type="submit" disabled={isButtonDisabled}>Enviar
                        </button>
                    </form>

                    {resMessage.message && <div className="error-message">{resMessage.message}</div>}
                </div>
            </div>
        </main>
    )
}

