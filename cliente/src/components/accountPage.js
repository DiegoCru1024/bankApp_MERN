import React, {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import Header from "./headerComponent";

export default function AccountPage() {
    const navigate = useNavigate();

    useEffect(() => {
        // Verifica si hay un JWT en el almacenamiento
        const jwtToken = localStorage.getItem('token');

        if (!jwtToken) {
            navigate('/')
        }
    }, [navigate])

    return (
        <main>
            <Header/>
            <div>
                <h1>AccountPage en construcción...</h1>
            </div>
        </main>
    );
}

