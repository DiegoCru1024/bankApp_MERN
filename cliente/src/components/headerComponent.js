import './css/projectStyles.css'
import {Link} from "react-router-dom";
import userIMG from "./img/user.png";

const Header = () => {
    const storedModel = localStorage.getItem('studentData')
    const parsedModel = JSON.parse(storedModel)

    const logOut = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('studentData')
    }

    return (
        <main className="header-main-container">
            <div>
                <ul>
                    <li><img src={userIMG} alt="user"></img></li>
                    <li>Bienvenido {parsedModel.firstName + " " + parsedModel.lastName}</li>
                </ul>
            </div>
            <div>
                <ul>
                    <li><Link to="/auth/platform">INICIO</Link></li>
                    <li><Link to="/auth/loanInfo">PRESTAMOS</Link></li>
                    <li><Link to="/auth/account">CUENTA</Link></li>
                    {parsedModel.isAdmin ? (
                        <li><Link to="/auth/admin" on>ADMIN</Link></li>
                    ) : (<div   />)
                    }
                    <li><Link onClick={logOut} to='/'>SALIR</Link></li>
                </ul>
            </div>
        </main>
    )
}

export default Header