import {BrowserRouter, Route, Routes} from "react-router-dom";
import MainPage from "./components/mainPage";
import LoginPage from "./components/loginPage";
import RegisterPage from "./components/registerPage";
import PlatformPage from "./components/platformPage";
import LoanInfoPage from "./components/loanInfoPage";
import LoanRequestPage from "./components/loanRequestPage";
import AccountPage from "./components/accountPage";
import AdminPage from "./components/adminPage";
import CreateAccountPage from "./components/createAccountPage";
import TransferPage from "./components/transferPage";
import MovementPage from "./components/movementPage";
import AccountInfoPage from "./components/accountInfoPage";
import AccountInfoWebPage from "./components/accountInfoWebPage";

function App() {
    return (
        // Utiliza BrowserRouter para habilitar el enrutamiento en la aplicación
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainPage/>}/>
                <Route path="/userLogin" element={<LoginPage/>}/>
                <Route path="/userRegister" element={<RegisterPage/>}/>
                <Route path="/auth/platform" element={<PlatformPage/>}/>
                <Route path="/auth/loanInfo" element={<LoanInfoPage/>}/>
                <Route path="/auth/loanRequest" element={<LoanRequestPage/>}/>
                <Route path="/auth/account" element={<AccountPage/>}/>
                <Route path="/auth/admin" element={<AdminPage/>}/>
                <Route path="/auth/accountCreate" element={<CreateAccountPage/>}/>
                <Route path="/auth/transferMoney" element={<TransferPage/>}/>
                <Route path="/auth/lastMovements" element={<MovementPage/>}/>
                <Route path="/auth/accountInfo" element={<AccountInfoPage/>}/>
                <Route path="/auth/accountInfoWeb" element={<AccountInfoWebPage/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
