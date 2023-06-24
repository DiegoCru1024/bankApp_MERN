import React, {useEffect, useState} from 'react';
import Header from "./headerComponent";
import {API_URL} from "../config";
import axios from "axios";

export default function LoanInfoPage() {
    // Obtiene los datos almacenados en el localStorage
    const storedModel = localStorage.getItem('studentData')
    const parsedModel = JSON.parse(storedModel)

    const [loanInfo, setLoanInfo] = useState(null);

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
            } catch (error) {
                console.log(error);
            }
        };

        getLoanInfo().then(() => {
            console.log('Datos recibidos...')
        });
    }, [parsedModel.studentCode]);

    return (
        <main>
            <Header/>

            <section className='create-account-main-container'>
                <div className='loanInfo-container'>
                    <h1>Información de préstamo</h1>
                    <div>
                        <p><span>Fecha de solicitud: </span> {loanInfo.loanSubmitDate}</p>
                    </div>
                    <div>
                        <p><span>Solicitante:</span> {loanInfo.studentName}</p>
                        <p><span>Código:</span> {loanInfo.studentCode}</p>
                    </div>
                    <div>
                        <p><span>Valor de préstamo: </span> {loanInfo.loanCurrencyType} {loanInfo.loanValue}</p>
                        <p><span>Número de cuotas: </span> {loanInfo.loanFeeRate}</p>
                    </div>
                    <div className='loanJustification'>
                        <span>Justificación de préstamo:</span>
                        <p>{loanInfo.loanJustification}</p>
                    </div>
                </div>
            </section>
        </main>
    );
}
