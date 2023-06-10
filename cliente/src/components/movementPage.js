import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import Header from "./headerComponent";
import axios from "axios";

export default function MovementPage() {
    const navigate = useNavigate();
    const [movements, setMovements] = useState([]);
    const storedModel = localStorage.getItem('studentData')
    const parsedModel = JSON.parse(storedModel)

    useEffect(() => {
        // Verifica si hay un JWT en el almacenamiento
        const jwtToken = localStorage.getItem('token');

        if (!jwtToken) {
            navigate('/')
        }

        searchMovements().then(() => {
            console.log('Datos recibidos...')
        }).catch((error) => {
            console.log(error)
        })
    }, [])

    const searchMovements = async () => {
        try {
            const url = 'https://bankapp-backend.onrender.com/operationsAPI/getLastMovements'
            const response = await axios.get(url, {
                params: {
                    studentCode: parsedModel.studentCode
                }
            });
            setMovements(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <main>
            <Header/>
            <div className="create-account-main-container">
                <div className="create-account-menu">
                    <h1>Ultimos Movimientos</h1>
                    {movements.map((movement, index) => (
                        <div key={movement.accountID} className="account">
                            <h2>{movement.movementCurrencyType + " " + movement.movementValue}</h2>
                            <p>{movement.movementDate}</p>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}

