import React from 'react';
import {render, waitFor, act, fireEvent} from '@testing-library/react';
import axios from 'axios';
import {BrowserRouter} from 'react-router-dom';
import MovementPage from '../components/MovementPage';

jest.mock('axios');

describe('MovementPage', () => {
    // Crear un objeto de datos de estudiante simulado
    const studentData = {
        firstName: 'John',
        lastName: 'Doe'
    };

    // Establecer los datos del estudiante en el almacenamiento local
    localStorage.setItem('studentData', JSON.stringify(studentData));
    
    test('renders movement page with accounts and movements', async () => {
        const mockAccounts = [
            {
                accountID: 1,
                accountName: 'Account 1',
                accountCurrencyType: 'USD',
                accountBalance: 1000,
            },
            {
                accountID: 2,
                accountName: 'Account 2',
                accountCurrencyType: 'EUR',
                accountBalance: 2000,
            },
        ];

        const mockMovements = [
            {
                accountID: 1,
                movementCurrencyType: 'USD',
                movementValue: 100,
                movementType: 'Deposit',
                accountOriginID: 'Origin 1',
                accountDestinyID: 'Destiny 1',
            },
            {
                accountID: 1,
                movementCurrencyType: 'USD',
                movementValue: 200,
                movementType: 'Withdrawal',
                accountOriginID: 'Origin 2',
                accountDestinyID: 'Destiny 2',
            },
        ];

        axios.get.mockResolvedValueOnce({data: mockAccounts});
        axios.get.mockResolvedValueOnce({data: mockMovements});

        const {getByText, getByTestId} = render(
            <BrowserRouter>
                <MovementPage/>
            </BrowserRouter>
        );

        // Wait for accounts to be loaded
        await waitFor(() => getByText('Account 1 - 1'));
        expect(getByText('Account 1 - 1')).toBeInTheDocument();
        expect(getByText('Account 2 - 2')).toBeInTheDocument();

        // Select account and search movements
        const selectElement = getByTestId('account-select');
        fireEvent.change(selectElement, {target: {value: '1'}});

        const searchButton = getByText('Buscar');
        fireEvent.click(searchButton);

        // Wait for movements to be loaded
        await waitFor(() => getByText('USD 100'));
        expect(getByText('USD 100')).toBeInTheDocument();
        expect(getByText('USD 200')).toBeInTheDocument();
    });

    test('redirects to login page when JWT token is not present', async () => {
        const mockAccounts = [
            {
                accountID: 1,
                accountName: 'Account 1',
                accountCurrencyType: 'USD',
                accountBalance: 1000,
            },
        ];

        axios.get.mockResolvedValue({data: mockAccounts});

        // Mock localStorage to simulate absence of JWT token
        const localStorageMock = {
            getItem: jest.fn(() => null),
        };
        global.localStorage = localStorageMock;

        // Mock useNavigate to spy on navigation
        const mockNavigate = jest.fn();

        const {getByText} = render(
            <BrowserRouter>
                <MovementPage navigate={mockNavigate}/>
            </BrowserRouter>
        );

        // Wait for redirect
        await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith('/'));
        expect(getByText('Login')).toBeInTheDocument();
    });

    test('displays error message when search movements fails', async () => {
        const mockAccounts = [
            {
                accountID: 1,
                accountName: 'Account 1',
                accountCurrencyType: 'USD',
                accountBalance: 1000,
            },
        ];

        const errorMessage = 'Failed to retrieve movements';

        axios.get.mockRejectedValueOnce(new Error(errorMessage));
        axios.get.mockResolvedValueOnce({data: mockAccounts});

        const {getByText, getByTestId} = render(
            <BrowserRouter>
                <MovementPage/>
            </BrowserRouter>
        );

        // Wait for accounts to be loaded
        await waitFor(() => getByText('Account 1 - 1'));
        expect(getByText('Account 1 - 1')).toBeInTheDocument();

        // Select account and search movements
        const selectElement = getByTestId('account-select');
        fireEvent.change(selectElement, {target: {value: '1'}});

        const searchButton = getByText('Buscar');
        fireEvent.click(searchButton);

        // Wait for error message
        await waitFor(() => getByText(errorMessage));
        expect(getByText(errorMessage)).toBeInTheDocument();
    });
});
