import {BrowserRouter, Route, Routes, Navigate} from "react-router-dom";
import MainPage from "./components/mainPageComponent";
import LoginPage from "./components/loginComponent";
import RegisterPage from "./components/registerComponent";
import PlatformPage from "./components/platformComponent";

function App() {
    const userData = localStorage.getItem('token')
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainPage/>}/>
                <Route path="/userLogin" element={<LoginPage/>}/>
                <Route path="/userRegister" element={<RegisterPage/>}/>
                {userData && <Route path="/" element={<PlatformPage/>}/>}
            </Routes>
        </BrowserRouter>
    );
}

export default App;
