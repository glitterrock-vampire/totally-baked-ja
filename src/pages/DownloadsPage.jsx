import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const DownloadsPage = ({ cartCount }) => {
  return (
    <>
      <Header cartCount={cartCount} />
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <div className="text-center mb-16">
          <h1 className="text-5xl sm:text-7xl font-bold mb-6 leading-tight">
            downloads
            <br />
            <span className="text-green-600">coming soon</span>
          </h1>
          <p className="text-lg sm:text-xl text-neutral-600 max-w-2xl mx-auto">
            premium stickers, electronic arts, and medical forms will be available here
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Premium Stickers Section */}
          <div className="border-2 border-black bg-white p-8">
            <h2 className="text-2xl font-bold mb-4">premium stickers</h2>
            <p className="text-neutral-600 mb-6">
              Request our exclusive premium sticker collection featuring unique designs and high-quality materials.
            </p>
            
            {/* Future Form Placeholder */}
            <div className="space-y-4">
              <div className="h-12 bg-neutral-100 rounded border border-neutral-300 flex items-center justify-center text-neutral-500">
                Sticker Request Form (Coming Soon)
              </div>
              <button 
                disabled 
                className="w-full border border-black px-4 py-3 text-sm uppercase bg-neutral-100 text-neutral-400 cursor-not-allowed"
              >
                request stickers →
              </button>
            </div>
          </div>

          {/* Electronic Arts Section */}
          <div className="border-2 border-black bg-white p-8">
            <h2 className="text-2xl font-bold mb-4">electronic arts</h2>
            <p className="text-neutral-600 mb-6">
              Download exclusive digital artwork, wallpapers, and multimedia content from our creative collection.
            </p>
            
            {/* Future Form Placeholder */}
            <div className="space-y-4">
              <div className="h-12 bg-neutral-100 rounded border border-neutral-300 flex items-center justify-center text-neutral-500">
                Digital Art Request Form (Coming Soon)
              </div>
              <button 
                disabled 
                className="w-full border border-black px-4 py-3 text-sm uppercase bg-neutral-100 text-neutral-400 cursor-not-allowed"
              >
                download art →
              </button>
            </div>
          </div>

          {/* Medical Forms Section */}
          <div className="border-2 border-green-600 bg-green-50 p-8">
            <h2 className="text-2xl font-bold mb-4 text-green-800">medical forms</h2>
            <p className="text-green-700 mb-6">
              Patient verification and medical cannabis documentation for qualified medical patients.
            </p>
            
            {/* Medical Form Options */}
            <div className="space-y-3">
              <div className="h-10 bg-white rounded border border-green-300 flex items-center justify-center text-green-600 text-sm">
                Patient Verification Form
              </div>
              <div className="h-10 bg-white rounded border border-green-300 flex items-center justify-center text-green-600 text-sm">
                Medical Card Renewal
              </div>
              <div className="h-10 bg-white rounded border border-green-300 flex items-center justify-center text-green-600 text-sm">
                Caregiver Application
              </div>
              <button 
                disabled 
                className="w-full border border-green-600 px-4 py-3 text-sm uppercase bg-green-100 text-green-400 cursor-not-allowed"
              >
                medical portal →
              </button>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <p className="text-sm text-neutral-500">
            Forms and downloads will be available in a future update. 
            <br />
            Stay tuned for premium digital content, merchandise requests, and medical patient services.
          </p>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default DownloadsPage;
