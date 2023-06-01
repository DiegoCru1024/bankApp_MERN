import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import Header from "./headerComponent";
import './css/projectStyles.css'
import axios from "axios";

export default function PlatformPage() {
    const storedModel = localStorage.getItem('studentData')
    const parsedModel = JSON.parse(storedModel)
    const [accounts, setAccounts] = useState([]);
    const navigate = useNavigate()

    useEffect(() => {
        // Verifica si hay un JWT en el almacenamiento
        const jwtToken = localStorage.getItem('token');

        if (!jwtToken) {
            navigate('/')
        }

        searchAccounts()
    }, [])

    const searchAccounts = async () => {
        try {
            const response = await axios.get('https://bankapp-backend.onrender.com/accountAPI', {
                params: {
                    studentCode: parsedModel.studentCode
                }
            });
            setAccounts(response.data);
            console.log(response.data)
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <main>
            <Header/>
            <div className="platform-main-container">
                <div className="platform-operations">
                    <h1>Operaciones frecuentes</h1>
                    <div className="operations-grid-container">
                        <Link to="/auth/accountCreate">Crear cuenta de ahorros</Link>
                        <Link to="/auth/platform">Transferencia</Link>
                        <Link to="/auth/platform">Depósito o Retiro</Link>
                        <Link to="/auth/platform">Estado de Cuenta</Link>
                        <Link to="/auth/platform">Ultimos movimientos</Link>
                        <Link to="/auth/platform">Prestamos</Link>
                    </div>
                </div>
                <div className="platform-accounts">
                    <h1>Cuentas de ahorro</h1>
                    <div className="accounts-container">
                        {accounts.map((account, index) => (
                            <div key={index} className="account">
                                <h2>{account.accountName}</h2>
                                <p>{account.accountCurrencyType + " " + account.accountBalance}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
}

