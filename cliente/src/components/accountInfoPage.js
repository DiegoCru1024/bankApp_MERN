import Header from "./headerComponent";
import React, {useEffect, useState} from "react";
import {API_URL} from "../config";
import axios from "axios";
import {useNavigate} from "react-router-dom";

export default function AccountInfoPage() {
    // Hook de navegación
    const navigate = useNavigate()

    // Estado para almacenar las cuentas
    const [accounts, setAccounts] = useState([])

    // Obtener el modelo almacenado en el almacenamiento local
    const storedModel = localStorage.getItem('studentData')

    // Analizar el modelo almacenado en formato JSON
    const parsedModel = JSON.parse(storedModel)

    //Estado para almacenar la data que será enviada
    const [error, setError] = useState('')
    const [response, setResponse] = useState('')
    const [data, setData] = useState({
        accountID: '',
        infoType: '',
        consent: false
    });

    useEffect(() => {
        // Verifica si hay un JWT en el almacenamiento
        const jwtToken = localStorage.getItem('token')

        if (!jwtToken) {
            navigate('/')
        }

        // Función para buscar las cuentas del usuario
        const searchAccountsInfo = async () => {
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

        // Llamar a la función de búsqueda de cuentas
        searchAccountsInfo()
            .then(() => {
                console.log('Datos recibidos...')
            })
            .catch((error) => {
                console.log(error)
            })
    }, [navigate, parsedModel.studentCode])

    // Función para detectar el cambio en la selección de cuenta
    const handleAccountChange = (event) => {
        const {value} = event.target;
        setData((prevData) => ({
            ...prevData,
            accountID: value
        }));
    }

    // Función para detectar el cambio en el tipo de información
    const handleInfoTypeChange = (event) => {
        const {value} = event.target;
        setData((prevData) => ({
            ...prevData,
            infoType: value
        }));
    }

    // Función para detectar el cambio en el checkbox de consentimiento
    const handleConsentChange = (event) => {
        const {checked} = event.target;
        setData((prevData) => ({
            ...prevData,
            consent: checked
        }));
    }

    //Función para generar el estado de cuenta
    const generateAccountInfo = async (e) => {
        try {
            const url = `${API_URL}/infoAPI/generateInfo`
            const response = await axios.post(url, data)
            setResponse(response.data.message)
            setError('')

            if (data.infoType === 'webpage') {
                navigate(`/auth/accountInfoWeb?accountID=${data.accountID}`)
            }
        } catch (error) {
            setResponse('')
            setError(error.response.data.error)
        }
    }

    return (
        <main>
            <Header/>
            <div className="create-account-main-container">
                <div className="create-account-menu">
                    <h1>Estado de cuenta</h1>
                    <select
                        className="combobox-movement"
                        title="origin"
                        name="accountOriginID"
                        onChange={handleAccountChange}
                        value={data.accountID}
                    >
                        <option value="">-- Elija una cuenta de ahorros --</option>
                        {accounts.map((account) => (
                            <option
                                key={account.accountID}
                                value={account.accountID}
                                selected={account.accountID === data.accountID}
                            >
                                {`${account.accountName} - ${account.accountCurrencyType} ${account.accountBalance}`}
                            </option>
                        ))}
                    </select>
                    <select
                        className="combobox-movement"
                        title="origin"
                        name="infoType"
                        onChange={handleInfoTypeChange}
                        value={data.infoType}
                    >
                        <option value="">-- Elija el método de envío --</option>
                        <option value="email">Correo electrónico</option>
                        <option value="delivery">Entrega a domicilio</option>
                        <option value="webpage">Página web</option>
                    </select>
                    <div>
                        <input id='consent' type='checkbox' checked={data.consent} onChange={handleConsentChange}/>
                        <label>Acepto los términos y condiciones.</label>
                    </div>
                    {error && <div className='error-message'>{error}</div>}
                    {response && <div className='response-message'>{response}</div>}
                    <button className="main-button-style" onClick={generateAccountInfo}>Generar</button>
                </div>
            </div>
        </main>
    )
}