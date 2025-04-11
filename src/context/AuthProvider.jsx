import { useState, useEffect } from "react";
import AuthContext from "./AuthContext";  
import { getCurrentUser, logout } from "../Api/AuthApi";

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userData = await getCurrentUser();
                setUser(userData);
            } catch (error) {
                console.error(error);
                setUser(null);
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, []);

    const logoutUser = async () => {
        await logout();
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, logoutUser, setUser }}>
            {!loading ? children : <h2>Loading...</h2>}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
