import { useAuth } from './context/AuthContext';
import { Routes, Route, Navigate, BrowserRouter as Router } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Articles from './pages/Articles';
import Navbar from './components/Navbar';
import UserPreferences from './pages/UserPreferences';

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <Router>
    <Navbar />
      <Routes>
      
        <Route path="/" element={<Articles />} />
        <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/" />} />
        <Route path="/register" element={!isAuthenticated ? <Register /> : <Navigate to="/" />} />
        <Route path="/preferences" element={isAuthenticated ? <UserPreferences /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
