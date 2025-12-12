import { doc, setDoc, collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { db } from '../firebase';

// Create a new order
export const createOrder = async (userId, orderData) => {
  try {
    const orderRef = doc(collection(db, 'orders'));
    const order = {
      ...orderData,
      userId,
      createdAt: new Date().toISOString(),
      status: 'pending',
      orderNumber: `TB-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`
    };
    
    await setDoc(orderRef, order);
    return order;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
};

// Get user's order history
export const getUserOrders = async (userId) => {
  try {
    const ordersQuery = query(
      collection(db, 'orders'),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );
    
    const querySnapshot = await getDocs(ordersQuery);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
};

// Get user profile data
export const getUserProfile = async (userId) => {
  try {
    const userDoc = await getDoc(doc(db, 'users', userId));
    return userDoc.exists() ? userDoc.data() : null;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
};
