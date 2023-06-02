import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import Header from "./headerComponent";
import axios from "axios";
import './css/projectStyles.css'

export default function TransferPage() {
    const storedModel = localStorage.getItem('studentData')
    const parsedModel = JSON.parse(storedModel)

    const [data, setData] = useState({
        accountOriginID: '', accountDestinyID: '', transferValue: ''
    })
    const [accounts, setAccounts] = useState([]);
    const [isButtonDisabled, setButtonDisabled] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Verifica si hay un JWT en el almacenamiento
        const jwtToken = localStorage.getItem('token');

        if (!jwtToken) {
            navigate('/')
        }

        searchAccounts().then(() => {
            console.log('Datos recibidos...')
        }).catch((error) => {
            console.log(error)
        })
    }, [])

    const detectarCambio = (event) => {
        const {name, value} = event.target
        setData(prevState => ({
            ...prevState, [name]: value
        }))
    }

    const enviarDatos = async (e) => {
        e.preventDefault()
        try {
            setButtonDisabled(true)
            const url = 'https://bankapp-backend.onrender.com/operationsAPI/transferMoney'
            const {data: res} = await axios.post(url, data)
            navigate("/auth/platform")
        } catch (error) {
            console.log(error)
            setButtonDisabled(false)
        }
    };

    const searchAccounts = async () => {
        try {
            const response = await axios.get('https://bankapp-backend.onrender.com/operationsAPI/getAccounts', {
                params: {
                    studentCode: parsedModel.studentCode
                }
            });
            setAccounts(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (<main>
        <Header/>
        <div className="create-account-main-container">
            <div className="create-account-menu">
                <h1>Transferencia de Dinero</h1>
                <form className="create-account-form" onSubmit={enviarDatos}>
                    <p>Seleccione la cuenta de origen:</p>
                    <select className="combobox" title="origin" name="accountOriginID" onChange={detectarCambio}>
                        <option value="">-- Elija una opción --</option>
                        {accounts.map((account, index) => (<option
                            value={account.accountID}>{account.accountName + " - " + account.accountCurrencyType + " " + account.accountBalance}</option>))}
                    </select>

                    <p>Ingrese el ID de la cuenta de destino:</p>
                    <input type="text" placeholder="Cuenta Destino ID" onChange={detectarCambio} required
                           value={data.accountDestinyID} name="accountDestinyID"></input><br></br>

                    <p>Ingrese el monto a transferir:</p>
                    <input type="text" placeholder="Monto a transferir" onChange={detectarCambio} required
                           value={data.transferValue} name="transferValue"></input><br></br>

                    <button className="main-button-style" type="submit" disabled={isButtonDisabled}>Crear Cuenta
                    </button>
                </form>
            </div>
        </div>
    </main>);
}

