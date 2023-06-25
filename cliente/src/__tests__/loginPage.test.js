import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom';
import axios from 'axios';
import LoginPage from '../components/loginPage';

jest.mock('axios'); // Mockear el módulo de axios

describe('LoginPage', () => {
    describe('LoginPage', () => {
        beforeAll(() => {
            const localStorageMock = {
                getItem: jest.fn(),
                setItem: jest.fn(),
                removeItem: jest.fn(),
            };
            Object.defineProperty(window, 'localStorage', {value: localStorageMock});
        });

        test('renders login form and submits data', async () => {
            // Mockear la respuesta exitosa del servidor
            const responseData = {
                data: 'token',
                model: {firstName: 'John', lastName: 'Doe'}
            };
            axios.post.mockResolvedValue({data: responseData});

            // Renderizar el componente LoginPage dentro de MemoryRouter
            render(
                <MemoryRouter>
                    <LoginPage/>
                </MemoryRouter>
            );

            // Comprobar que se muestra el formulario de inicio de sesión
            expect(screen.getByPlaceholderText('Correo electrónico')).toBeInTheDocument();
            expect(screen.getByPlaceholderText('Contraseña')).toBeInTheDocument();

            // Simular el cambio en los campos del formulario
            fireEvent.change(screen.getByPlaceholderText('Correo electrónico'), {
                target: {value: 'example@example.com'}
            });
            fireEvent.change(screen.getByPlaceholderText('Contraseña'), {
                target: {value: 'password123'}
            });

            // Simular el envío del formulario
            fireEvent.submit(screen.getByRole('button', {name: 'Iniciar Sesión'}));

            // Comprobar que se llama a la API con los datos del formulario
            expect(axios.post).toHaveBeenCalledWith(
                expect.stringContaining('/loginAPI'),
                {email: 'example@example.com', password: 'password123'}
            );
        });

        test('renders error message on login failure', async () => {
            // Mockear la respuesta de error del servidor
            const errorMessage = 'Invalid credentials';
            axios.post.mockRejectedValue({response: {data: {message: errorMessage}}});

            // Renderizar el componente LoginPage dentro de MemoryRouter
            render(
                <MemoryRouter>
                    <LoginPage/>
                </MemoryRouter>
            );

            // Simular el envío del formulario
            fireEvent.submit(screen.getByRole('button', {name: 'Iniciar Sesión'}));

            // Comprobar que se muestra el mensaje de error
            expect(await screen.findByText(errorMessage)).toBeInTheDocument();
        });
    })
})
