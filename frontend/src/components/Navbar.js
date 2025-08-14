import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="flex items-center justify-between bg-blue-600 px-6 py-3 text-white">
      <div className="flex items-center space-x-4">
        <Link to="/" className="font-bold text-lg">EnglishApp</Link>
        <Link to="/practice" className="hover:underline">Practice</Link>
        <Link to="/history" className="hover:underline">History</Link>
      </div>
      <div className="flex items-center space-x-4">
        {user ? (
          <>
            <span>{user.email}</span>
            <button onClick={logout} className="bg-red-500 px-3 py-1 rounded">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:underline">Login</Link>
            <Link to="/register" className="hover:underline">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
