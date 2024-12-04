import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage.jsx';
import Dashboard from './pages/Dashboard.jsx';
import NotFound from './pages/NotFound.jsx';
import { useAuth} from './hooks/useAuth.js';
import { useState } from 'react';
export default function App() {
  const { isAuthenticated } = useAuth();
  const [isConnected, setIsConnected] = useState(isAuthenticated());
  const [isLoggedOut, setIsLoggedOut] = useState(false);

  return (
    <Router>
      <Routes>
        <Route path="/" element={isConnected ? 
          <Navigate to="/dashboard" /> :
          <LandingPage setIsConnected={setIsConnected} isLoggedOut={isLoggedOut} setIsLoggedOut={setIsLoggedOut}/>} />
        <Route path="/dashboard" element={isConnected ?
           <Dashboard setIsConnected={setIsConnected} setIsLoggedOut={setIsLoggedOut}/> :
           <Navigate to="/" />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}
