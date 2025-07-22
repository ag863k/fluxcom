import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth';
import { ThemeProvider } from './hooks/useTheme.jsx';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import ChatRoom from './components/Chat/ChatRoom';
import Header from './components/Layout/Header';
import './styles/globals.css';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="app">
            <Header />
            <main className="main-content">
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/chat" element={
                  <ProtectedRoute>
                    <ChatRoom />
                  </ProtectedRoute>
                } />
                <Route path="/" element={<Navigate to="/chat" />} />
              </Routes>
            </main>
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
