import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Star, Coffee, Leaf, Newspaper, Instagram, FileText, HelpCircle, Download, Menu, X } from 'lucide-react';

const Header = ({ cartCount }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <>
      <header className="bg-neutral-100 sticky top-0 z-50">
        <div className="flex items-start justify-between px-4 sm:px-6 py-4 sm:py-6">
          {/* Left - Brand */}
          <div className="flex-1 max-w-md">
            <Link 
              to="/"
              className="block group"
            >
              <h1 className="text-lg sm:text-xl font-fascinate leading-tight hover:opacity-60 transition-opacity">
                totally
                <br />
                baked
              </h1>
              <p className="text-xs sm:text-sm text-neutral-500 mt-1">
                {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }).toLowerCase()}
              </p>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex flex-1 justify-start items-start">
            <div className="flex gap-12">
              {/* Products */}
              <div>
                <div className="flex items-start gap-3">
                  <div className="w-12 h-16 border border-neutral-400 rounded-sm flex items-center justify-center">
                    <div className="w-6 h-6 bg-neutral-300 rounded-full"></div>
                  </div>
                  <div>
                    <h2 className="text-lg font-fascinate mb-3">products</h2>
                    <nav className="text-sm text-neutral-600 space-y-2">
                      <Link 
                        to="/shop/collectibles"
                        className="block hover:text-black transition-colors font-semibold"
                      >
                        collectibles
                      </Link>
                      <Link 
                        to="/shop/delights-cafe"
                        className="block hover:text-black transition-colors font-semibold"
                      >
                        delights café
                      </Link>
                      <Link 
                        to="/shop/herb-house"
                        className="block hover:text-black transition-colors font-semibold"
                      >
                        herb house
                      </Link>
                    </nav>
                  </div>
                </div>
              </div>

              {/* Store */}
              <div>
                <div className="flex items-start gap-3">
                  <div className="w-12 h-16 border border-neutral-400 rounded-sm flex items-center justify-center">
                    <Coffee className="w-6 h-6 text-neutral-600" />
                  </div>
                  <div>
                    <h2 className="text-lg font-fascinate mb-3">store</h2>
                    <nav className="text-sm text-neutral-600 space-y-2">
                      <Link 
                        to="/store"
                        className="block hover:text-black transition-colors font-semibold"
                      >
                        visit store
                      </Link>
                    </nav>
                  </div>
                </div>
              </div>

              {/* Now */}
              <div>
                <div className="flex items-start gap-3">
                  <div className="w-12 h-16 border border-neutral-400 rounded-sm flex items-center justify-center">
                    <Newspaper className="w-6 h-6 text-neutral-600" />
                  </div>
                  <div>
                    <h2 className="text-lg font-fascinate mb-3">now</h2>
                    <nav className="text-sm text-neutral-600 space-y-2">
                      <button className="block hover:text-black transition-colors font-semibold">
                        newsletter
                      </button>
                      <button className="block hover:text-black transition-colors font-semibold">
                        instagram
                      </button>
                      <button className="block hover:text-black transition-colors font-semibold">
                        blog
                      </button>
                    </nav>
                  </div>
                </div>
              </div>

              {/* Support */}
              <div>
                <div className="flex items-start gap-3">
                  <div className="w-12 h-16 border border-neutral-400 rounded-sm flex items-center justify-center">
                    <HelpCircle className="w-6 h-6 text-neutral-600" />
                  </div>
                  <div>
                    <h2 className="text-lg font-fascinate mb-3">support</h2>
                    <nav className="text-sm text-neutral-600 space-y-2">
                      <button className="block hover:text-black transition-colors font-semibold">
                        guides
                      </button>
                      <Link 
                        to="/downloads"
                        className="block hover:text-black transition-colors font-semibold"
                      >
                        downloads
                      </Link>
                      <button className="block hover:text-black transition-colors font-semibold">
                        support portal
                      </button>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Hamburger & Cart */}
          <div className="flex items-center gap-6 lg:hidden">
            {/* Cart Icon */}
            <Link 
              to="/checkout"
              className="relative group"
            >
              <ShoppingCart className="w-5 h-5 group-hover:opacity-60 transition-opacity" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-black text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Hamburger Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="relative w-6 h-5 flex flex-col justify-between items-center group"
            >
              <span 
                className={`absolute h-0.5 w-6 bg-black transition-all duration-300 ease-in-out transform ${
                  isMenuOpen ? 'rotate-45 translate-y-2' : 'translate-y-0'
                }`}
              />
              <span 
                className={`absolute h-0.5 w-6 bg-black transition-all duration-300 ease-in-out ${
                  isMenuOpen ? 'opacity-0' : 'opacity-100'
                }`}
              />
              <span 
                className={`absolute h-0.5 w-6 bg-black transition-all duration-300 ease-in-out transform ${
                  isMenuOpen ? '-rotate-45 -translate-y-2' : 'translate-y-4'
                }`}
              />
            </button>
          </div>

          {/* Desktop Cart Icon */}
          <div className="ml-6 hidden lg:block">
            <Link 
              to="/checkout"
              className="relative group"
            >
              <ShoppingCart className="w-5 h-5 group-hover:opacity-60 transition-opacity" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-black text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile Menu with Smoky Animation */}
      <div 
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-700 ease-in-out ${
          isMenuOpen 
            ? 'opacity-100 pointer-events-auto' 
            : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Smoky Background Overlay */}
        <div 
          className={`absolute inset-0 bg-black transition-all duration-700 ease-in-out ${
            isMenuOpen ? 'opacity-80' : 'opacity-0'
          }`}
          onClick={() => setIsMenuOpen(false)}
        >
          {/* Smoky Effect */}
          <div className="absolute inset-0">
            <div className={`absolute top-0 left-0 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 transition-all duration-1000 ease-in-out ${
              isMenuOpen ? 'translate-x-0 translate-y-0' : '-translate-x-full -translate-y-full'
            }`} />
            <div className={`absolute top-0 right-0 w-96 h-96 bg-yellow-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 transition-all duration-1000 ease-in-out delay-100 ${
              isMenuOpen ? 'translate-x-0 translate-y-0' : 'translate-x-full -translate-y-full'
            }`} />
            <div className={`absolute bottom-0 left-0 w-96 h-96 bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 transition-all duration-1000 ease-in-out delay-200 ${
              isMenuOpen ? 'translate-x-0 translate-y-0' : '-translate-x-full translate-y-full'
            }`} />
            <div className={`absolute bottom-0 right-0 w-96 h-96 bg-green-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 transition-all duration-1000 ease-in-out delay-300 ${
              isMenuOpen ? 'translate-x-0 translate-y-0' : 'translate-x-full translate-y-full'
            }`} />
          </div>
        </div>

        {/* Menu Content */}
        <div 
          className={`relative h-full w-full max-w-sm bg-white transition-all duration-700 ease-in-out transform ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          } ml-auto overflow-y-auto`}
        >
          {/* Menu Header */}
          <div className="sticky top-0 bg-white border-b border-black px-6 py-4 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold">menu</h2>
              <p className="text-sm text-neutral-500">navigate</p>
            </div>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="w-8 h-8 flex items-center justify-center border border-black rounded hover:bg-black hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Menu Items */}
          <div className="px-6 py-6 space-y-8">
            {/* Products Section */}
            <div>
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <div className="w-8 h-8 border border-black rounded-sm flex items-center justify-center">
                  <div className="w-4 h-4 bg-neutral-300 rounded-full"></div>
                </div>
                products
              </h3>
              <nav className="space-y-3 ml-10">
                <Link 
                  to="/shop/collectibles"
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-lg font-semibold hover:text-green-600 transition-colors"
                >
                  collectibles
                </Link>
                <Link 
                  to="/shop/delights-cafe"
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-lg font-semibold hover:text-orange-600 transition-colors"
                >
                  delights café
                </Link>
                <Link 
                  to="/shop/herb-house"
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-lg font-semibold hover:text-green-600 transition-colors"
                >
                  herb house
                </Link>
              </nav>
            </div>

            {/* Store Section */}
            <div>
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <div className="w-8 h-8 border border-black rounded-sm flex items-center justify-center">
                  <Coffee className="w-4 h-4 text-neutral-600" />
                </div>
                store
              </h3>
              <nav className="space-y-3 ml-10">
                <Link 
                  to="/store"
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-lg font-semibold hover:text-black transition-colors"
                >
                  visit store
                </Link>
              </nav>
            </div>

            {/* Now Section */}
            <div>
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <div className="w-8 h-8 border border-black rounded-sm flex items-center justify-center">
                  <Newspaper className="w-4 h-4 text-neutral-600" />
                </div>
                now
              </h3>
              <nav className="space-y-3 ml-10">
                <button className="block text-lg font-semibold hover:text-black transition-colors text-left">
                  newsletter
                </button>
                <button className="block text-lg font-semibold hover:text-black transition-colors text-left">
                  instagram
                </button>
                <button className="block text-lg font-semibold hover:text-black transition-colors text-left">
                  blog
                </button>
              </nav>
            </div>

            {/* Support Section */}
            <div>
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <div className="w-8 h-8 border border-black rounded-sm flex items-center justify-center">
                  <HelpCircle className="w-4 h-4 text-neutral-600" />
                </div>
                support
              </h3>
              <nav className="space-y-3 ml-10">
                <button className="block text-lg font-semibold hover:text-black transition-colors text-left">
                  guides
                </button>
                <Link 
                  to="/downloads"
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-lg font-semibold hover:text-black transition-colors"
                >
                  downloads
                </Link>
                <button className="block text-lg font-semibold hover:text-black transition-colors text-left">
                  support portal
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
