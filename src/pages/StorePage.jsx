import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const StorePage = ({ cartCount }) => {
  return (
    <>
      <Header cartCount={cartCount} />
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <div className="text-center mb-16">
          <h1 className="text-5xl sm:text-7xl font-bold mb-6 leading-tight">
            visit our
            <br />
            <span className="text-green-600">dispensary</span>
          </h1>
          <p className="text-lg sm:text-xl text-neutral-600 max-w-2xl mx-auto">
            Find us at our flagship location. Premium products, expert staff, and a welcoming atmosphere.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Map Section */}
          <div className="border-2 border-black bg-white p-4">
            <div className="aspect-square bg-neutral-100 rounded flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <div className="w-8 h-8 bg-white rounded-full"></div>
                </div>
                <p className="text-sm text-neutral-500 mb-2">Interactive Map</p>
                <p className="text-xs text-neutral-400">Coming Soon</p>
              </div>
            </div>
          </div>

          {/* Store Information */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold mb-4">Location</h2>
              <div className="space-y-2 text-neutral-600">
                <p className="text-lg">123 Cannabis Avenue</p>
                <p className="text-lg">Green District, CA 90210</p>
                <p className="text-lg">United States</p>
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold mb-4">Hours</h2>
              <div className="space-y-1 text-neutral-600">
                <div className="flex justify-between">
                  <span>Monday - Friday</span>
                  <span>9:00 AM - 8:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span>10:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span>11:00 AM - 5:00 PM</span>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold mb-4">Contact</h2>
              <div className="space-y-2 text-neutral-600">
                <p className="text-lg">(555) 123-4567</p>
                <p className="text-lg">store@totallybaked.co</p>
                <p className="text-lg">@totallybaked_store</p>
              </div>
            </div>

            <div className="border-2 border-black p-6 bg-green-50">
              <h3 className="text-xl font-bold mb-3 text-green-800">Medical Patients</h3>
              <p className="text-green-700 mb-4">
                Priority service available for medical patients with valid documentation.
              </p>
              <button className="border border-green-600 px-4 py-2 text-sm uppercase bg-green-600 text-white hover:bg-green-700 transition-colors">
                medical priority →
              </button>
            </div>
          </div>
        </div>

        {/* Store Features */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <div className="border-2 border-black bg-white p-6 text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center">
              <div className="w-6 h-6 bg-green-600 rounded-full"></div>
            </div>
            <h3 className="text-xl font-bold mb-2">Expert Staff</h3>
            <p className="text-neutral-600 text-sm">
              Knowledgeable budtenders ready to help you find the perfect products
            </p>
          </div>

          <div className="border-2 border-black bg-white p-6 text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center">
              <div className="w-6 h-6 bg-green-600 rounded-full"></div>
            </div>
            <h3 className="text-xl font-bold mb-2">Curated Selection</h3>
            <p className="text-neutral-600 text-sm">
              Premium cannabis products tested for quality and potency
            </p>
          </div>

          <div className="border-2 border-black bg-white p-6 text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center">
              <div className="w-6 h-6 bg-green-600 rounded-full"></div>
            </div>
            <h3 className="text-xl font-bold mb-2">Safe Environment</h3>
            <p className="text-neutral-600 text-sm">
              Clean, welcoming atmosphere with strict safety protocols
            </p>
          </div>
        </div>

        {/* Directions */}
        <div className="border-2 border-black bg-white p-8">
          <h2 className="text-3xl font-bold mb-6">Get Directions</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">By Car</h3>
              <ul className="space-y-2 text-neutral-600">
                <li>• Free parking available on-site</li>
                <li>• Located off Highway 101</li>
                <li>• 15 minutes from downtown</li>
                <li>• Accessible via public transit</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Public Transit</h3>
              <ul className="space-y-2 text-neutral-600">
                <li>• Bus stop: Route 42 - Cannabis Ave</li>
                <li>• 5-minute walk from Green Line station</li>
                <li>• Bike racks available</li>
                <li>• Walking distance from residential areas</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default StorePage;
