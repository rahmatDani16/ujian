import axios from "axios";

const API = axios.create({
    baseURL: "",
    withCredentials: true
});

const login = async (data) => {
    try {
        const response = await API.post("/login", data);
        return response;
    } catch (error) {
        console.error(error);
        return error;
    }
};

const register = async (data) => {
    try {
        const response = await API.post("/register", data);
        return response;
    } catch (error) {
        console.error(error);
        return error;
    }
};

const logout = async () => {
    try {
        const response = await API.get("/logout");
        return response;
    } catch (error) {
        console.error(error);
        return error;
    }
};

const getCurrentUser = async () => {
    try {
        const response = await API.get("/Me");
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};

export { login, register, logout, getCurrentUser };
