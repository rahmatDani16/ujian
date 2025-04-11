import { NavLink, useNavigate } from "react-router-dom"
import MyNavbar from "../components/Navbar"

const ErrorPage = () => {
    const navigate = useNavigate();
    console.log("ErrorPage Rendered"); 
    return (
        <div>
            <MyNavbar/>
            <h3>404 Halaman Tidak Ditemukan</h3>
            <p>Opps... Halamn yang kamu cari tidak ada</p>
            <button onClick={() => navigate(-1)}>kembali</button>
            <NavLink to={"/"}>Kembali</NavLink>
        </div>
    )
}

export default ErrorPage