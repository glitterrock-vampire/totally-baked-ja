import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.jsx';

const Header = ({ cartCount, currentPage, setCurrentPage }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();

  const navigateTo = (page) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
  };

  const handleLogout = async () => {
    await logout();
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b-4 border-black">
      <div className="flex items-stretch">
        <div className="w-48 border-r-4 border-black p-4 flex items-center">
          <Link 
            to="/" 
            onClick={() => navigateTo('home')}
            className="text-xl font-black lowercase tracking-tight hover:opacity-60 transition-opacity"
          >
            totally baked
          </Link>
        </div>
        
        <nav className="hidden lg:flex flex-1">
          <Link
            to="/herb-house"
            onClick={() => navigateTo('herb')}
            className={`flex-1 flex items-center justify-center border-r-4 border-black text-xs font-bold uppercase tracking-wider hover:bg-black hover:text-white transition-colors ${
              currentPage === 'herb' ? 'bg-black text-white' : ''
            }`}
          >
            herb house
          </Link>
          <Link
            to="/delights-cafe"
            onClick={() => navigateTo('delights')}
            className={`flex-1 flex items-center justify-center border-r-4 border-black text-xs font-bold uppercase tracking-wider hover:bg-black hover:text-white transition-colors ${
              currentPage === 'delights' ? 'bg-black text-white' : ''
            }`}
          >
            delights
          </Link>
          <Link
            to="/collectibles"
            onClick={() => navigateTo('collectibles')}
            className={`flex-1 flex items-center justify-center border-r-4 border-black text-xs font-bold uppercase tracking-wider hover:bg-black hover:text-white transition-colors ${
              currentPage === 'collectibles' ? 'bg-black text-white' : ''
            }`}
          >
            collectibles
          </Link>
        </nav>
        
        <div className="hidden lg:flex items-center border-l-4 border-black">
          {user ? (
            <div className="flex items-center gap-4 px-4">
              <Link
                to="/orders"
                className="text-xs font-medium hover:text-tb-orange transition-colors"
              >
                Orders
              </Link>
              <span className="text-xs font-medium">Hi, {user.email?.split('@')[0]}</span>
              <button
                onClick={handleLogout}
                className="text-xs font-medium hover:text-red-600 transition-colors"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="px-4 text-xs font-medium hover:text-tb-orange transition-colors"
            >
              Login
            </Link>
          )}
        </div>
        
        <Link
          to="/checkout"
          className="w-20 border-l-4 border-black flex items-center justify-center hover:bg-tb-orange hover:text-white transition-colors relative"
        >
          <span className="font-mono text-lg font-bold">{cartCount}</span>
          {cartCount > 0 && (
            <span className="absolute top-2 right-2 w-2 h-2 bg-tb-orange rounded-full"></span>
          )}
        </Link>
        
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden w-16 border-l-4 border-black flex items-center justify-center hover:bg-gray-100"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
            <path strokeLinecap="square" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
      
      {mobileMenuOpen && (
        <nav className="lg:hidden border-t-4 border-black">
          <Link
            to="/herb-house"
            onClick={() => navigateTo('herb')}
            className={`block px-6 py-4 border-b-4 border-black text-xs font-bold uppercase hover:bg-gray-100 ${
              currentPage === 'herb' ? 'bg-black text-white' : ''
            }`}
          >
            herb house
          </Link>
          <Link
            to="/delights-cafe"
            onClick={() => navigateTo('delights')}
            className={`block px-6 py-4 border-b-4 border-black text-xs font-bold uppercase hover:bg-gray-100 ${
              currentPage === 'delights' ? 'bg-black text-white' : ''
            }`}
          >
            delights
          </Link>
          <Link
            to="/collectibles"
            onClick={() => navigateTo('collectibles')}
            className={`block px-6 py-4 text-xs font-bold uppercase hover:bg-gray-100 ${
              currentPage === 'collectibles' ? 'bg-black text-white' : ''
            }`}
          >
            collectibles
          </Link>
        </nav>
      )}
    </header>
  );
};

export default Header;
