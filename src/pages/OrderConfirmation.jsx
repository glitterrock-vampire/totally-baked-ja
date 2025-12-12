import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const OrderConfirmation = () => {
  const location = useLocation();
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    // Get order details from location state
    if (location.state?.order) {
      setOrderDetails(location.state.order);
    }
  }, [location]);

  if (!orderDetails) {
    return (
      <>
        <Header cartCount={0} />
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
          <div className="text-center">
            <h1 className="text-5xl sm:text-7xl font-bold mb-6 leading-tight">
              order
              <br />
              <span className="text-red-600">not found</span>
            </h1>
            <p className="text-lg sm:text-xl text-neutral-600 max-w-2xl mx-auto mb-8">
              We couldn't find your order details.
            </p>
            <Link 
              to="/"
              className="inline-block border-2 border-black bg-black text-white px-6 py-3 text-lg font-bold hover:bg-neutral-800 transition-colors"
            >
              return home →
            </Link>
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
            <span className="text-green-600">confirmed!</span>
          </h1>
          <p className="text-lg sm:text-xl text-neutral-600 max-w-2xl mx-auto">
            Thank you for your order! We'll send you a confirmation email shortly.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          {/* Order Details Card */}
          <div className="border-4 border-black bg-white p-8 mb-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold mb-2">Order #{orderDetails.orderNumber}</h2>
              <p className="text-sm text-neutral-600">
                Placed on {new Date(orderDetails.createdAt).toLocaleDateString()}
              </p>
              <div className="mt-4">
                <span className={`px-4 py-2 text-sm rounded-full ${
                  orderDetails.status === 'pending' 
                    ? 'bg-yellow-100 text-yellow-800'
                    : orderDetails.status === 'completed'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {orderDetails.status}
                </span>
              </div>
            </div>

            <div className="border-t pt-6">
              <h3 className="font-bold mb-4">Order Items</h3>
              <div className="space-y-3">
                {orderDetails.orderDetails.items.map((item, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <div>
                      <div className="font-medium">{item.name}</div>
                      <div className="text-sm text-neutral-600">{item.type} • Qty: {item.quantity}</div>
                    </div>
                    <div className="font-medium">${(item.price * item.quantity).toFixed(2)}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t mt-6 pt-6 space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${orderDetails.orderDetails.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax (8.75%)</span>
                <span>${orderDetails.orderDetails.tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-xl font-bold border-t pt-2">
                <span>Total</span>
                <span>${orderDetails.orderDetails.total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Customer Information */}
          <div className="border-4 border-black bg-white p-8 mb-8">
            <h3 className="font-bold mb-4">Customer Information</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-2">Contact</h4>
                <div className="text-sm space-y-1">
                  <p>{orderDetails.customerInfo.firstName} {orderDetails.customerInfo.lastName}</p>
                  <p>{orderDetails.customerInfo.email}</p>
                  <p>{orderDetails.customerInfo.phone}</p>
                </div>
              </div>
              <div>
                <h4 className="font-medium mb-2">Delivery Method</h4>
                <div className="text-sm space-y-1">
                  <p className="capitalize">{orderDetails.orderDetails.deliveryMethod}</p>
                  {orderDetails.orderDetails.deliveryMethod === 'delivery' && (
                    <>
                      <p>{orderDetails.customerInfo.address}</p>
                      <p>{orderDetails.customerInfo.city}, {orderDetails.customerInfo.state} {orderDetails.customerInfo.zipCode}</p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/orders"
              className="flex-1 border-2 border-black bg-black text-white px-6 py-3 text-lg font-bold hover:bg-neutral-800 transition-colors text-center"
            >
              view order history →
            </Link>
            <Link
              to="/"
              className="flex-1 border-2 border-black px-6 py-3 text-lg font-bold hover:bg-black hover:text-white transition-colors text-center"
            >
              continue shopping →
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default OrderConfirmation;
