import React from 'react';
import {render, screen} from '@testing-library/react';
import {MemoryRouter, Route, Routes} from 'react-router-dom';
import App from '../App';
import MainPage from '../components/mainPage';
import LoginPage from '../components/loginPage';
import RegisterPage from '../components/registerPage';
import PlatformPage from '../components/platformPage';
import LoanInfoPage from '../components/loanInfoPage';
import LoanRequestPage from '../components/loanRequestPage';
import AccountPage from '../components/accountPage';
import AdminPage from '../components/adminPage';
import CreateAccountPage from '../components/createAccountPage';
import TransferPage from '../components/transferPage';
import MovementPage from '../components/movementPage';
import AccountInfoPage from '../components/accountInfoPage';
import AccountInfoWebPage from '../components/accountInfoWebPage';

// Simula datos iniciales para las variables obtenidas de la API
const apiData = {
    parsedModel: {
        name: 'John Doe',
        email: 'john@example.com',
        studentCode: 20200019
    },
    account: {
        balance: 1000,
        transactions: [
            {id: 1, amount: -100, description: 'Purchase'},
            {id: 2, amount: 200, description: 'Deposit'},
        ],
    },
};

test('renders MainPage component', () => {
    render(
        <MemoryRouter initialEntries={['/']}>
            <Routes>
                <Route path="/" element={<MainPage data={apiData}/>}/>
            </Routes>
        </MemoryRouter>
    );

    expect(screen.getByText('Bienvenido al Banco de Crédito Fisiano')).toBeInTheDocument();
});

test('renders LoginPage component', () => {
    render(
        <MemoryRouter initialEntries={['/userLogin']}>
            <Routes>
                <Route path="/userLogin" element={<LoginPage data={apiData}/>}/>
            </Routes>
        </MemoryRouter>
    );

    expect(screen.getByText('Bienvenido a nuestra plataforma de Banca en Línea')).toBeInTheDocument();
});

test('renders RegisterPage component', () => {
    render(
        <MemoryRouter initialEntries={['/userRegister']}>
            <Routes>
                <Route path="/userRegister" element={<RegisterPage data={apiData}/>}/>
            </Routes>
        </MemoryRouter>
    );

    expect(screen.getByText('Bienvenido a nuestra plataforma de Banca en Línea')).toBeInTheDocument();
});

