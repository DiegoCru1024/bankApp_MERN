import {BrowserRouter, Route, Routes} from "react-router-dom";
import MainPage from "./components/mainPage";
import LoginPage from "./components/loginPage";
import RegisterPage from "./components/registerPage";
import PlatformPage from "./components/platformPage";
import OperationsPage from "./components/operationsPage";
import AccountPage from "./components/accountPage";
import AdminPage from "./components/adminPage";
import CreateAccountPage from "./components/createAccountPage";
import TransferPage from "./components/transferPage";

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

                <Route path="/auth/accountCreate" element={<CreateAccountPage/>}/>
                <Route path="/auth/transferMoney" element={<TransferPage/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
