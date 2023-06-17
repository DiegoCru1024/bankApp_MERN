import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import Header from "./headerComponent";
import axios from "axios";
import './css/projectStyles.css'

export default function CreateAccountPage() {
    const [resMessage, setResMessage] = useState({message: ''})
    const storedModel = localStorage.getItem('studentData')
    const parsedModel = JSON.parse(storedModel)

    const [data, setData] = useState({
        ownerFirstName: parsedModel.firstName,
        ownerLastName: parsedModel.lastName,
        ownerUserID: parsedModel.studentCode,
        accountName: '',
        accountID: '',
        accountBalance: '100.0',
        accountCurrencyType: 'PEN'
    })

    const [isButtonDisabled, setButtonDisabled] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Verifica si hay un JWT en el almacenamiento
        const jwtToken = localStorage.getItem('token');

        if (!jwtToken) {
            navigate('/')
        }
    }, [])

    const detectarCambio = (event) => {
        const {name, value} = event.target
        setData(prevState => ({
            ...prevState, [name]: value
        }))
    }

    const enviarDatos = async (e) => {
        e.preventDefault();
        try {
            setButtonDisabled(true)
            const url = 'https://bankapp-backend.onrender.com/operationsAPI/createAccount';
            const {data: res} = await axios.post(url, data);
            navigate("/auth/platform");
            console.log(res.message);
        } catch (error) {
            setButtonDisabled(false)
            setResMessage({message: error.response.data.message})
        }
    };

    return (
        <main>
            <Header/>
            <div className="create-account-main-container">
                <div className="create-account-menu">
                    <h1>Creación de Cuenta de Ahorros</h1>
                    <form className="create-account-form" onSubmit={enviarDatos}>
                        <p>Ingrese un nombre para su cuenta de ahorros:</p>
                        <input type="text" placeholder="Nombre distintivo de cuenta" onChange={detectarCambio} required
                               value={data.accountName} name="accountName"></input><br></br>
                        <p>Seleccione el tipo de divisa:</p>
                        <div className="radio-button">
                            <input type="radio" id="option1" name="accountCurrencyType" value="PEN"
                                   onChange={detectarCambio}></input>
                            <label htmlFor="option1">S/. Soles</label>
                        </div>
                        <div className="radio-button">
                            <input type="radio" id="option2" name="accountCurrencyType" value="USD"
                                   onChange={detectarCambio}></input>
                            <label htmlFor="option2">$ Dolares</label>
                        </div>

                        <button className="main-button-style" type="submit" disabled={isButtonDisabled}>Crear Cuenta
                        </button>
                    </form>

                    {resMessage.message && <div className="error-message">{resMessage.message}</div>}
                </div>
            </div>
        </main>
    );
}

