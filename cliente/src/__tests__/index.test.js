import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';

test('renders App component', () => {
    const rootDiv = document.createElement('div');
    rootDiv.setAttribute('id', 'root');
    document.body.appendChild(rootDiv);

    ReactDOM.render(<App/>, rootDiv);

    // Verificar que se haya encontrado el elemento con ID "root"
    const rootElement = document.getElementById('root');
    expect(rootElement).toBeInTheDocument();

    // Verificar que el componente App se haya renderizado correctamente
    // Puedes agregar más expectativas aquí, por ejemplo, verificar la presencia de un componente específico dentro de App
    // expect(screen.getByText('Texto dentro de App')).toBeInTheDocument();
});