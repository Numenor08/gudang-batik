import axiosInstance from "@/utils/axiosInstance";
import { createContext, useContext, useEffect, useMemo, useState, useCallback } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('accessToken'));
    const [role, setRole] = useState(null);

    const saveToken = useCallback((accessToken) => {
        setToken(accessToken);
        if (accessToken) {
            localStorage.setItem('accessToken', accessToken);
            const decodedToken = jwtDecode(accessToken);
            setRole(decodedToken.data.role);
        } else {
            setRole(null);
        }
    }, []);

    const removeToken = useCallback(() => {
        setToken(null);
        localStorage.removeItem('accessToken');
        setRole(null);
    }, []);

    useEffect(() => {
        const fetchAccessToken = async () => {
            if (token) return;
            try {
                const { data } = await axiosInstance.post('/api/auth/refresh-token');
                saveToken(data.accessToken);
            } catch (error) {
                console.error('Failed to refresh token:', error);
                removeToken();
            }
        };
        fetchAccessToken();
    }, [token, saveToken, removeToken]);

    const contextValue = useMemo(
        () => ({
            token,
            saveToken,
            role,
            removeToken,
        }),
        [token, role, saveToken, removeToken]
    );

    return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export { AuthContext, AuthProvider, useAuth };