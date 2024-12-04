import {useNavigate} from 'react-router-dom';
import {useAuth} from '../../hooks/useAuth.js';

export default function DashboardHeader({setIsConnected}) {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        setIsConnected(false);
        navigate('/');
    }

    return (
        <header className="fixed top-0 left-0 right-0 w-full h-36 bg-white shadow-md z-50"> 
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between"> 
        <div className="flex items-center gap-8"> 
            <h1 className="text-5xl font-bold text-blue-600">MO Bank</h1> 
            <h2 className="text-5xl font-bold text-gray-600">Dashboard</h2> 
        </div>
        <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white hover:bg-blue-700 rounded-lg text-lg"
            >
            Logout
            </button>
        </div>
    </header>
    )
}
