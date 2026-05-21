import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children, requireAdmin = false }) {
    const token = localStorage.getItem('authToken');
    const userData = JSON.parse(localStorage.getItem('userData') || 'null');

    if (!token) {
        return <Navigate to="/auth" replace />;
    }

    if (requireAdmin && userData?.role !== 'admin') {
        return <Navigate to="/" replace />;
    }

    return children;
}

export default ProtectedRoute;