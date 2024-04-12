import Register from "./components/Register";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login"
import Dashboard from "./components/Dashboard";
import { Provider } from 'react-redux'; 
import store from './store';
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Posts from "./components/Posts";
function App() {
    return (
        <div>
            <BrowserRouter>
            <Provider store={store}>
                <Routes>
                    <Route path="/" element={<HomePage/>}></Route>
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/dashboard" element={<DashBoardPage />} />
                    <Route path="/allpost" element={<AllpostPage/>}></Route>
                </Routes>
            </Provider>
            </BrowserRouter>
        </div>
    );
}

function RegisterPage(){
    return(
        <>
        <Navbar/>
        <Register/>
        </>
    )
}

function LoginPage(){
    return(
        <>
        <Navbar/>
        <Login/>
        </>
    )
}


function DashBoardPage(){
    return (
        <>
        <Navbar/>
        <Dashboard/>
        </>
    )
}

function HomePage(){
    return(
        <>
        <Navbar/>
        <Home/>
        </>
    )
}


function AllpostPage(){
    return (
        <>
        <Navbar/>
        <Posts/>
        </>
    )
}

export default App;
