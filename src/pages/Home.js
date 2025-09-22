import React from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from "../components/Sidebar";

function Home() {
  const navigate = useNavigate();

  return (
    <>
      <Sidebar />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded shadow-md w-full max-w-md text-center">
          <h1 className="text-3xl font-bold mb-4">Bienvenido a la App</h1>
          <p className="mb-6">Esta es la página principal.</p>
          <div className="space-y-3">
            <button
              className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
              onClick={() => navigate('/login')}
            >
              Iniciar sesión
            </button>
            <button
              className="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition"
              onClick={() => navigate('/producto/1')}
            >
              Ver Producto de Ejemplo
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;