import axios from "axios";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {jwtDecode} from "jwt-decode";
import { useCallback } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [token, setToken_] = useState('');
    const [role, setRole] = useState(null);
    const [img , setImg] = useState(null);

    const setToken = useCallback((newToken) => {
        setToken_(newToken);
        if (newToken) {
            // localStorage.setItem('token', newToken);
            axios.defaults.headers.common["Authorization"] = "Bearer " + newToken;
        } else {
            // localStorage.removeItem('token');
            delete axios.defaults.headers.common["Authorization"];
        }
    }, []);

    useEffect(() => {
        if (token) {
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            const decodedToken = jwtDecode(token);
            setRole(decodedToken.data.role);
        } else {
            setRole(null);
        }
    }, [token]);

    const contextValue = useMemo(
        () => ({
            token,
            setToken,
            role,
            img,
            setImg
        }),
        [token, role, img, setToken]
    );

    return (
        <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
    );
};

const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export { AuthContext, AuthProvider, useAuth };