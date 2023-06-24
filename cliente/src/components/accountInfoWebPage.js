import Header from "./headerComponent";
import React, {useEffect, useState} from "react";
import {API_URL} from "../config";
import axios from "axios";
import {useNavigate} from "react-router-dom";

export default function AccountInfoWebPage() {
    // Hook de navegación
    const navigate = useNavigate();

    // Estado para almacenar los movimientos
    const [movements, setMovements] = useState([]);

    // Estado para almacenar el mensaje de error
    const [error, setError] = useState("");

    const urlParams = new URLSearchParams(window.location.search);
    const accountID = urlParams.get("accountID");

    useEffect(() => {
        // Verifica si hay un JWT en el almacenamiento
        const jwtToken = localStorage.getItem("token");

        if (!jwtToken) {
            navigate("/");
        } else {
            // Llama a la función searchMovements para obtener los movimientos
            const searchMovements = async () => {
                try {
                    const url = `${API_URL}/operationsAPI/getLastMovements`;
                    const response = await axios.get(url, {
                        params: {
                            accountID: accountID,
                        },
                    });
                    setMovements(response.data);
                    setError("");
                } catch (error) {
                    setMovements([]);
                    setError(error.response.data.message);
                    console.error(error);
                }
            };

            searchMovements().then(() => {
                console.log("Datos recibidos...");
            });
        }
    }, [navigate, accountID]);

    return (
        <div>
            <Header/>
            {error && <div className='error-message'>{error}</div>}
            <div className="table-container">
                <table className="movement-table">
                    <thead>
                    <tr>
                        <th>Cuenta de origen</th>
                        <th>Cuenta de destino</th>
                        <th>Valor total</th>
                        <th>Divisa</th>
                        <th>Tipo de movimiento</th>
                        <th>Fecha de movimiento</th>
                    </tr>
                    </thead>
                    <tbody>
                    {movements.map((movement) => (
                        <tr key={movement.movementID}>
                            <td>{movement.accountOriginID}</td>
                            <td>{movement.accountDestinyID}</td>
                            <td>{movement.movementValue}</td>
                            <td>{movement.movementCurrencyType}</td>
                            <td>{movement.movementType}</td>
                            <td>{movement.movementDate}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
