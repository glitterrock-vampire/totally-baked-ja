import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import StorePage from './pages/StorePage';
import CheckoutPage from './pages/CheckoutPage';
import ProductPage from './pages/ProductPage';
import DownloadsPage from './pages/DownloadsPage';
import { useCart } from './hooks/useCart';

const TotallyBaked = () => {
  const { cartCount, cartItems, cartTotal, addToCart, removeFromCart, updateQuantity, clearCart } = useCart();

  return (
    <Router>
      <div className="min-h-screen bg-neutral-50 font-mono">
        <Routes>
          <Route 
            path="/" 
            element={<HomePage cartCount={cartCount} />} 
          />
          <Route 
            path="/shop/:shopId" 
            element={<ShopPage cartCount={cartCount} addToCart={addToCart} />} 
          />
          <Route 
            path="/product/:productId" 
            element={<ProductPage cartCount={cartCount} addToCart={addToCart} />} 
          />
          <Route 
            path="/store" 
            element={<StorePage cartCount={cartCount} />} 
          />
          <Route 
            path="/checkout" 
            element={
              <CheckoutPage 
                cartCount={cartCount} 
                cartItems={cartItems}
                removeFromCart={removeFromCart}
                updateQuantity={updateQuantity}
                clearCart={clearCart}
              />
            } 
          />
          <Route 
            path="/downloads" 
            element={<DownloadsPage cartCount={cartCount} />} 
          />
        </Routes>
      </div>
    </Router>
  );
};

export default TotallyBaked;
