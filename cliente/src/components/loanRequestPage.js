import React, {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import Header from "./headerComponent"
import './css/projectStyles.css'
import axios from "axios"
import {API_URL} from "../config"

export default function LoanRequestPage() {
    // Obtiene los datos almacenados en el localStorage
    const storedModel = localStorage.getItem('studentData')
    const parsedModel = JSON.parse(storedModel)

    // Estado para habilitar o deshabilitar el botón
    const [isButtonDisabled, setButtonDisabled] = useState(false)

    // Estado para almacenar las cuentas del usuario
    const [accounts, setAccounts] = useState([])

    // Estado para almacenar el mensaje de error
    const [error, setError] = useState("")

    // Estado para almacenar los datos de la solicitud de préstamo
    const [requestData, setRequestData] = useState({
        studentCode: parsedModel.studentCode,
        studentName: parsedModel.firstName + " " + parsedModel.lastName,
        loanValue: -1,
        loanCurrencyType: 'PEN',
        loanFeeRate: -1,
        loanJustification: '',
        loanRequestState: 'Pendiente',
        loanSubmitDate: Date.now(),
        destinyAccountID: -1
    })

    // Hook de navegación
    const navigate = useNavigate()

    // Hook de efecto para cargar las cuentas y verificar el token al cargar el componente
    useEffect(() => {
        // Verifica si hay un JWT en el almacenamiento
        const jwtToken = localStorage.getItem('token')

        if (!jwtToken) {
            navigate('/')
        }

        const searchAccountsRequest = async () => {
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

        searchAccountsRequest()
            .then(() => {
                console.log('Datos recibidos...')
            })
            .catch((error) => {
                console.log(error)
            })
    }, [navigate, parsedModel.studentCode])

    // Función para detectar el cambio en los campos del formulario de solicitud de préstamo
    const detectarCambio = (event) => {
        const {name, value} = event.target
        setRequestData(prevState => ({
            ...prevState, [name]: value
        }))
    }

    // Función para enviar la solicitud de préstamo
    const sendRequest = async (e) => {
        e.preventDefault()
        try {
            setButtonDisabled(true)
            const url = `${API_URL}/loanAPI/loanRequest`
            const response = await axios.post(url, requestData)
            console.log(response)
            navigate('/auth/platform')
        } catch (error) {
            setButtonDisabled(false)
            console.log(error)
            setError(error.response.data.message)
        }
    }


    return (
        <main>
            <Header/>

            <div className='loan-request-container'>
                <div className='loan-form-container'>
                    <h1>Solicitud de prestamo</h1>
                    <form className='loan-form' onSubmit={sendRequest}>
                        <p>Seleccione la cuenta destino:</p>
                        <select
                            className="combobox-movement"
                            name="destinyAccountID"
                            onChange={detectarCambio}
                            value={requestData.destinyAccountID}
                        >
                            <option value="">-- Elija una opción --</option>
                            {accounts.map((account) => (
                                <option
                                    key={account.accountID}
                                    value={account.accountID}
                                >
                                    {`${account.accountName} - ${account.accountCurrencyType} ${account.accountBalance}`}
                                </option>
                            ))}
                        </select>
                        <div>
                            <p>Valor del préstamo:</p>
                            <input type='number' name='loanValue' onChange={detectarCambio}/>
                            <p>Cuotas de pago:</p>
                            <select name='loanFeeRate' onChange={detectarCambio}>
                                <option value={-1}>-- Seleccionar --</option>
                                <option value={1}>1 cuota</option>
                                <option value={3}>3 cuotas</option>
                                <option value={6}>6 cuotas</option>
                                <option value={12}>12 cuotas</option>
                            </select>
                        </div>
                        <p>Justificación de préstamo:</p>
                        <textarea name='loanJustification' onChange={detectarCambio}/>
                        {error && <div className='error-message'>{error}</div>}
                        <button className='main-button-style' type="submit" disabled={isButtonDisabled}>Enviar
                            Solicitud
                        </button>
                    </form>
                </div>
            </div>
        </main>
    )
}

