import React from 'react';
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="bg-blue-500 text-white p-4">
      <ul className="flex space-x-4">
        <li>
          <Link className='no-underline' to='/'>
          Home
          </Link>
          </li>
        <li>
          <Link className='no-underline' to='/about'>
          About
          </Link>
          </li>
        <li>
          <Link className='no-underline' to='/login'>
          Login
          </Link>
          </li>
        <li>
          <Link className='no-underline' to='/register'>
          Register
          </Link>
        </li>
        <li>
          <Link className='no-underline' to='/contact'>
          Contact
          </Link>
        </li>
        <li>
          <Link className='no-underline' to="/clientes">
          Clientes
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
