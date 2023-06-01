import React, {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import Header from "./headerComponent";

export default function PlatformPage() {
    const navigate = useNavigate();
    const storedModel = localStorage.getItem('studentData')
    const parsedModel = JSON.parse(storedModel)

    useEffect(() => {
        // Verifica si hay un JWT en el almacenamiento
        const jwtToken = localStorage.getItem('token');

        if (!jwtToken) {
            navigate('/')
        }

        if(!parsedModel.isAdmin){
            navigate('/auth/platform')
        }
    }, [])

    return (
        <main>
            <Header/>
            <div>
                <h1>AdminPage en construcción...</h1>
            </div>
        </main>
    );
}