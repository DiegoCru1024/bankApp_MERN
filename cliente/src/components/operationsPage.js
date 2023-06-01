import React, {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import Header from "./headerComponent";

export default function OperationsPage() {
    const navigate = useNavigate();

    useEffect(() => {
        // Verifica si hay un JWT en el almacenamiento
        const jwtToken = localStorage.getItem('token');

        if (!jwtToken) {
            navigate('/')
        }
    }, [])

    return (
        <main>
            <Header/>
            <div>
                <h1>OperationsPage en construcción...</h1>
            </div>
        </main>
    );
}

