import { Navigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

/**
 * Protects a route to admin role only.
 * Redirects to /login if not authenticated, or / if not admin.
 */
export default function ProtectedRoute({ children }) {
    const { user } = useApp();

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (user.role !== 'admin') {
        return <Navigate to="/" replace />;
    }

    return children;
}
