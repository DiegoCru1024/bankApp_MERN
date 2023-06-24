import React, {useEffect, useState} from 'react';
import Header from "./headerComponent";
import {API_URL} from "../config";
import axios from "axios";

export default function LoanInfoPage() {
    const storedModel = localStorage.getItem('studentData');
    const parsedModel = JSON.parse(storedModel);

    const [loanInfo, setLoanInfo] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getLoanInfo = async () => {
            try {
                const url = `${API_URL}/loanAPI/loanInfo`;
                const response = await axios.get(url, {
                    params: {
                        studentCode: parsedModel.studentCode
                    }
                });
                setLoanInfo(response.data);
                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        };

        getLoanInfo().then(() => {
            console.log('Datos recibidos...');
        });
    }, [parsedModel.studentCode]);

    return (
        <main>
            <Header/>

            <section className='create-account-main-container'>
                <div className='loanInfo-container'>
                    <h1>Información de préstamo</h1>
                    {loading ? (
                        <p>Cargando datos...</p>
                    ) : (
                        <>
                            <div>
                                <p><span>Fecha de solicitud: </span> {loanInfo && loanInfo.loanSubmitDate}</p>
                            </div>
                            <div>
                                <p><span>Solicitante:</span> {loanInfo && loanInfo.studentName}</p>
                                <p><span>Código:</span> {loanInfo && loanInfo.studentCode}</p>
                            </div>
                            <div>
                                <p>
                                    <span>Valor de préstamo: </span> {loanInfo && loanInfo.loanCurrencyType} {loanInfo && loanInfo.loanValue}
                                </p>
                                <p><span>Número de cuotas: </span> {loanInfo && loanInfo.loanFeeRate}</p>
                            </div>
                            <div className='loanJustification'>
                                <span>Justificación de préstamo:</span>
                                <p>{loanInfo && loanInfo.loanJustification}</p>
                            </div>
                        </>
                    )}
                </div>
            </section>
        </main>
    );
}
