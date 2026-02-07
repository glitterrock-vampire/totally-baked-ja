import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSanityProducts } from '../hooks/useSanity';
import { useAuth } from '../hooks/useAuth.jsx';
import MarleyVideo from '../assets/images/Bob Marley interview on Marijuana (Trench Town Kingston, Jamaica).mp4';

const VisualCollageHome = () => {
  const location = useLocation();
  console.log('Current pathname:', location.pathname);
  const { user, logout } = useAuth();
  const [currentPage, setCurrentPage] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const [ageVerified, setAgeVerified] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quickViewQuantity, setQuickViewQuantity] = useState(1);
  const [cart, setCart] = useState([]);

  // Fetch products from Sanity
  const {
    products,
    shops,
    homepage,
    collections,
    loading,
    error,
    featuredProduct,
    herbProducts,
    delightProducts,
    collectibleProducts,
    mostSoldItems,
    tickerMessages,
    categorySections,
    getImageUrl
  } = useSanityProducts();

  // Effects
  useEffect(() => {
    const storedCart = localStorage.getItem('tb-cart');
    const storedAge = localStorage.getItem('tb-age-verified');
    if (storedCart) setCart(JSON.parse(storedCart));
    if (storedAge === 'true') {
      setAgeVerified(true);
    } else {
      setAgeVerified(false);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tb-cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    if (!newsletterSuccess) return;
    const timer = setTimeout(() => setNewsletterSuccess(false), 3000);
    return () => clearTimeout(timer);
  }, [newsletterSuccess]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') closeAll();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Computed values
  const cartCount = useMemo(() => cart.reduce((sum, item) => sum + item.quantity, 0), [cart]);
  const cartTotal = useMemo(() => cart.reduce((sum, item) => sum + item.price * item.quantity, 0), [cart]);

  // Functions
  const closeAll = useCallback(() => {
    setCartOpen(false);
    setQuickViewOpen(false);
    setMobileMenuOpen(false);
  }, []);

  const navigateTo = (page) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const verifyAge = (verified) => {
    if (verified) {
      setAgeVerified(true);
      localStorage.setItem('tb-age-verified', 'true');
    } else {
      window.location.href = 'https://www.google.com';
    }
  };

  const addToCart = (product, quantity = 1) => {
    if (!product || !product._id) return;
    
    setCart((prev) => {
      const index = prev.findIndex((item) => item._id === product._id);
      if (index >= 0) {
        const next = [...prev];
        next[index] = { ...next[index], quantity: next[index].quantity + quantity };
        return next;
      }
      return [...prev, { ...product, quantity }];
    });
  };

  const updateQuantity = (index, delta) => {
    setCart((prev) => {
      const next = [...prev];
      next[index].quantity += delta;
      if (next[index].quantity <= 0) next.splice(index, 1);
      return next;
    });
  };

  const removeFromCart = (index) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  const openQuickView = (product) => {
    setSelectedProduct(product);
    setQuickViewQuantity(1);
    setQuickViewOpen(true);
  };

  const addToCartFromQuickView = () => {
    if (!selectedProduct) return;
    addToCart(selectedProduct, quickViewQuantity);
    setQuickViewOpen(false);
    setQuickViewQuantity(1);
    setCartOpen(true);
  };

  const submitNewsletter = (event) => {
    event.preventDefault();
    if (!newsletterEmail) return;
    setNewsletterSuccess(true);
    setNewsletterEmail('');
  };

  const checkout = () => {
    alert(`checkout: $${cartTotal.toFixed(2)}`);
  };

  return (
    <div className="bg-white text-black font-sans" style={{ minHeight: '100vh' }}>
      <div className="flex flex-col w-full">
        {/* Header */}
        <header className="sticky top-0 z-50 bg-white border-b-4 border-black">
          <div className="flex items-stretch">
            <div className="w-48 border-r-4 border-black p-4 flex items-center lg:w-48 md:w-40 sm:w-32 max-sm:w-28">
              <button type="button" onClick={() => navigateTo('home')} className="text-xl font-black lowercase tracking-tight hover:opacity-60 transition-opacity md:text-lg sm:text-base max-sm:text-sm">
                totally baked
              </button>
            </div>
            <nav className="hidden lg:flex flex-1">
              {[{ label: 'herb house', page: 'herb' }, { label: 'delights', page: 'delights' }, { label: 'collectibles', page: 'collectibles' }].map((nav) => {
                const shopUrl = `/shop/${nav.page === 'herb' ? 'herb-house' : nav.page === 'delights' ? 'delights-cafe' : 'collectibles'}`;
                const isActive = location.pathname === shopUrl;
                return (
                <Link 
                  key={nav.page}
                  to={shopUrl}
                  className={`flex-1 flex items-center justify-center border-r-4 border-black text-xs font-bold uppercase tracking-wider hover:bg-black hover:text-white transition-colors ${isActive ? 'bg-black text-white' : ''}`}
                >
                  {nav.label}
                </Link>
                );
              })}
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
                          onClick={() => {
                            logout();
                            setProfileDropdownOpen(false);
                          }}
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
            <button type="button" onClick={() => setCartOpen(true)} className="hidden lg:flex w-20 border-l-4 border-black items-center justify-center hover:bg-tb-orange hover:text-white transition-colors relative">
              <span className="font-mono text-lg font-bold">{cartCount}</span>
              {cartCount > 0 && <span className="absolute top-2 right-2 w-2 h-2 bg-tb-orange rounded-full" />}
            </button>
            {/* Mobile right-side elements */}
            <div className="lg:hidden flex items-center ml-auto">
              <button type="button" onClick={() => setCartOpen(true)} className="w-20 border-l-4 border-black flex items-center justify-center hover:bg-tb-orange hover:text-white transition-colors relative md:w-20 sm:w-18 max-sm:w-16">
                <span className="font-mono text-lg font-bold md:text-lg sm:text-base max-sm:text-sm">{cartCount}</span>
                {cartCount > 0 && <span className="absolute top-2 right-2 w-2 h-2 bg-tb-orange rounded-full" />}
              </button>
              <button type="button" onClick={() => setMobileMenuOpen((prev) => !prev)} className="w-20 border-l-4 border-black flex items-center justify-center hover:bg-gray-100 md:w-20 sm:w-18 max-sm:w-16">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-6 sm:h-5 max-sm:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                  <path strokeLinecap="square" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
          {mobileMenuOpen && (
            <nav className="lg:hidden border-t-4 border-black">
              {[{ label: 'herb house', page: 'herb' }, { label: 'delights', page: 'delights' }, { label: 'collectibles', page: 'collectibles' }].map((nav, idx) => {
                const shopUrl = `/shop/${nav.page === 'herb' ? 'herb-house' : nav.page === 'delights' ? 'delights-cafe' : 'collectibles'}`;
                const isActive = location.pathname === shopUrl;
                return (
                <Link 
                  key={nav.page}
                  to={shopUrl}
                  className={`block w-full text-left px-6 py-4 ${idx < 2 ? 'border-b-4 border-black' : ''} text-xs font-bold uppercase hover:bg-gray-100 ${isActive ? 'bg-black text-white' : ''}`}
                >
                  {nav.label}
                </Link>
                );
              })}
              
              {/* Profile dropdown for mobile */}
              <div className="relative">
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="block w-full text-left px-6 py-4 border-t-4 border-black text-xs font-bold uppercase hover:bg-gray-100 flex items-center gap-2"
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
                              logout();
                              setProfileDropdownOpen(false);
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

        {/* HOME PAGE */}
        {currentPage === 'home' && (
          <>
            {/* Hero */}
            <section className="border-b-4 border-black">
              <div className="grid grid-cols-1 lg:grid-cols-12">
                <div className="lg:col-span-8 p-8 lg:p-16 border-b-4 lg:border-b-0 lg:border-r-4 border-black min-h-[500px] flex flex-col justify-between bg-[#f5f5f5]">
                  <div className="mb-12">
                    <div className="font-mono text-[10px] uppercase tracking-widest mb-6 opacity-50">system online / v4.20</div>
                    <h1 className="text-7xl lg:text-9xl font-black lowercase leading-[0.85] mb-8">
                    {(homepage?.heroHeadline || 'precision\nengineered\ncannabis').split('\n').map((line, idx) => (
                      <React.Fragment key={idx}>
                        <span className={line === 'cannabis' ? 'text-sage-green' : ''}>
                          {line}
                        </span>
                        {idx < 2 && <br />}
                      </React.Fragment>
                    ))}
                  </h1>
                  </div>
                  <div className="max-w-md">
                    <p className="text-sm leading-relaxed mb-8 font-light">{homepage?.heroDescription || 'we design botanical experiences with industrial precision. our products are calibrated for optimal performance. no fillers. no compromises.'}</p>
                    <Link to="/shop/herb-house" className="inline-block bg-black text-white px-8 py-4 text-xs font-bold uppercase tracking-wider hover:bg-tb-orange transition-colors">explore products</Link>
                  </div>
                </div>
                {featuredProduct && (
                  <button type="button" onClick={() => openQuickView(featuredProduct)} className="lg:col-span-4 relative overflow-hidden group cursor-pointer min-h-[400px]">
                    <img src={getImageUrl(featuredProduct.images?.[0])} alt={featuredProduct.name} className="w-full h-full object-cover transition-all duration-500" />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                    <div className="absolute bottom-0 left-0 w-full p-6 bg-white/95 border-t-4 border-black">
                      <div className="font-mono text-[10px] uppercase tracking-widest mb-2 opacity-50">featured</div>
                      <div className="font-bold text-xl lowercase mb-1">{featuredProduct.name}</div>
                      <div className="flex justify-between items-center text-xs font-mono">
                        <span>{featuredProduct.thc || featuredProduct.weight || 'premium'}</span>
                        <span className="font-bold">${featuredProduct.price}</span>
                      </div>
                    </div>
                  </button>
                )}
              </div>
            </section>

            {/* Ticker */}
            <div className="border-b-4 border-black bg-tb-orange text-black py-2 overflow-hidden">
              <div className="whitespace-nowrap animate-marquee">
                {tickerMessages.map((text, idx) => (
                  <span key={idx} className="inline-block font-mono text-xs font-bold uppercase tracking-widest px-8">{text}</span>
                ))}
                {tickerMessages.map((text, idx) => (
                  <span key={`repeat-${idx}`} className="inline-block font-mono text-xs font-bold uppercase tracking-widest px-8">{text}</span>
                ))}
              </div>
            </div>

            {/* Categories */}
            <section className="border-b-4 border-black">
              <div className="grid grid-cols-1 md:grid-cols-3">
                {categorySections.map((cat, idx) => (
                  <Link
                    key={cat.slug?.current || idx}
                    to={`/shop/${cat.slug?.current || 'herb-house'}`}
                    className={`category-card p-12 text-center hover:bg-black hover:text-white transition-colors cursor-pointer group border-black ${idx < 2 ? 'border-b-4 md:border-b-0' : ''} ${idx !== 2 ? 'md:border-r-4' : ''}`}
                  >
                    <div className="category-icon mb-6 flex justify-center">
                      <svg className="w-24 h-24" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                        {cat.icon === 'leaf' && <path d="M50 10 C30 20, 20 35, 25 50 C20 35, 15 25, 10 30 C15 40, 20 55, 30 65 M50 10 C70 20, 80 35, 75 50 C80 35, 85 25, 90 30 C85 40, 80 55, 70 65 M50 10 L50 90 M30 65 C35 75, 42 85, 50 90 M70 65 C65 75, 58 85, 50 90" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />}
                        {cat.icon === 'coffee' && <><rect x="30" y="20" width="40" height="50" rx="5" stroke="currentColor" strokeWidth="2.5" /><path d="M35 30 L65 30 M35 40 L65 40 M35 50 L65 50 M35 60 L65 60" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" /><circle cx="50" cy="80" r="8" stroke="currentColor" strokeWidth="2.5" /><path d="M50 72 L50 20 M50 20 L45 25 M50 20 L55 25" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></>}
                        {cat.icon === 'star' && <><circle cx="50" cy="35" r="20" stroke="currentColor" strokeWidth="2.5" /><circle cx="50" cy="35" r="12" stroke="currentColor" strokeWidth="2.5" /><path d="M30 35 L20 35 M70 35 L80 35 M50 15 L50 5 M50 55 L50 65" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" /><rect x="35" y="65" width="30" height="25" rx="3" stroke="currentColor" strokeWidth="2.5" /><path d="M42 75 L58 75 M42 82 L58 82" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" /></>}
                        {!cat.icon && <circle cx="50" cy="50" r="25" stroke="currentColor" strokeWidth="2.5" />}
                      </svg>
                    </div>
                    <h3 className="text-2xl font-black lowercase mb-2">{cat.title}</h3>
                    <p className="text-xs font-mono uppercase tracking-wider opacity-50 group-hover:opacity-100">{cat.subtitle}</p>
                  </Link>
                ))}
              </div>
            </section>

            {/* Most Sold */}
            <section className="border-b-4 border-black">
              <div className="p-8 lg:p-12 bg-[#f5f5f5] border-b-4 border-black">
                <div className="font-mono text-[10px] uppercase tracking-widest mb-4 opacity-50">best sellers</div>
                <h2 className="text-4xl lg:text-5xl font-black lowercase">most sold items</h2>
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-4">
                {mostSoldItems && mostSoldItems.map((product) => (
                  <div key={product._id} className="border-r-4 border-b-4 border-black product-grid-item cursor-pointer">
                    <div onClick={() => openQuickView(product)} className="w-full aspect-square relative overflow-hidden bg-gray-100 border-b-4 border-black group cursor-pointer">
                      <img src={getImageUrl(product.images?.[0])} alt={product.name} className="w-full h-full object-cover transition-all duration-300" />
                      <div className="absolute top-0 left-0 w-full p-3 flex justify-between items-start">
                        <span className="bg-white px-2 py-1 text-[9px] font-bold uppercase tracking-wider">{product.category || product.type}</span>
                        <button type="button" onClick={(e) => { e.stopPropagation(); addToCart(product); }} className="bg-black text-white w-8 h-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-tb-orange">
                          <span className="text-xl leading-none">+</span>
                        </button>
                      </div>
                      <div className="absolute top-3 right-3 bg-tb-orange text-black px-2 py-1 text-[9px] font-bold uppercase">best seller</div>
                    </div>
                    <div className="p-4 bg-white">
                      <div className="font-bold text-sm lowercase mb-1">{product.name}</div>
                      <div className="flex justify-between items-center">
                        <span className="font-mono text-xs opacity-50">{product.thc || product.weight || product.strain || 'premium'}</span>
                        <span className="font-mono text-sm font-bold price-tag">${product.price}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Video */}
            <section className="border-b-4 border-black bg-black">
              <div className="w-full px-0 lg:px-0">
                <video
                  src={MarleyVideo}
                  className="w-full h-auto"
                  controls
                />
              </div>
            </section>

            {/* Newsletter */}
            <section className="border-b-4 border-black">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="p-8 lg:p-16 border-b-4 lg:border-b-0 lg:border-r-4 border-black bg-black text-white">
                  <div className="font-mono text-[10px] uppercase tracking-widest mb-6 opacity-50">newsletter</div>
                  <h3 className="text-4xl font-black lowercase mb-6">join the lab</h3>
                  <p className="text-sm mb-8 font-light">subscribe for product drops, system updates, and experimental releases.</p>
                  <form onSubmit={submitNewsletter} className="flex border-4 border-white">
                    <input type="email" value={newsletterEmail} onChange={(e) => setNewsletterEmail(e.target.value)} placeholder="email address" required className="bg-transparent text-white px-4 py-3 w-full text-sm lowercase focus:outline-none placeholder-gray-500" />
                    <button type="submit" className="bg-white text-black px-6 py-3 text-xs font-bold uppercase hover:bg-tb-orange hover:text-white transition-colors">submit</button>
                  </form>
                  {newsletterSuccess && <p className="mt-4 text-xs font-mono text-tb-green">✓ subscription confirmed</p>}
                </div>
                <div className="p-8 lg:p-16 bg-[#f5f5f5]">
                  <div className="font-mono text-[10px] uppercase tracking-widest mb-6 opacity-50">information</div>
                  <div className="grid grid-cols-2 gap-8 mb-12">
                    <div>
                      <h4 className="font-bold text-xs uppercase mb-3 tracking-wider">support</h4>
                      <ul className="text-xs space-y-2 font-light">
                        <li><a href="#" className="hover:underline">shipping</a></li>
                        <li><a href="#" className="hover:underline">returns</a></li>
                        <li><a href="#" className="hover:underline">faq</a></li>
                        <li><a href="#" className="hover:underline">contact</a></li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-bold text-xs uppercase mb-3 tracking-wider">legal</h4>
                      <ul className="text-xs space-y-2 font-light">
                        <li><a href="#" className="hover:underline">terms</a></li>
                        <li><a href="#" className="hover:underline">privacy</a></li>
                        <li><a href="#" className="hover:underline">compliance</a></li>
                        <li><a href="#" className="hover:underline">age verify</a></li>
                      </ul>
                    </div>
                  </div>
                  <div className="text-xs font-mono opacity-50">
                    <div className="mb-1">kingston, jamaica</div>
                    <div>17.9712°n / 76.7928°w</div>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}

        {/* HERB PAGE */}
        {currentPage === 'herb' && (
          <section className="border-b-4 border-black">
            <div className="p-8 lg:p-16 bg-[#f5f5f5] border-b-4 border-black">
              <div className="font-mono text-[10px] uppercase tracking-widest mb-4 opacity-50">category / flower</div>
              <h1 className="text-6xl lg:text-8xl font-black lowercase mb-6">herb house</h1>
              <p className="text-sm max-w-2xl font-light">premium cannabis flower. strain-specific cultivation. lab tested for potency and purity.</p>
            </div>
            {loading ? (
              <div className="p-8 text-center">
                <p className="text-sm font-mono">Loading products...</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 lg:grid-cols-4">
                {herbProducts.map((product) => (
                  <div key={product._id} className="border-r-4 border-b-4 border-black product-grid-item cursor-pointer">
                    <div onClick={() => openQuickView(product)} className="w-full aspect-square relative overflow-hidden bg-gray-100 border-b-4 border-black group cursor-pointer">
                      <img src={getImageUrl(product.images?.[0])} alt={product.name} className="w-full h-full object-cover transition-all duration-300" />
                      <div className="absolute top-0 left-0 w-full p-3 flex justify-between items-start">
                        <span className="bg-white px-2 py-1 text-[9px] font-bold uppercase tracking-wider">{product.category || product.type}</span>
                        <button type="button" onClick={(e) => { e.stopPropagation(); addToCart(product); }} className="bg-black text-white w-8 h-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-tb-orange">
                          <span className="text-xl leading-none">+</span>
                        </button>
                      </div>
                    </div>
                    <div className="p-4 bg-white">
                      <div className="font-bold text-sm lowercase mb-1">{product.name}</div>
                      <div className="flex justify-between items-center">
                        <span className="font-mono text-xs opacity-50">{product.thc || product.weight || product.strain || 'premium'}</span>
                        <span className="font-mono text-sm font-bold price-tag">${product.price}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {/* DELIGHTS PAGE */}
        {currentPage === 'delights' && (
          <section className="border-b-4 border-black">
            <div className="p-8 lg:p-16 bg-[#f5f5f5] border-b-4 border-black">
              <div className="font-mono text-[10px] uppercase tracking-widest mb-4 opacity-50">category / edibles</div>
              <h1 className="text-6xl lg:text-8xl font-black lowercase mb-6">delights</h1>
              <p className="text-sm max-w-2xl font-light">precision-dosed edibles. consistent effects. gourmet ingredients. lab verified potency.</p>
            </div>
            {loading ? (
              <div className="p-8 text-center">
                <p className="text-sm font-mono">Loading products...</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 lg:grid-cols-4">
                {delightProducts.map((product) => (
                  <div key={product._id} className="border-r-4 border-b-4 border-black product-grid-item cursor-pointer">
                    <div onClick={() => openQuickView(product)} className="w-full aspect-square relative overflow-hidden bg-gray-100 border-b-4 border-black group cursor-pointer">
                      <img src={getImageUrl(product.images?.[0])} alt={product.name} className="w-full h-full object-cover transition-all duration-300" />
                      <div className="absolute top-0 left-0 w-full p-3 flex justify-between items-start">
                        <span className="bg-white px-2 py-1 text-[9px] font-bold uppercase tracking-wider">{product.category || product.type}</span>
                        <button type="button" onClick={(e) => { e.stopPropagation(); addToCart(product); }} className="bg-black text-white w-8 h-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-tb-orange">
                          <span className="text-xl leading-none">+</span>
                        </button>
                      </div>
                    </div>
                    <div className="p-4 bg-white">
                      <div className="font-bold text-sm lowercase mb-1">{product.name}</div>
                      <div className="flex justify-between items-center">
                        <span className="font-mono text-xs opacity-50">{product.thc || product.weight || product.strain || 'premium'}</span>
                        <span className="font-mono text-sm font-bold price-tag">${product.price}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {/* COLLECTIBLES PAGE */}
        {currentPage === 'collectibles' && (
          <section className="border-b-4 border-black">
            <div className="p-8 lg:p-16 bg-[#f5f5f5] border-b-4 border-black">
              <div className="font-mono text-[10px] uppercase tracking-widest mb-4 opacity-50">category / hardware</div>
              <h1 className="text-6xl lg:text-8xl font-black lowercase mb-6">collectibles</h1>
              <p className="text-sm max-w-2xl font-light">premium accessories and apparel. engineered for performance. designed for enthusiasts.</p>
            </div>
            {loading ? (
              <div className="p-8 text-center">
                <p className="text-sm font-mono">Loading products...</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 lg:grid-cols-4">
                {collectibleProducts.map((product) => (
                  <div key={product._id} className="border-r-4 border-b-4 border-black product-grid-item cursor-pointer">
                    <div onClick={() => openQuickView(product)} className="w-full aspect-square relative overflow-hidden bg-gray-100 border-b-4 border-black group cursor-pointer">
                      <img src={getImageUrl(product.images?.[0])} alt={product.name} className="w-full h-full object-cover transition-all duration-300" />
                      <div className="absolute top-0 left-0 w-full p-3 flex justify-between items-start">
                        <span className="bg-white px-2 py-1 text-[9px] font-bold uppercase tracking-wider">{product.category || product.type}</span>
                        <button type="button" onClick={(e) => { e.stopPropagation(); addToCart(product); }} className="bg-black text-white w-8 h-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-tb-orange">
                          <span className="text-xl leading-none">+</span>
                        </button>
                      </div>
                    </div>
                    <div className="p-4 bg-white">
                      <div className="font-bold text-sm lowercase mb-1">{product.name}</div>
                      <div className="flex justify-between items-center">
                        <span className="font-mono text-xs opacity-50">{product.thc || product.weight || product.strain || 'premium'}</span>
                        <span className="font-mono text-sm font-bold price-tag">${product.price}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}
      </div>

      {/* Cart Sidebar */}
      {cartOpen && (
        <div onClick={() => setCartOpen(false)} className="fixed inset-0 z-[100] modal-backdrop">
          <div onClick={(e) => e.stopPropagation()} className="absolute right-0 top-0 h-full w-full md:w-[450px] bg-white border-l-4 border-black flex flex-col">
            <div className="border-b-4 border-black p-6 flex justify-between items-center">
              <h3 className="text-xl font-black lowercase">cart <span className="font-mono text-sm">({cart.length})</span></h3>
              <button type="button" onClick={() => setCartOpen(false)} className="w-10 h-10 border-4 border-black flex items-center justify-center hover:bg-black hover:text-white transition-colors">
                <span className="text-xl leading-none">×</span>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6">
              {cart.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-sm mb-6 opacity-50">cart is empty</p>
                  <Link to="/shop/herb-house" onClick={() => setCartOpen(false)} className="bg-black text-white px-6 py-3 text-xs font-bold uppercase hover:bg-tb-orange transition-colors block text-center">
                    start shopping
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item, index) => (
                    <div key={index} className="border-4 border-black p-4 flex gap-4 hover:bg-gray-50 transition-colors">
                      <img src={getImageUrl(item.images?.[0])} alt={item.name} className="w-20 h-20 object-cover border-2 border-black" />
                      <div className="flex-1">
                        <h4 className="font-bold text-sm lowercase mb-1">{item.name}</h4>
                        <p className="text-[10px] font-mono uppercase mb-2 opacity-50">{item.category}</p>
                        <div className="flex items-center gap-2">
                          <button type="button" onClick={() => updateQuantity(index, -1)} className="w-6 h-6 border-2 border-black flex items-center justify-center text-xs font-bold hover:bg-black hover:text-white">-</button>
                          <span className="font-mono text-sm w-8 text-center">{item.quantity}</span>
                          <button type="button" onClick={() => updateQuantity(index, 1)} className="w-6 h-6 border-2 border-black flex items-center justify-center text-xs font-bold hover:bg-black hover:text-white">+</button>
                        </div>
                      </div>
                      <div className="text-right flex flex-col justify-between">
                        <button type="button" onClick={() => removeFromCart(index)} className="text-xs opacity-50 hover:opacity-100">×</button>
                        <span className="font-mono font-bold text-sm">${(item.price * item.quantity).toFixed(0)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="border-t-4 border-black p-6 bg-gray-50">
              <div className="flex justify-between items-center mb-6 pb-4 border-b-2 border-black">
                <span className="text-xs font-bold uppercase tracking-wider">total</span>
                <span className="font-mono font-bold text-2xl">${cartTotal.toFixed(0)}</span>
              </div>
              <button type="button" onClick={checkout} className="w-full bg-black text-white py-4 text-xs font-bold uppercase tracking-wider hover:bg-tb-orange transition-colors mb-2">
                checkout
              </button>
              <button type="button" onClick={() => setCartOpen(false)} className="w-full border-4 border-black py-4 text-xs font-bold uppercase tracking-wider hover:bg-gray-100 transition-colors">
                continue shopping
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Quick View Modal */}
      {quickViewOpen && selectedProduct && (
        <div onClick={() => setQuickViewOpen(false)} className="fixed inset-0 z-[110] modal-backdrop flex items-center justify-center p-4">
          <div onClick={(e) => e.stopPropagation()} className="bg-white border-4 border-black max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="border-b-4 border-black p-4 flex justify-between items-center sticky top-0 bg-white z-10">
              <span className="font-mono text-[10px] uppercase tracking-widest">quick view</span>
              <button type="button" onClick={() => setQuickViewOpen(false)} className="w-10 h-10 border-4 border-black flex items-center justify-center hover:bg-black hover:text-white transition-colors">
                <span className="text-xl leading-none">×</span>
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="border-b-4 md:border-b-0 md:border-r-4 border-black p-8 bg-gray-50 flex items-center justify-center">
                <img src={getImageUrl(selectedProduct.images?.[0])} alt={selectedProduct.name} className="max-w-full h-auto max-h-[400px] object-contain" />
              </div>
              <div className="p-8">
                <span className="inline-block bg-black text-white text-[9px] font-bold uppercase tracking-wider px-2 py-1 mb-4">{selectedProduct.category || selectedProduct.type}</span>
                <h2 className="text-3xl font-black lowercase mb-2">{selectedProduct.name}</h2>
                <p className="text-sm mb-6 font-light">{selectedProduct.description}</p>
                <div className="border-t-2 border-b-2 border-black py-4 my-6 font-mono text-xs">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="spec-label block opacity-50 mb-1">SPECIFICATION</span>
                      <span className="font-bold">{selectedProduct.thc || selectedProduct.weight || 'premium'}</span>
                    </div>
                    <div>
                      <span className="spec-label block opacity-50 mb-1">CATEGORY</span>
                      <span className="font-bold">{selectedProduct.category || selectedProduct.type}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-3xl font-mono font-bold price-tag">${selectedProduct.price}</span>
                  <div className="flex items-center gap-2">
                    <button type="button" onClick={() => setQuickViewQuantity(Math.max(1, quickViewQuantity - 1))} className="w-10 h-10 border-4 border-black flex items-center justify-center text-sm font-bold hover:bg-black hover:text-white">-</button>
                    <span className="font-mono w-12 text-center">{quickViewQuantity}</span>
                    <button type="button" onClick={() => setQuickViewQuantity(quickViewQuantity + 1)} className="w-10 h-10 border-4 border-black flex items-center justify-center text-sm font-bold hover:bg-black hover:text-white">+</button>
                  </div>
                </div>
                <button type="button" onClick={addToCartFromQuickView} className="w-full bg-black text-white py-4 text-xs font-bold uppercase tracking-wider hover:bg-tb-orange transition-colors mb-2">
                  add to cart
                </button>
                <button type="button" onClick={() => setQuickViewOpen(false)} className="w-full border-4 border-black py-4 text-xs font-bold uppercase tracking-wider hover:bg-gray-100 transition-colors">
                  continue shopping
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Age Verification - Always on top */}
      {!ageVerified && (
        <div className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center p-4" style={{ pointerEvents: 'auto' }}>
          <div className="bg-white border-4 border-black max-w-md w-full p-12 text-center" style={{ pointerEvents: 'auto' }}>
            <h2 className="text-4xl font-black lowercase mb-6">age verification</h2>
            <p className="text-sm mb-8 font-light">you must be 21+ to access this site</p>
            <div className="flex gap-4">
              <button type="button" onClick={() => verifyAge(true)} className="flex-1 bg-black text-white py-4 text-xs font-bold uppercase hover:bg-tb-orange transition-colors">
                i'm 21+
              </button>
              <button type="button" onClick={() => verifyAge(false)} className="flex-1 border-4 border-black py-4 text-xs font-bold uppercase hover:bg-gray-100 transition-colors">
                exit
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .modal-backdrop { backdrop-filter: blur(8px); background: rgba(0, 0, 0, 0.85); }
        .video-container { position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; }
        .video-container iframe { position: absolute; top: 0; left: 0; width: 100%; height: 100%; }
        .product-grid-item { transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1); }
        .product-grid-item:hover { transform: translateY(-2px); }
        .category-icon { transition: all 0.3s ease; }
        .category-card:hover .category-icon { transform: scale(1.1); }
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-100%); } }
        .animate-marquee { animation: marquee 20s linear infinite; }
      `}</style>
    </div>
  );
};

export default VisualCollageHome;
