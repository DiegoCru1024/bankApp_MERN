import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import Header from "./headerComponent";
import './css/projectStyles.css'
import axios from "axios";

export default function LoanRequestPage() {
    const storedModel = localStorage.getItem('studentData');
    const parsedModel = JSON.parse(storedModel);

    const [isButtonDisabled, setButtonDisabled] = useState(false);
    const [accounts, setAccounts] = useState([]);
    const [error, setError] = useState("")
    const [requestData, setRequestData] = useState({
        studentCode: parsedModel.studentCode,
        studentName: parsedModel.firstName + " " + parsedModel.lastName,
        loanValue: -1,
        loanFeeRate: -1,
        loanJustification: 'ASD',
        loanRequestState: 'Pendiente',
        loanSubmitDate: Date.now(),
        destinyAccountID: -1
    })

    const navigate = useNavigate();

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

    const detectarCambio = (event) => {
        const {name, value} = event.target
        setRequestData(prevState => ({
            ...prevState, [name]: value
        }))
        console.log(requestData)
    }

    const sendRequest = async (e) => {
        e.preventDefault()
        try {
            setButtonDisabled(true)
            const url = 'https://bankapp-backend.onrender.com/loanAPI/requestLoan'
            const response = await axios.post(url, requestData)
            console.log(response)
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
    );
}

