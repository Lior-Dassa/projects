import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage.jsx';
import Dashboard from './pages/Dashboard.jsx';
import { useAuth} from './hooks/useAuth.js';
import { useState } from 'react';
export default function App() {
  const { isAuthenticated } = useAuth();
  const [isConnected, setIsConnected] = useState(isAuthenticated());

  return (
    <Router>
      <Routes>
        <Route path="/" element={isConnected ? <Navigate to="/dashboard" /> : <LandingPage setIsConnected={setIsConnected} />} />
        <Route path="/dashboard" element={isConnected ? <Dashboard /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  )
}
