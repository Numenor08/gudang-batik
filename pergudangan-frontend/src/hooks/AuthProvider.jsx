import axios from "axios";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
// import {jwtDecode} from "jwt-decode";

const AuthContext = createContext();
const AuthProvider = ({ children }) => {
    const tokenTemp = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInJvbGUiOiJhZG1pbiIsImlhdCI6MTczNDY2OTQzOSwiZXhwIjoxNzM0NjczMDM5fQ.KftgYL9lKSHVHUt880eB-XkfeAS869NSzlj2GPESHFs';
    // const [token, setToken_] = useState(localStorage.getItem("token"));
    const [token, setToken_] = useState(tokenTemp);
    const [role, setRole] = useState(null);

    const setToken = (newToken) => {
        setToken_(newToken);
        if (newToken) {
            // localStorage.setItem('token', newToken);
            axios.defaults.headers.common["Authorization"] = "Bearer " + newToken;
        } else {
            // localStorage.removeItem('token');
            delete axios.defaults.headers.common["Authorization"];
        }
    };

    useEffect(() => {
        if (token) {
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            // const decodedToken = jwtDecode(token);
            // setRole(decodedToken.data.role);
            setRole("admin");
        } else {
            setRole(null);
        }
    }, [token]);

    const contextValue = useMemo(
        () => ({
            token,
            setToken,
            role,
        }),
        [token, role]
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