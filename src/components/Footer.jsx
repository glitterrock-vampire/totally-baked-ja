import React from 'react';

const Footer = () => {
  return (
    <footer className="border-t-2 border-black bg-white mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid sm:grid-cols-3 gap-8 text-sm">
          <div>
            <h4 className="font-bold uppercase mb-3">totally baked</h4>
            <p className="text-neutral-600">
              premium cannabis products
              <br />
              for discerning consumers
            </p>
          </div>
          <div>
            <h4 className="font-bold uppercase mb-3">legal</h4>
            <p className="text-neutral-600">
              21+ only
              <br />
              valid ID required
              <br />
              licensed dispensary
            </p>
          </div>
          <div>
            <h4 className="font-bold uppercase mb-3">connect</h4>
            <p className="text-neutral-600">
              @totallybaked
              <br />
              hello@totallybaked.co
            </p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-neutral-200 text-xs text-neutral-500 text-center">
          © 2025 totally baked. consume responsibly.
        </div>
      </div>
    </footer>
  );
};

export default Footer;


