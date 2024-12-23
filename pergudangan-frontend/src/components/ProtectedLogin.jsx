import { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/hooks/AuthProvider';

const ProtectedLogin = () => {
    const { token, setIsLogin } = useAuth();

    useEffect(() => {
        setIsLogin(true);
    }, [setIsLogin]);
    
    if (token) {
        return <Navigate to="/dashboard" replace />;
    }

    return <Outlet />;
};

export default ProtectedLogin;