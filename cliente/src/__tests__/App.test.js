import React from 'react';
import {render, screen} from '@testing-library/react';
import {MemoryRouter, Route, Routes} from 'react-router-dom';
import MainPage from '../components/mainPage';
import LoginPage from '../components/loginPage';
import RegisterPage from '../components/registerPage';


// Simula datos iniciales para las variables obtenidas de la API
const apiData = {
    parsedModel: {
        name: 'John Doe',
        email: 'john@example.com',
        studentCode: 20200019
    }
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

