import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const CheckoutPage = ({ cartCount, cartItems, removeFromCart, updateQuantity, clearCart }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    deliveryMethod: 'pickup',
    paymentMethod: 'card',
    medicalCard: '',
    ageVerification: false
  });

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.0875; // 8.75% tax
  const total = subtotal + tax;

  // If cart is empty, show empty state
  if (cartItems.length === 0) {
    return (
      <>
        <Header cartCount={cartCount} />
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
          <div className="text-center">
            <h1 className="text-5xl sm:text-7xl font-bold mb-6 leading-tight">
              your cart is
              <br />
              <span className="text-green-600">empty</span>
            </h1>
            <p className="text-lg sm:text-xl text-neutral-600 max-w-2xl mx-auto mb-8">
              Add some products to your cart before checking out.
            </p>
            <Link 
              to="/"
              className="inline-block border-2 border-black bg-black text-white px-6 py-3 text-lg font-bold hover:bg-neutral-800 transition-colors"
            >
              continue shopping →
            </Link>
          </div>
        </section>
        <Footer />
      </>
    );
  }

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Process order with real data
    console.log('Order submitted:', { formData, cartItems });
    // Clear cart after successful order
    clearCart();
    alert('Order placed successfully! Thank you for your purchase.');
  };

  return (
    <>
      <Header cartCount={cartCount} />
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <div className="text-center mb-16">
          <h1 className="text-5xl sm:text-7xl font-bold mb-6 leading-tight">
            checkout
            <br />
            <span className="text-green-600">secure payment</span>
          </h1>
          <p className="text-lg sm:text-xl text-neutral-600 max-w-2xl mx-auto">
            Complete your order with our secure checkout process. Medical patients receive priority processing.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="grid lg:grid-cols-2 gap-12">
          {/* Customer Information */}
          <div className="space-y-8">
            <div className="border-2 border-black bg-white p-8">
              <h2 className="text-2xl font-bold mb-6">Customer Information</h2>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium mb-2">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    className="w-full border border-black px-3 py-2 text-sm"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    className="w-full border border-black px-3 py-2 text-sm"
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-black px-3 py-2 text-sm"
                  placeholder="john@example.com"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-black px-3 py-2 text-sm"
                  placeholder="(555) 123-4567"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Medical Card Number (Optional)</label>
                <input
                  type="text"
                  name="medicalCard"
                  value={formData.medicalCard}
                  onChange={handleInputChange}
                  className="w-full border border-black px-3 py-2 text-sm"
                  placeholder="MC-123456"
                />
              </div>
            </div>

            {/* Delivery Information */}
            <div className="border-2 border-black bg-white p-8">
              <h2 className="text-2xl font-bold mb-6">Delivery Method</h2>
              
              <div className="space-y-4 mb-6">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="deliveryMethod"
                    value="pickup"
                    checked={formData.deliveryMethod === 'pickup'}
                    onChange={handleInputChange}
                    className="mr-3"
                  />
                  <div>
                    <div className="font-medium">In-Store Pickup</div>
                    <div className="text-sm text-neutral-600">Ready in 30 minutes</div>
                  </div>
                </label>
                
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="deliveryMethod"
                    value="delivery"
                    checked={formData.deliveryMethod === 'delivery'}
                    onChange={handleInputChange}
                    className="mr-3"
                  />
                  <div>
                    <div className="font-medium">Delivery</div>
                    <div className="text-sm text-neutral-600">2-3 business days</div>
                  </div>
                </label>
              </div>

              {formData.deliveryMethod === 'delivery' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Address</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required={formData.deliveryMethod === 'delivery'}
                      className="w-full border border-black px-3 py-2 text-sm"
                      placeholder="123 Main St"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">City</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        required={formData.deliveryMethod === 'delivery'}
                        className="w-full border border-black px-3 py-2 text-sm"
                        placeholder="Los Angeles"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">State</label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        required={formData.deliveryMethod === 'delivery'}
                        className="w-full border border-black px-3 py-2 text-sm"
                        placeholder="CA"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">ZIP Code</label>
                    <input
                      type="text"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      required={formData.deliveryMethod === 'delivery'}
                      className="w-full border border-black px-3 py-2 text-sm"
                      placeholder="90210"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Payment Information */}
            <div className="border-2 border-black bg-white p-8">
              <h2 className="text-2xl font-bold mb-6">Payment Method</h2>
              
              <div className="space-y-4 mb-6">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={formData.paymentMethod === 'card'}
                    onChange={handleInputChange}
                    className="mr-3"
                  />
                  <div>
                    <div className="font-medium">Credit/Debit Card</div>
                    <div className="text-sm text-neutral-600">Visa, Mastercard, AMEX</div>
                  </div>
                </label>
                
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cash"
                    checked={formData.paymentMethod === 'cash'}
                    onChange={handleInputChange}
                    className="mr-3"
                  />
                  <div>
                    <div className="font-medium">Cash on Delivery/Pickup</div>
                    <div className="text-sm text-neutral-600">Exact amount appreciated</div>
                  </div>
                </label>
              </div>

              <div className="border-t pt-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="ageVerification"
                    checked={formData.ageVerification}
                    onChange={handleInputChange}
                    required
                    className="mr-3"
                  />
                  <span className="text-sm">
                    I confirm that I am 21+ years of age (18+ with valid medical card)
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="space-y-8">
            <div className="border-2 border-black bg-white p-8">
              <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                {cartItems.map((item, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <div className="flex-1">
                      <div className="font-medium">{item.name}</div>
                      <div className="text-sm text-neutral-600">{item.type} • Qty: {item.quantity}</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.name, item.type, item.quantity - 1)}
                          className="w-6 h-6 border border-black flex items-center justify-center hover:bg-black hover:text-white transition-colors"
                        >
                          -
                        </button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.name, item.type, item.quantity + 1)}
                          className="w-6 h-6 border border-black flex items-center justify-center hover:bg-black hover:text-white transition-colors"
                        >
                          +
                        </button>
                      </div>
                      <div className="font-medium w-20 text-right">${item.price * item.quantity}</div>
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.name, item.type)}
                        className="text-red-600 hover:text-red-800 text-sm"
                      >
                        remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax (8.75%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-xl font-bold border-t pt-2">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Medical Priority Notice */}
            {formData.medicalCard && (
              <div className="border-2 border-green-600 bg-green-50 p-6">
                <h3 className="text-lg font-bold mb-2 text-green-800">Medical Priority</h3>
                <p className="text-green-700 text-sm">
                  Your medical card has been detected. You'll receive priority processing and exclusive medical patient discounts.
                </p>
              </div>
            )}

            {/* Place Order Button */}
            <button
              type="submit"
              className="w-full border-2 border-black bg-black text-white px-6 py-4 text-lg font-bold hover:bg-neutral-800 transition-colors"
            >
              place order → ${total.toFixed(2)}
            </button>

            {/* Security Notice */}
            <div className="text-center text-sm text-neutral-500">
              <p>🔒 Secure checkout powered by Totally Baked</p>
              <p>Your information is protected and encrypted</p>
            </div>
          </div>
        </form>
      </section>
      <Footer />
    </>
  );
};

export default CheckoutPage;
