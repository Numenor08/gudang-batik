import { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/hooks/AuthProvider';

const ProtectedRoute = () => {
    const { token, setIsLogin } = useAuth();
    
    useEffect(() => {
        setIsLogin(false);
    }, [setIsLogin]);
    
    if (!token) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;