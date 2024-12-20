import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext, useAuth } from '@/hooks/AuthProvider';

const ProtectedRoute = () => {
    const { token } = useAuth(AuthContext);
    if (!token) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;