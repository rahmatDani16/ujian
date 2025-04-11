import { NavLink, useNavigate } from 'react-router-dom';
import { FaUser, FaUsers, FaSignOutAlt, FaTachometerAlt } from "react-icons/fa";

const Sidebar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/");
    };

    return (
        <div className='sidebar' style={{
            width: '250px',
            height: '100vh',
            backgroundColor: '#0d1117',
            padding: '20px',
            color: 'white',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '2px 0 5px rgba(0, 0, 0, 0.5)',
            borderRight: '2px solid #f39c12',
            alignItems: 'stretch' 
        }}>
            <h5 className='sidebar-title' style={{
                fontSize: '1.8rem',
                textAlign: 'center',
                marginBottom: '20px',
                fontWeight: 'bold',
                color: '#f39c12',
                textTransform: 'uppercase',
                letterSpacing: '1px'
            }}>Data User</h5>
            <ul className='sidebar-menu' style={{
                padding: '0',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px', 
                alignItems: 'stretch' 
            }}>
                <li style={{ width: '100%' }}>
                    <NavLink to={'/dashboard'} style={{
                        color: 'white',
                        padding: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        borderRadius: '5px',
                        transition: 'background 0.3s',
                        width: '100%',
                        textDecoration: 'none',
                        fontSize: '1.1rem',
                        justifyContent: 'flex-start', 
                        backgroundColor: '#161b22',
                        fontWeight: 'bold',
                        boxSizing: 'border-box',
                    }}>
                        <FaTachometerAlt style={{ marginRight: '10px', fontSize: '1.3rem', color: '#f39c12' }} />
                        <span style={{ display: 'inline-block', verticalAlign: 'middle', margin: 0 }}>Dashboard</span>
                    </NavLink>
                </li>
                <li style={{ width: '100%' }}>
                    <NavLink to={'/Admin'} style={{
                        color: 'white',
                        padding: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        borderRadius: '5px',
                        transition: 'background 0.3s',
                        width: '100%',
                        textDecoration: 'none',
                        fontSize: '1.1rem',
                        justifyContent: 'flex-start', 
                        backgroundColor: '#161b22',
                        fontWeight: 'bold',
                        boxSizing: 'border-box',
                    }}>
                        <FaUsers style={{ marginRight: '10px', fontSize: '1.3rem', color: '#f39c12' }} />
                        <span style={{ display: 'inline-block', verticalAlign: 'middle', margin: 0 }}>Daftar User</span>
                    </NavLink>
                </li>
                <li style={{ width: '100%' }}>
                    <NavLink to={'/pendaftar'} style={{
                        color: 'white',
                        padding: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        borderRadius: '5px',
                        transition: 'background 0.3s',
                        width: '100%',
                        textDecoration: 'none',
                        fontSize: '1.1rem',
                        justifyContent: 'flex-start', 
                        backgroundColor: '#161b22',
                        fontWeight: 'bold',
                        boxSizing: 'border-box',
                    }}>
                        <FaUser style={{ marginRight: '10px', fontSize: '1.3rem', color: '#f39c12' }} />
                        <span style={{ display: 'inline-block', verticalAlign: 'middle', margin: 0 }}>Pendaftaran</span>
                    </NavLink>
                </li>
                <li style={{ width: '100%' }}>
                    <button
                        onClick={handleLogout}
                        style={{
                            color: 'white',
                            padding: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            borderRadius: '5px',
                            backgroundColor: '#e74c3c',
                            fontSize: '1.1rem',
                            fontWeight: 'bold',
                            width: '100%',
                            border: 'none',
                            cursor: 'pointer',
                            transition: 'background 0.3s',
                            textAlign: 'left',
                            boxSizing: 'border-box',
                        }}
                    >
                        <FaSignOutAlt style={{ marginRight: '10px', fontSize: '1.3rem' }} />
                        <span style={{ display: 'inline-block', verticalAlign: 'middle', margin: 0 }}>Logout</span>
                    </button>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
