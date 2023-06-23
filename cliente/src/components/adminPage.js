import React, {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import Header from "./headerComponent"
import axios from "axios"
import {API_URL} from '../config.js'

export default function PlatformPage() {
    // Hook de navegación
    const navigate = useNavigate()

    // Obtiene los datos almacenados en el localStorage
    const storedModel = localStorage.getItem('studentData')
    const parsedModel = JSON.parse(storedModel)

    // Estado para almacenar las solicitudes de préstamo
    const [requests, setRequests] = useState([])

    // Hook de efecto para verificar el token y el rol del usuario al cargar el componente
    useEffect(() => {
        // Verifica si hay un JWT en el almacenamiento
        const jwtToken = localStorage.getItem('token')

        if (!jwtToken) {
            navigate('/')
        }

        // Verifica si el usuario es un administrador
        if (!parsedModel.isAdmin) {
            navigate('/auth/platform')
        }

        // Obtiene las solicitudes de préstamo
        getRequests()
            .then(() => {
                console.log('Datos recibidos...')
            })
            .catch(error => {
                console.log(error)
            })
    }, [navigate, parsedModel.isAdmin])

    // Función para obtener las solicitudes de préstamo
    const getRequests = async () => {
        try {
            const url = `${API_URL}/loanAPI/loanRequest/getAllRequests`
            const response = await axios.get(url)
            setRequests(response.data)
        } catch (error) {
            console.error(error)
        }
    }

    // Función para actualizar el estado de una solicitud de préstamo
    const updateLoanRequest = async (studentCode, newLoanRequestState) => {
        try {
            const url = `${API_URL}/loanAPI/loanRequest/updateRequest`
            const data = {
                studentCode: studentCode,
                loanRequestState: newLoanRequestState
            }
            const response = await axios.put(url, data)
            console.log(response.data)

            // Vuelve a obtener las solicitudes de préstamo actualizadas
            getRequests()
                .then(() => {
                    console.log('Datos recibidos...')
                })
                .catch(error => {
                    console.log(error)
                })
        } catch (error) {
            console.error(error)
        }
    }

    // Estado para almacenar la pestaña activa
    const [activeTab, setActiveTab] = useState(1)

    // Función para manejar el clic en una pestaña
    const handleTabClick = (tabNumber) => {
        setActiveTab(tabNumber)
    }

    return (
        <main>
            <Header/>

            <section className='loan-request-container'>
                <div className='loan-requests-div'>
                    <h1>Solicitudes de Préstamo</h1>
                    <div className='loan-tabs'>
                        <div className="tab-buttons">
                            <button className={activeTab === 1 ? 'active' : ''}
                                    onClick={() => handleTabClick(1)}> Pendientes
                            </button>
                            <button className={activeTab === 2 ? 'active' : ''}
                                    onClick={() => handleTabClick(2)}> Aceptadas
                            </button>
                            <button className={activeTab === 3 ? 'active' : ''}
                                    onClick={() => handleTabClick(3)}> Rechazadas
                            </button>
                        </div>

                        <div>
                            {activeTab === 1 && (
                                <div>
                                    {requests
                                        .filter((request) => request.loanRequestState === 'Pendiente')
                                        .map((request) => (
                                            <div key={request.studentCode} className='loan-request-item'>
                                                <div className='loan-info'>
                                                    <h2>Solicitud {request.studentCode}</h2>
                                                    <p>Valor: {request.loanValue} - Cuotas: {request.loanFeeRate} -
                                                        Fecha de solicitud: {request.loanSubmitDate}</p>
                                                    <p>Justificación: {request.loanJustification}</p>
                                                </div>
                                                <div className='loan-buttons'>
                                                    <button
                                                        onClick={() => updateLoanRequest(request.studentCode, 'Aceptada')}>
                                                        Aprobar
                                                    </button>
                                                    <button
                                                        onClick={() => updateLoanRequest(request.studentCode, 'Rechazada')}>
                                                        Rechazar
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                </div>
                            )}

                            {activeTab === 2 && (
                                <div>
                                    {requests
                                        .filter((request) => request.loanRequestState === 'Aceptada')
                                        .map((request) => (
                                            <div key={request.studentCode} className='loan-request-item'>
                                                <div className='loan-info'>
                                                    <h2>Solicitud {request.studentCode} Aceptada</h2>
                                                    <p>Valor: {request.loanValue} - Cuotas: {request.loanFeeRate} -
                                                        Fecha de solicitud: {request.loanSubmitDate}</p>
                                                    <p>Justificación: {request.loanJustification}</p>
                                                </div>
                                            </div>
                                        ))}
                                </div>
                            )}

                            {activeTab === 3 && (
                                <div>
                                    {requests
                                        .filter((request) => request.loanRequestState === 'Rechazada')
                                        .map((request) => (
                                            <div key={request.studentCode} className='loan-request-item'>
                                                <div className='loan-info'>
                                                    <h2>Solicitud {request.studentCode} Rechazada</h2>
                                                    <p>Valor: {request.loanValue} - Cuotas: {request.loanFeeRate} -
                                                        Fecha de solicitud: {request.loanSubmitDate}</p>
                                                    <p>Justificación: {request.loanJustification}</p>
                                                </div>
                                            </div>
                                        ))}
                                </div>
                            )}

                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}
