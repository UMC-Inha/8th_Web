import HomePage from './HomePage';
import AdminPage from './AdminPage';
import ProtectedRoute from './ProtectedRoute';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';


const userRole = 'ADMIN';

const router = createBrowserRouter([
    {
        path : "/",
        element : <HomePage />
    }, 

    {
        path : "/admin",
        element : (
            <ProtectedRoute userRole = {userRole} requiredRole = {"ADMIN"}>
                <AdminPage />
            </ProtectedRoute>
        )
    }
])

function App() {
    return (
        <RouterProvider router={router} />
    )
}

export default App;
