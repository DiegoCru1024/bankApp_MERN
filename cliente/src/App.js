import {BrowserRouter, Route, Routes} from "react-router-dom";
import MainPage from "./components/mainPageComponent";
import LoginPage from "./components/loginComponent";
import RegisterPage from "./components/registerComponent";
import PlatformPage from "./components/platformComponent";
import OperationsPage from "./components/operationsPageComponent";
import AccountPage from "./components/accountPageComponent";
import AdminPage from "./components/adminPageComponent";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainPage/>}/>
                <Route path="/userLogin" element={<LoginPage/>}/>
                <Route path="/userRegister" element={<RegisterPage/>}/>
                <Route path="/auth/platform" element={<PlatformPage/>}/>
                <Route path="/auth/operations" element={<OperationsPage/>}/>
                <Route path="/auth/account" element={<AccountPage/>}/>
                <Route path="/auth/admin" element={<AdminPage/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
