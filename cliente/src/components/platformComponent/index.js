import React, {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

export default function PlatformPage() {
    const navigate = useNavigate();

    useEffect(() => {
        // Verifica si hay un JWT en el almacenamiento
        const jwtToken = localStorage.getItem('token');

        if (!jwtToken) {
            navigate('/')
        }
    })

    const logOut = () => {
        localStorage.removeItem('token')
        navigate('/')
    }

    return (
        <div>
            <h1>Contenido protegido</h1>
            <button onClick={logOut}>Log Out</button>
        </div>
    );
}

