import {BrowserRouter, Route, Routes} from "react-router-dom";
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
                <Route path="/auth/platform" element={<PlatformPage/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
