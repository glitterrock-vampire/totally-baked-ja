import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth.jsx';
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import ProductPage from './pages/ProductPage';
import StorePage from './pages/StorePage';
import ShopDetail from './components/ShopDetail';
import CheckoutPage from './pages/CheckoutPage';
import DownloadsPage from './pages/DownloadsPage';
import Login from './pages/Login';
import Register from './pages/Register';
import OrderHistory from './pages/OrderHistory';
import OrderConfirmation from './pages/OrderConfirmation';
import { useCart } from './hooks/useCart.js';

const AppContent = () => {
  const { cartCount, cartItems, cartTotal, addToCart, removeFromCart, updateQuantity, clearCart } = useCart();

  return (
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
          path="/herb-house" 
          element={<ShopPage cartCount={cartCount} addToCart={addToCart} shopId="herb-house" />} 
        />
        <Route 
          path="/delights-cafe" 
          element={<ShopPage cartCount={cartCount} addToCart={addToCart} shopId="delights-cafe" />} 
        />
        <Route 
          path="/collectibles" 
          element={<ShopPage cartCount={cartCount} addToCart={addToCart} shopId="collectibles" />} 
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
        <Route 
          path="/login" 
          element={<Login />} 
        />
        <Route 
          path="/register" 
          element={<Register />} 
        />
        <Route 
          path="/orders" 
          element={<OrderHistory />} 
        />
        <Route 
          path="/order-confirmation" 
          element={<OrderConfirmation />} 
        />
      </Routes>
    </div>
  );
};

const TotallyBaked = () => {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
};

export default TotallyBaked;
