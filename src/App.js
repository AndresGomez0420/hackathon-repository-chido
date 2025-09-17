import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Páginas
import Home from './pages/Home';
import Login from './pages/auth/Login';
import About from './pages/About';
import Register from './pages/auth/Register';
import NotFound from './pages/NotFound';


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
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Ruta por defecto si no se encuentra la página */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
