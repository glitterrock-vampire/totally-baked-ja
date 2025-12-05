import { useState } from 'react';

export const useCart = () => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems(prevItems => {
      // Check if product already exists in cart
      const existingItem = prevItems.find(item => 
        item.name === product.name && item.type === product.type
      );
      
      if (existingItem) {
        // Update quantity if item exists
        return prevItems.map(item =>
          item.name === product.name && item.type === product.type
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Add new item with quantity 1
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productName, productType) => {
    setCartItems(prevItems => 
      prevItems.filter(item => 
        !(item.name === productName && item.type === productType)
      )
    );
  };

  const updateQuantity = (productName, productType, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productName, productType);
    } else {
      setCartItems(prevItems =>
        prevItems.map(item =>
          item.name === productName && item.type === productType
            ? { ...item, quantity }
            : item
        )
      );
    }
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  return {
    cartItems,
    cartCount,
    cartTotal,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart
  };
};
