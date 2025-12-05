import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getShopBySlug } from '../lib/sanity';

const ShopDetail = ({ addToCart }) => {
  const { shopId } = useParams();
  const [shop, setShop] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShop = async () => {
      try {
        const shopData = await getShopBySlug(shopId);
        setShop(shopData);
      } catch (error) {
        console.error('Error fetching shop:', error);
      } finally {
        setLoading(false);
      }
    };

    if (shopId) {
      fetchShop();
    }
  }, [shopId]);

  if (loading) {
    return (
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="text-center">Loading...</div>
      </section>
    );
  }

  if (!shop) {
    return (
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="text-center">Shop not found</div>
      </section>
    );
  }

  const Icon = () => {
    switch (shop.icon) {
      case 'star':
        return <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full" />;
      case 'coffee':
        return <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-500 rounded-full" />;
      case 'leaf':
        return <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full" />;
      default:
        return <div className="w-12 h-12 bg-gray-500 rounded-full" />;
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <Link
        to="/"
        className="mb-8 text-sm uppercase hover:text-green-600 transition-colors inline-block"
      >
        ← back to shops
      </Link>

      <div className="flex items-center gap-4 mb-12">
        <Icon className="w-12 h-12" />
        <h2 className="text-4xl sm:text-5xl font-bold uppercase">
          {shop.name}
        </h2>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {shop.products?.map((product, idx) => (
          <div
            key={product._id || idx}
            className="border-2 border-black bg-white hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all"
          >
            <Link 
              to={`/product/${product.slug?.current}`}
              className="block"
            >
              <div className={`h-48 bg-gradient-to-br ${shop.color} opacity-20`} />
            </Link>
            <div className="p-6">
              <div className="text-xs uppercase text-neutral-500 mb-2">
                {product.type}
              </div>
              <h3 className="text-xl font-bold mb-4">
                <Link 
                  to={`/product/${product.slug?.current}`}
                  className="hover:text-green-600 transition-colors"
                >
                  {product.name}
                </Link>
              </h3>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold">
                  ${product.price}
                </span>
                <button
                  onClick={() => addToCart(product)}
                  className="border border-black px-4 py-2 text-sm uppercase hover:bg-black hover:text-white transition-colors"
                >
                  add
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ShopDetail;
