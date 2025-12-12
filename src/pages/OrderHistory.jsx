import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useAuth } from '../hooks/useAuth.jsx';
import { getUserOrders } from '../lib/orders';

const OrderHistory = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      if (user) {
        try {
          const userOrders = await getUserOrders(user.uid);
          setOrders(userOrders);
        } catch (error) {
          console.error('Error fetching orders:', error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  if (!user) {
    return (
      <>
        <Header cartCount={0} />
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
          <div className="text-center">
            <h1 className="text-5xl sm:text-7xl font-bold mb-6 leading-tight">
              please
              <br />
              <span className="text-red-600">sign in</span>
            </h1>
            <p className="text-lg sm:text-xl text-neutral-600 max-w-2xl mx-auto mb-8">
              You need to be logged in to view your order history.
            </p>
            <Link 
              to="/login"
              className="inline-block border-2 border-black bg-black text-white px-6 py-3 text-lg font-bold hover:bg-neutral-800 transition-colors"
            >
              sign in →
            </Link>
          </div>
        </section>
        <Footer />
      </>
    );
  }

  if (loading) {
    return (
      <>
        <Header cartCount={0} />
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-neutral-200 rounded w-64 mx-auto mb-4"></div>
              <div className="h-4 bg-neutral-200 rounded w-48 mx-auto"></div>
            </div>
          </div>
        </section>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header cartCount={0} />
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <div className="text-center mb-16">
          <h1 className="text-5xl sm:text-7xl font-bold mb-6 leading-tight">
            order
            <br />
            <span className="text-green-600">history</span>
          </h1>
          <p className="text-lg sm:text-xl text-neutral-600 max-w-2xl mx-auto">
            View and track your past orders.
          </p>
        </div>

        {orders.length === 0 ? (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">No orders yet</h2>
            <p className="text-neutral-600 mb-8">
              You haven't placed any orders yet. Start shopping to see your order history here.
            </p>
            <Link 
              to="/"
              className="inline-block border-2 border-black bg-black text-white px-6 py-3 text-lg font-bold hover:bg-neutral-800 transition-colors"
            >
              start shopping →
            </Link>
          </div>
        ) : (
          <div className="space-y-8">
            {orders.map((order) => (
              <div key={order.id} className="border-2 border-black bg-white p-8">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-xl font-bold mb-2">Order #{order.orderNumber}</h3>
                    <p className="text-sm text-neutral-600">
                      Placed on {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className={`px-3 py-1 text-sm rounded-full ${
                      order.status === 'completed' 
                        ? 'bg-green-100 text-green-800'
                        : order.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8 mb-6">
                  <div>
                    <h4 className="font-bold mb-2">Customer Information</h4>
                    <div className="text-sm space-y-1">
                      <p>{order.customerInfo.firstName} {order.customerInfo.lastName}</p>
                      <p>{order.customerInfo.email}</p>
                      <p>{order.customerInfo.phone}</p>
                      {order.customerInfo.isMedicalPatient && (
                        <p className="text-green-600">Medical Patient</p>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-bold mb-2">Delivery Method</h4>
                    <div className="text-sm space-y-1">
                      <p className="capitalize">{order.orderDetails.deliveryMethod}</p>
                      {order.orderDetails.deliveryMethod === 'delivery' && (
                        <>
                          <p>{order.customerInfo.address}</p>
                          <p>{order.customerInfo.city}, {order.customerInfo.state} {order.customerInfo.zipCode}</p>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-bold mb-4">Order Items</h4>
                  <div className="space-y-2">
                    {order.orderDetails.items.map((item, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <div className="flex-1">
                          <div className="font-medium">{item.name}</div>
                          <div className="text-sm text-neutral-600">{item.type} • Qty: {item.quantity}</div>
                        </div>
                        <div className="font-medium">${(item.price * item.quantity).toFixed(2)}</div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="border-t mt-4 pt-4 space-y-2">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>${order.orderDetails.subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tax (8.75%)</span>
                      <span>${order.orderDetails.tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-xl font-bold border-t pt-2">
                      <span>Total</span>
                      <span>${order.orderDetails.total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
      <Footer />
    </>
  );
};

export default OrderHistory;
