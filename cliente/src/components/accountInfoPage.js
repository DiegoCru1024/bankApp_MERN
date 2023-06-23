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

    // Estado para almacenar el ID de la cuenta seleccionada
    const [selectedAccountID, setSelectedAccountID] = useState('')

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
    const detectarCambio = (event) => {
        const value = event.target.value
        setSelectedAccountID(value)
    }

    //Función para generar el estado de cuenta
    const generateAccountInfo = () => {
        console.log('Generar')
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
                        onChange={detectarCambio}
                        value={selectedAccountID}
                    >
                        <option value="">-- Elija una opción --</option>
                        {accounts.map((account) => (
                            <option
                                key={account.accountID}
                                value={account.accountID}
                                selected={account.accountID === selectedAccountID}
                            >
                                {`${account.accountName} - ${account.accountCurrencyType} ${account.accountBalance}`}
                            </option>
                        ))}
                    </select>
                    <button className="main-button-style" onClick={generateAccountInfo}>Generar</button>
                </div>
            </div>
        </main>
    )
}