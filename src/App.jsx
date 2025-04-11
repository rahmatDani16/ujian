import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './pages/Index.jsx';
import "bootstrap/dist/css/bootstrap.min.css";
import  AuthProvider  from "./context/AuthProvider.jsx";
import Dashboard from './components/Dashboard.jsx';
import Login from './auth/Login.jsx';
import Register from './auth/Register.jsx';
import TambahPendaftar from './components/TambahPendaftar.jsx';
import Dashbor from './components/Awal.jsx'
import PendaftarList from './components/pendaftar.jsx';



function App() {
  return (
    <>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pendaftar" element={<TambahPendaftar />} />
          <Route path="/pendaftar" element={<PendaftarList />} />
          <Route path="/dashboard" element={<Dashbor />} />
          <Route path= "/Admin" element={<Dashboard />} />
          <Route path= "/login" element={<Login />} />
          <Route path= "/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
    </>
  );
}

export default App;
