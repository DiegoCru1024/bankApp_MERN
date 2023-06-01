import {BrowserRouter, Route, Routes} from "react-router-dom";
import MainPage from "./components/mainPage";
import LoginPage from "./components/loginPage";
import RegisterPage from "./components/registerPage";
import PlatformPage from "./components/platformPage";
import OperationsPage from "./components/operationsPage";
import AccountPage from "./components/accountPage";
import AdminPage from "./components/adminPage";
import CreateAccountPage from "./components/createAccountPage";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                //Paginas Principales
                <Route path="/" element={<MainPage/>}/>
                <Route path="/userLogin" element={<LoginPage/>}/>
                <Route path="/userRegister" element={<RegisterPage/>}/>
                <Route path="/auth/platform" element={<PlatformPage/>}/>
                <Route path="/auth/operations" element={<OperationsPage/>}/>
                <Route path="/auth/account" element={<AccountPage/>}/>
                <Route path="/auth/admin" element={<AdminPage/>}/>

                //Paginas de Operaciones
                <Route path="/auth/accountCreate" element={<CreateAccountPage/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
