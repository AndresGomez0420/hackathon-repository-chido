import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// import '../../App.Css'; // Uncomment if you want to import CSS globally

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Por favor ingresa tu correo y contraseña.');
      return;
    }
    setError('');
    alert('Login exitoso!');
  };

  return (<><div className="min-h-screen bg-gray-100 flex items-center justify-center">
  <div className="w-96 bg-white rounded shadow-md">
    {/* Pestañas */}
    <div className="flex">
      {/* Pestaña activa */}
      <div
        className="flex-1 relative px-4 py-2 text-center text-white font-medium bg-blue-600 
                   rounded-l-lg
                   [clip-path:polygon(0%_0,90%_0,100%_100%,0%_100%)]"
      >
        Iniciar sesión
      </div>

      {/* Pestaña inactiva */}
      <Link
        className="flex-1 relative px-4 py-2 text-center text-gray-700 font-medium bg-gray-200 hover:bg-gray-300 
                   rounded-r-lg
                   [clip-path:polygon(10%_0,100%_0,100%_100%,0%_100%)]" to='/register'
      >
        Registrarse
      </Link>
    </div>

    {/* Contenido */}
    <form className="p-6" onSubmit={handleSubmit}>
      <h2 className="text-xl font-bold mb-4 text-center">Iniciar sesión</h2>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2" htmlFor="email">
          Correo electrónico
        </label>
        <input
          id="email"
          type="email"
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 mb-2" htmlFor="password">
          Contraseña
        </label>
        <input
          id="password"
          type="password"
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
      >
        Entrar
      </button>
    </form>
  </div>
</div>

</>
  );
}

export default Login;
