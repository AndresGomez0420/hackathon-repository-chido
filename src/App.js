
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
// Páginas
import React from 'react';
import Home from './pages/Home';
import Login from './pages/auth/Login';
import About from './pages/About';
import Register from './pages/auth/Register';
import NotFound from './pages/NotFound';
import Contact from './pages/Contact';
import ClientsHome from './pages/client/ClientHome';

// Componentes globales
import Navbar from './components/Navbar';
import Footer from './components/Footer';



function App() {
  return (
    <Router>
      {/* Elementos comunes en todas las páginas */}
      <Navbar />

      {/* Definición de rutas */}
      <Routes>
        
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/register" element={<Register />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/clientes" element={<ClientsHome />} />
        <></>
        {/* Ruta por defecto si no se encuentra la página */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
