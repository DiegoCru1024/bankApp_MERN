import React, {Component} from 'react';
import {Helmet} from "react-helmet";
import logo from '../img/logo.png'
import './mainStyle.css'
import {Link} from "react-router-dom";

class MainPage extends Component {
    render() {
        return (
            <body>
            <Helmet>
                <title>Banco de Crédito Fisiano</title>
            </Helmet>
            <nav className="navbar-container">
                <div className="navbar-section">
                    <img src={logo} alt="logo"></img>
                    <ul>
                        <li>Productos</li>
                        <li>Canales de Atencion</li>
                        <li>Beneficios</li>
                        <li>Ayuda</li>
                    </ul>
                </div>
                <div>
                    <Link to="/userLogin" className="navbar-container-link">Banca en Línea</Link>
                </div>
            </nav>

            <header className="header-container">
                <div className="welcome-text">
                    <h1>Bienvenido al Banco de Crédito Fisiano</h1>
                    <p>Estamos aquí para ofrecerte una experiencia financiera moderna y segura, diseñada para satisfacer
                        todas tus necesidades bancarias.</p>
                </div>
            </header>

            <section className="services-container">

            </section>

            </body>
        );
    }
}

export default MainPage;