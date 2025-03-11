import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage.js';
import Signup from './components/Signup.js';
import Login from './components/Login.js';
import AdminDashboard from './components/AdminDashboard.js';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminDashboard />} />
        {/* Outras rotas, como a área de membros, podem ser adicionadas aqui */}
      </Routes>
    </Router>
  );
}

export default App;
