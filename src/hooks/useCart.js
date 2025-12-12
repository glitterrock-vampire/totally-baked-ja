import { useState, useEffect, useContext } from 'react';
import { doc, getDoc, setDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { useAuth } from './useAuth.jsx';

export const useCart = () => {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load cart from Firestore or localStorage
  useEffect(() => {
    const loadCart = async () => {
      try {
        if (user) {
          // Logged in user - load from Firestore
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists() && userDoc.data().cart) {
            setCartItems(userDoc.data().cart);
          }
        } else {
          // Guest user - load from localStorage
          const savedCart = localStorage.getItem('guestCart');
          if (savedCart) {
            setCartItems(JSON.parse(savedCart));
          }
        }
      } catch (error) {
        console.error('Error loading cart:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCart();
  }, [user]);

  // Save cart to Firestore or localStorage
  const saveCart = async (items) => {
    try {
      if (user) {
        // Save to Firestore for logged in users
        await updateDoc(doc(db, 'users', user.uid), {
          cart: items,
          updatedAt: new Date().toISOString()
        });
      } else {
        // Save to localStorage for guests
        localStorage.setItem('guestCart', JSON.stringify(items));
      }
    } catch (error) {
      console.error('Error saving cart:', error);
    }
  };

  const addToCart = async (product, quantity = 1) => {
    const newItems = [...cartItems];
    const existingItemIndex = newItems.findIndex(item => 
      item._id === product._id || (item.name === product.name && item.type === product.type)
    );
    
    if (existingItemIndex >= 0) {
      newItems[existingItemIndex].quantity += quantity;
    } else {
      newItems.push({ ...product, quantity });
    }
    
    setCartItems(newItems);
    await saveCart(newItems);
  };

  const removeFromCart = async (productId) => {
    const newItems = cartItems.filter(item => 
      item._id !== productId && !(item.name === productId && item.type === productId)
    );
    
    setCartItems(newItems);
    await saveCart(newItems);
  };

  const updateQuantity = async (productId, quantity) => {
    if (quantity <= 0) {
      await removeFromCart(productId);
      return;
    }
    
    const newItems = cartItems.map(item =>
      (item._id === productId || (item.name === productId && item.type === productId))
        ? { ...item, quantity }
        : item
    );
    
    setCartItems(newItems);
    await saveCart(newItems);
  };

  const clearCart = async () => {
    setCartItems([]);
    await saveCart([]);
  };

  // Merge guest cart with user cart when logging in
  const mergeGuestCart = async () => {
    if (!user) return;
    
    try {
      const guestCart = localStorage.getItem('guestCart');
      if (guestCart) {
        const guestItems = JSON.parse(guestCart);
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        
        if (userDoc.exists()) {
          const userCart = userDoc.data().cart || [];
          
          // Merge carts, avoiding duplicates
          const mergedCart = [...userCart];
          guestItems.forEach(guestItem => {
            const existingIndex = mergedCart.findIndex(item => 
              item._id === guestItem._id || (item.name === guestItem.name && item.type === guestItem.type)
            );
            
            if (existingIndex >= 0) {
              mergedCart[existingIndex].quantity += guestItem.quantity;
            } else {
              mergedCart.push(guestItem);
            }
          });
          
          await updateDoc(doc(db, 'users', user.uid), {
            cart: mergedCart,
            updatedAt: new Date().toISOString()
          });
          
          setCartItems(mergedCart);
          localStorage.removeItem('guestCart');
        }
      }
    } catch (error) {
      console.error('Error merging carts:', error);
    }
  };

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  return {
    cartItems,
    cartCount,
    cartTotal,
    loading,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    mergeGuestCart
  };
};
