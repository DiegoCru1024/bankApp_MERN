import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import Header from './headerComponent';
import axios from 'axios';

export default function MovementPage() {
    const navigate = useNavigate();
    const [accounts, setAccounts] = useState([]);
    const [movements, setMovements] = useState([]);
    const storedModel = localStorage.getItem('studentData');
    const parsedModel = JSON.parse(storedModel);

    const [selectedAccountID, setSelectedAccountID] = useState('');

    useEffect(() => {
        // Verifica si hay un JWT en el almacenamiento
        const jwtToken = localStorage.getItem('token');

        if (!jwtToken) {
            navigate('/');
        }

        searchAccounts()
            .then(() => {
                console.log('Datos recibidos...');
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const searchAccounts = async () => {
        try {
            const url = 'https://bankapp-backend.onrender.com/operationsAPI/getAccounts';
            const response = await axios.get(url, {
                params: {
                    studentCode: parsedModel.studentCode,
                },
            });
            setAccounts(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const searchMovements = async () => {
        try {
            const url = 'https://bankapp-backend.onrender.com/operationsAPI/getLastMovements';
            const response = await axios.get(url, {
                params: {
                    accountID: selectedAccountID,
                },
            });
            setMovements(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const detectarCambio = (event) => {
        const value = event.target;
        setSelectedAccountID(value);
    };

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
                        {accounts.map((account, index) => (
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

                    <div className="accounts-container">
                        {movements.map((movement, index) => (
                            <div key={movement.accountID} className="account">
                                <h2>Monto de
                                    transferencia: {`${movement.movementCurrencyType} ${movement.movementValue}`}</h2>
                                <p>
                                    Origen: {movement.accountOriginID} - Destino: {movement.accountDestinyID}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
}
