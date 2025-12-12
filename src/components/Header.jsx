import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.jsx';

const Header = ({ cartCount, currentPage, setCurrentPage }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();

  // Debug: Log user state
  console.log('Header - User state:', user);

  const navigateTo = (page) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
  };

  const handleLogout = async () => {
    await logout();
    setProfileDropdownOpen(false);
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
        
        <div className="hidden lg:flex items-center border-l-4 border-black relative">
          <button
            onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
            className="px-4 text-xs font-medium hover:text-tb-orange transition-colors flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span>Profile</span>
          </button>
          
          {profileDropdownOpen && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-white border-2 border-black shadow-lg z-50">
              <div className="py-2">
                {user ? (
                  <>
                    <div className="px-4 py-2 text-xs font-medium border-b border-gray-200">
                      Hi, {user.email?.split('@')[0]}
                    </div>
                    <Link
                      to="/orders"
                      onClick={() => setProfileDropdownOpen(false)}
                      className="block px-4 py-2 text-xs hover:bg-gray-100 transition-colors"
                    >
                      Order History
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-xs hover:bg-gray-100 transition-colors"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => setProfileDropdownOpen(false)}
                    className="block px-4 py-2 text-xs hover:bg-gray-100 transition-colors"
                  >
                    Login
                  </Link>
                )}
              </div>
            </div>
          )}
        </div>
        
        <Link
          to="/checkout"
          className="hidden lg:flex w-20 border-l-4 border-black items-center justify-center hover:bg-tb-orange hover:text-white transition-colors relative"
        >
          <span className="font-mono text-lg font-bold">{cartCount}</span>
          {cartCount > 0 && (
            <span className="absolute top-2 right-2 w-2 h-2 bg-tb-orange rounded-full"></span>
          )}
        </Link>
        
        {/* Mobile right-side elements */}
        <div className="lg:hidden flex items-center ml-auto">
          <Link
            to="/checkout"
            className="w-16 border-l-4 border-black flex items-center justify-center hover:bg-tb-orange hover:text-white transition-colors relative"
          >
            <span className="font-mono text-lg font-bold">{cartCount}</span>
            {cartCount > 0 && (
              <span className="absolute top-2 right-2 w-2 h-2 bg-tb-orange rounded-full"></span>
            )}
          </Link>
          
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-16 border-l-4 border-black flex items-center justify-center hover:bg-gray-100"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
              <path strokeLinecap="square" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
      
      {mobileMenuOpen && (
        <nav className="lg:hidden border-t-4 border-black">
          <Link
            to="/herb-house"
            onClick={() => navigateTo('herb')}
            className={`block px-6 py-4 border-b-4 border-black text-xs font-bold uppercase hover:bg-gray-100 text-center ${
              currentPage === 'herb' ? 'bg-black text-white' : ''
            }`}
          >
            herb house
          </Link>
          <Link
            to="/delights-cafe"
            onClick={() => navigateTo('delights')}
            className={`block px-6 py-4 border-b-4 border-black text-xs font-bold uppercase hover:bg-gray-100 text-center ${
              currentPage === 'delights' ? 'bg-black text-white' : ''
            }`}
          >
            delights
          </Link>
          <Link
            to="/collectibles"
            onClick={() => navigateTo('collectibles')}
            className={`block px-6 py-4 text-xs font-bold uppercase hover:bg-gray-100 text-center ${
              currentPage === 'collectibles' ? 'bg-black text-white' : ''
            }`}
          >
            collectibles
          </Link>
          
          {/* Profile dropdown for mobile */}
          <div className="relative">
            <button
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              className="block w-full text-left px-6 py-4 border-t-4 border-black text-xs font-bold uppercase hover:bg-gray-100 flex items-center justify-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Profile
            </button>
            
            {profileDropdownOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-white border-2 border-black shadow-lg z-50">
                <div className="py-2">
                  {user ? (
                    <>
                      <div className="px-4 py-2 text-xs font-medium border-b border-gray-200">
                        Hi, {user.email?.split('@')[0]}
                      </div>
                      <Link
                        to="/orders"
                        onClick={() => {
                          setProfileDropdownOpen(false);
                          setMobileMenuOpen(false);
                        }}
                        className="block px-4 py-2 text-xs hover:bg-gray-100 transition-colors"
                      >
                        Order History
                      </Link>
                      <button
                        onClick={() => {
                          handleLogout();
                          setMobileMenuOpen(false);
                        }}
                        className="block w-full text-left px-4 py-2 text-xs hover:bg-gray-100 transition-colors"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <Link
                      to="/login"
                      onClick={() => {
                        setProfileDropdownOpen(false);
                        setMobileMenuOpen(false);
                      }}
                      className="block px-4 py-2 text-xs hover:bg-gray-100 transition-colors"
                    >
                      Login
                    </Link>
                  )}
                </div>
              </div>
            )}
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
