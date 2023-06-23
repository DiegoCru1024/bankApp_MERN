import React, {useEffect, useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import Header from "./headerComponent"
import './css/projectStyles.css'
import axios from "axios"
import {API_URL} from "../config"

export default function PlatformPage() {
    // Obtener el modelo almacenado en el almacenamiento local
    const storedModel = localStorage.getItem('studentData')

    // Analizar el modelo almacenado en formato JSON
    const parsedModel = JSON.parse(storedModel)

    // Estado para almacenar las cuentas
    const [accounts, setAccounts] = useState([])

    // Hook de navegación
    const navigate = useNavigate()

    useEffect(() => {
        // Verifica si hay un JWT en el almacenamiento
        const jwtToken = localStorage.getItem('token')

        if (!jwtToken) {
            navigate('/')
        }

        // Función para buscar las cuentas en la plataforma
        const searchAccountsPlatform = async () => {
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

        // Llamar a la función de búsqueda de cuentas en la plataforma
        searchAccountsPlatform()
            .then(() => {
                console.log('Datos recibidos...')
            })
            .catch((error) => {
                console.log(error)
            })
    }, [navigate, parsedModel.studentCode])

    return (
        <main>
            <Header/>
            <div className="platform-main-container">
                <div className="platform-operations">
                    <h1>Operaciones frecuentes</h1>
                    <div className="operations-grid-container">
                        <Link to="/auth/accountCreate">Crear cuenta de ahorros</Link>
                        <Link to="/auth/transferMoney">Transferencia</Link>
                        <Link to="/auth/platform">Depósito o Retiro</Link>
                        <Link to="/auth/accountInfo">Estado de Cuenta</Link>
                        <Link to="/auth/lastMovements">Ultimos movimientos</Link>
                        <Link to="/auth/loanRequest">Solicitar Prestamo</Link>
                    </div>
                </div>
                <div className="platform-accounts">
                    <h1>Cuentas de ahorro</h1>
                    <div className="accounts-container">
                        {accounts.map((account) => (
                            <div key={account.accountID} className="account">
                                <h2>{account.accountName + " - " + account.accountID}</h2>
                                <p>{account.accountCurrencyType + " " + account.accountBalance}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    )
}

