import React from 'react';
import {render, screen} from '@testing-library/react';
import MainPage from '../components/mainPage';
import {BrowserRouter} from "react-router-dom";

describe('MainPage', () => {
    test('renders main page', () => {
        render(
            <BrowserRouter>
                <MainPage/>
            </BrowserRouter>
        );

        // Verificar que el título se renderice correctamente
        expect(screen.getByText(/Banco de Crédito Fisiano/i)).toBeInTheDocument();

        // Verificar que los elementos de navegación estén presentes
        expect(screen.getByAltText('logo')).toBeInTheDocument();
        expect(screen.getByText(/Productos/i)).toBeInTheDocument();
        expect(screen.getByText(/Canales de Atencion/i)).toBeInTheDocument();
        expect(screen.getByText(/Beneficios/i)).toBeInTheDocument();
        expect(screen.getByText(/Ayuda/i)).toBeInTheDocument();

        // Verificar que el enlace a la página de inicio de sesión se renderice correctamente
        expect(screen.getByRole('link', {name: /Banca en Línea/i})).toBeInTheDocument();

        // Verificar que el encabezado y el texto de bienvenida se rendericen correctamente
        expect(screen.getByRole('heading', {
            level: 1,
            name: /Bienvenido al Banco de Crédito Fisiano/i
        })).toBeInTheDocument();
        expect(screen.getByText(/Estamos aquí para ofrecerte una experiencia financiera moderna y segura/i)).toBeInTheDocument();
    });
});
