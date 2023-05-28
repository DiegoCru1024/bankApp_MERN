import './headerStyle.css'
import userIMG from "../img/user.png";
import {Link} from "react-router-dom";
const Header = () => {


    return (
        <main className="main-container">
            <div>
                <ul>
                    <li><img src={userIMG} alt="user"></img></li>
                    <li>Bienvenido {localStorage.getItem('studentData')}</li>
                </ul>
            </div>
            <div>
                <ul>
                    <li><Link to="/auth/platform">INICIO</Link></li>
                    <li><Link to="/auth/operations">OPERACIONES</Link></li>
                    <li><Link to="/auth/account">CUENTA</Link></li>
                </ul>
            </div>
        </main>
    )
}

export default Header