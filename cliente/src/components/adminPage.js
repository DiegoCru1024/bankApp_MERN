import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import Header from "./headerComponent";
import axios from "axios";

export default function PlatformPage() {
    const navigate = useNavigate();
    const storedModel = localStorage.getItem('studentData');
    const parsedModel = JSON.parse(storedModel);

    const [requests, setRequests] = useState([]);

    useEffect(() => {
        // Verifica si hay un JWT en el almacenamiento
        const jwtToken = localStorage.getItem('token');

        if (!jwtToken) {
            navigate('/');
        }

        if (!parsedModel.isAdmin) {
            navigate('/auth/platform');
        }

        getRequests()
            .then(res => {
                console.log('Datos recibidos...');
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    const getRequests = async () => {
        try {
            const url = 'https://bankapp-backend.onrender.com/loanAPI/loanRequest/getAllRequests';
            const response = await axios.get(url);
            setRequests(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const updateLoanRequest = async (studentCode, newLoanRequestState) => {
        try {
            const url = 'https://bankapp-backend.onrender.com/loanAPI/loanRequest/updateRequest';
            const data = {
                studentCode: studentCode,
                loanRequestState: newLoanRequestState
            };
            const response = await axios.put(url, data);
            console.log(response.data);

            getRequests()
                .then(() => {
                    console.log('Datos recibidos...');
                })
                .catch(error => {
                    console.log(error);
                });
        } catch (error) {
            console.error(error);
        }
    };

    const [activeTab, setActiveTab] = useState(1);

    const handleTabClick = (tabNumber) => {
        setActiveTab(tabNumber);
    };

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
                                <div id='pendientes'>
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
                                <div id={}>
                                    {requests
                                        .filter((request) => request.loanRequestState === 'Aceptada')
                                        .map((request) => (
                                            <div key={request.studentCode} className='loan-request-item'>
                                                <div className='loan-info'>
                                                    <h2>Solicitud {request.studentCode}</h2>
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
                                                    <h2>Solicitud {request.studentCode}</h2>
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
    );
}
