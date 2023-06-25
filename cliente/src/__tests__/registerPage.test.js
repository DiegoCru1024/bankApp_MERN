import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom';
import axios from 'axios';
import RegisterPage from '../components/registerPage';
import {API_URL} from '../config';

jest.mock('axios');

describe('RegisterPage', () => {
    test('registers a new user successfully', async () => {
        const navigateMock = jest.fn();
        const axiosPostMock = jest.spyOn(axios, 'post');
        axiosPostMock.mockResolvedValueOnce({});

        render(
            <MemoryRouter>
                <RegisterPage/>
            </MemoryRouter>
        );

        // Fill in the registration form
        fireEvent.change(screen.getByPlaceholderText('Nombre'), {
            target: {value: 'John'},
        });
        fireEvent.change(screen.getByPlaceholderText('Apellido'), {
            target: {value: 'Doe'},
        });
        fireEvent.change(screen.getByPlaceholderText('Correo electrónico'), {
            target: {value: 'john.doe@example.com'},
        });
        fireEvent.change(screen.getByPlaceholderText('Contraseña'), {
            target: {value: 'password123'},
        });
        fireEvent.change(screen.getByPlaceholderText('Teléfono'), {
            target: {value: '123456789'},
        });
        fireEvent.change(screen.getByPlaceholderText('Código de Estudiante'), {
            target: {value: '1234'},
        });

        // Submit the registration form
        fireEvent.submit(screen.getByRole('button', {name: 'Registrarse'}));

        // Check if the API was called with the correct data
        expect(axiosPostMock).toHaveBeenCalledWith(`${API_URL}/registerAPI`, {
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@example.com',
            password: 'password123',
            number: '123456789',
            studentCode: '1234',
            isAdmin: false,
        });

    });

    test('displays an error message on registration failure', async () => {
        const axiosPostMock = jest.spyOn(axios, 'post');
        const errorMessage = 'Registration failed';
        axiosPostMock.mockRejectedValueOnce({
            response: {data: {message: errorMessage}},
        });

        render(
            <MemoryRouter>
                <RegisterPage/>
            </MemoryRouter>
        );

        // Submit the registration form
        fireEvent.submit(screen.getByRole('button', {name: 'Registrarse'}));

        // Check if the error message is displayed
        expect(await screen.findByText(errorMessage)).toBeInTheDocument();
    });
});
