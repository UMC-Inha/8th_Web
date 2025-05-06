import './App.css';
import { RouterProvider } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import appRouter from './components/router';

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={appRouter} />
    </AuthProvider>
  );
}

export default App;
