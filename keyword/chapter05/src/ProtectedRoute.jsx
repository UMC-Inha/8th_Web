import { Navigate } from 'react-router-dom';

function ProtectedRoute({ userRole, requiredRole, children }) {
    if (userRole !== requiredRole) {
        return <Navigate to="/" replace />;
    }

    return children;
}

export default ProtectedRoute;
