import React, {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import Header from './headerComponent'
import axios from 'axios'
import {API_URL} from "../config"

export default function MovementPage() {
    const navigate = useNavigate()
    const [accounts, setAccounts] = useState([])
    const [movements, setMovements] = useState([])
    const [error, setError] = useState('')
    const storedModel = localStorage.getItem('studentData')
    const parsedModel = JSON.parse(storedModel)

    const [selectedAccountID, setSelectedAccountID] = useState('')

    useEffect(() => {
        // Verifica si hay un JWT en el almacenamiento
        const jwtToken = localStorage.getItem('token');

        if (!jwtToken) {
            navigate('/')
        }

        const searchAccounts = async () => {
            try {
                const url = `${API_URL}/operationsAPI/getAccounts`;
                const response = await axios.get(url, {
                    params: {
                        studentCode: parsedModel.studentCode
                    }
                });
                setAccounts(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        searchAccounts()
            .then(() => {
                console.log('Datos recibidos...');
            })
            .catch((error) => {
                console.log(error);
            });
    }, [navigate, parsedModel.studentCode]);

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
            </div>
        </main>
    )
}
