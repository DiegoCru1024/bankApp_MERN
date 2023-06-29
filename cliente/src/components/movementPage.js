import React, {useEffect, useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import Header from './headerComponent'
import axios from 'axios'
import {API_URL} from "../config"

export default function MovementPage() {
    // Hook de navegación
    const navigate = useNavigate()

    // Estado para almacenar las cuentas
    const [accounts, setAccounts] = useState([])

    // Estado para almacenar los movimientos
    const [movements, setMovements] = useState([])

    // Estado para almacenar el mensaje de error
    const [error, setError] = useState('')

    // Obtener el modelo almacenado en el almacenamiento local
    const storedModel = localStorage.getItem('studentData')

    // Analizar el modelo almacenado en formato JSON
    const parsedModel = JSON.parse(storedModel)

    // Estado para almacenar el ID de la cuenta seleccionada
    const [selectedAccountID, setSelectedAccountID] = useState('-1')

    useEffect(() => {
        // Verifica si hay un JWT en el almacenamiento
        const jwtToken = localStorage.getItem('token')

        if (!jwtToken) {
            navigate('/')
        }

        // Función para buscar las cuentas del usuario
        const searchAccounts = async () => {
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
        searchAccounts()
            .then(() => {
                console.log('Datos recibidos...')
            })
            .catch((error) => {
                console.log(error)
            })
    }, [navigate, parsedModel.studentCode])

    // Función para buscar los últimos movimientos de una cuenta
    const searchMovements = async () => {
        try {
            const url = `${API_URL}/operationsAPI/getLastMovements`
            const response = await axios.get(url, {
                params: {
                    accountID: selectedAccountID,
                },
            })
            setMovements(response.data)
            setError('')
        } catch (error) {
            setMovements([])
            setError(error.response.data.message)
            console.error(error)
        }
    }

    // Función para detectar el cambio en la selección de cuenta
    const detectarCambio = (event) => {
        const value = event.target.value
        setSelectedAccountID(value)
    }

    return (
        <main>
            <Header/>
            <div className="create-account-main-container">
                <div className="create-account-menu">
                    <h1>Ultimos Movimientos</h1>
                    <select
                        className="combobox-movement"
                        title="origin"
                        name="accountOriginID"
                        onChange={detectarCambio}
                        value={selectedAccountID}
                    >
                        <option value="-1">-- Elija una opción --</option>
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
                    <button className="main-button-style" onClick={searchMovements}>
                        Buscar
                    </button>

                    <div className="movements-container">
                        {movements.map((movement) => (
                            <div key={movement.accountID} className="movement">
                                <p>
                                    <span>Monto de movimiento: </span>{`${movement.movementCurrencyType} ${movement.movementValue}`}
                                </p>
                                <p><span>Tipo de movimiento: </span>{movement.movementType}</p>
                                <p>
                                    <span>Origen:s</span> {movement.accountOriginID} - <span>Destino:</span> {movement.accountDestinyID}
                                </p>
                            </div>
                        ))}
                    </div>

                    {error && <div className='error-message'>{error}</div>}
                </div>

                <div className='volver-boton-container'>
                    <Link to="/auth/platform" className='volver-boton'>↶ Volver a la pagina principal</Link>
                </div>
            </div>
        </main>
    )
}
