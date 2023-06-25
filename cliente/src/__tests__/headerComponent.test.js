import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import {BrowserRouter} from 'react-router-dom';
import Header from '../components/headerComponent';

test('renders Header component', () => {
    // Crear un objeto de datos de estudiante simulado
    const studentData = {
        firstName: 'John',
        lastName: 'Doe'
    };

    // Establecer los datos del estudiante en el almacenamiento local
    localStorage.setItem('studentData', JSON.stringify(studentData));

    // Renderizar el componente Header dentro de BrowserRouter
    render(
        <BrowserRouter>
            <Header/>
        </BrowserRouter>
    );

    // Comprobar que se muestra el texto "Bienvenido {nombre completo}"
    expect(screen.getByText(/Bienvenido John Doe/i)).toBeInTheDocument();

    // Comprobar que se muestra el enlace "SALIR"
    const logoutLink = screen.getByText(/SALIR/i);
    expect(logoutLink).toBeInTheDocument();

    // Hacer clic en el enlace "SALIR"
    fireEvent.click(logoutLink);

    // Comprobar que los datos del estudiante se han eliminado del almacenamiento local
    expect(localStorage.getItem('studentData')).toBeNull();
});


test('renders admin link for admin user', () => {
    const studentData = {
        firstName: 'John',
        lastName: 'Doe',
        isAdmin: true
    };

    localStorage.setItem('studentData', JSON.stringify(studentData));

    render(
        <BrowserRouter>
            <Header/>
        </BrowserRouter>
    );

    expect(screen.getByText(/ADMIN/i)).toBeInTheDocument();
});

test('does not render admin link for non-admin user', () => {
    const studentData = {
        firstName: 'Jane',
        lastName: 'Smith',
        isAdmin: false
    };

    localStorage.setItem('studentData', JSON.stringify(studentData));

    render(
        <BrowserRouter>
            <Header/>
        </BrowserRouter>
    );

    expect(screen.queryByText(/ADMIN/i)).not.toBeInTheDocument();
});
