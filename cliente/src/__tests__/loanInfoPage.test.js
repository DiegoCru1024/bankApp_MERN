import React from 'react';
import {render, waitFor} from '@testing-library/react';
import axios from 'axios';
import LoanInfoPage from '../components/LoanInfoPage';
import {BrowserRouter} from "react-router-dom";

jest.mock('axios');

describe('LoanInfoPage', () => {
    // Crear un objeto de datos de estudiante simulado
    const studentData = {
        firstName: 'John',
        lastName: 'Doe'
    };

    // Establecer los datos del estudiante en el almacenamiento local
    localStorage.setItem('studentData', JSON.stringify(studentData));

    test('renders loan info when data is fetched successfully', async () => {
        const mockLoanInfo = {
            loanSubmitDate: '2022-01-01',
            studentName: 'John Doe',
            studentCode: '12345',
            loanCurrencyType: 'USD',
            loanValue: 1000,
            loanFeeRate: 12,
            loanJustification: 'Some justification',
        };

        axios.get.mockResolvedValue({data: mockLoanInfo});

        const {getByText} = render(
            <BrowserRouter>
                <LoanInfoPage/>
            </BrowserRouter>
        );

        // Wait for data to be fetched and displayed
        await waitFor(() => getByText('Información de préstamo'));

    });

    test('renders loading message while data is being fetched', async () => {
        axios.get.mockResolvedValue(new Promise(() => {
        })); // Simulate a pending promise

        const {getByText} = render(
            <BrowserRouter>
                <LoanInfoPage/>
            </BrowserRouter>
        );

        expect(getByText('Cargando datos...')).toBeInTheDocument();
    });
});
