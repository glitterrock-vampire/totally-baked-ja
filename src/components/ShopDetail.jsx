import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSanityProducts } from '../hooks/useSanity';

const ShopDetail = ({ addToCart, shopId: propShopId }) => {
  // Prefer explicit shopId prop, but fall back to URL param for /shop/:shopId
  const { shopId: paramShopId } = useParams();
  const shopId = propShopId || paramShopId;
  const { products, loading, getImageUrl } = useSanityProducts();
  
  // Get products based on shopId - mirror logic from useSanityProducts (getProductsByCollectionType)
  const getProductsForShop = (shopKey) => {
    switch (shopKey) {
      case 'herb-house':
        // Herb House: primarily flower / pre-roll products
        return products.filter(
          (p) => (p.type === 'flower' || p.type === 'pre-roll') && p.inStock !== false
        );
      case 'delights-cafe':
        // Delights: edibles + beverages
        return products.filter(
          (p) => ['edible', 'beverage'].includes(p.type) && p.inStock !== false
        );
      case 'collectibles':
        // Collectibles: accessories
        return products.filter(
          (p) => p.type === 'accessory' && p.inStock !== false
        );
      default:
        // Generic shop: show everything in stock
        return products.filter((p) => p.inStock !== false);
    }
  };

  const shopProducts = getProductsForShop(shopId);
  console.log('=== SHOP DETAIL DEBUG ===');
  console.log('Raw shopId from URL:', shopId);
  console.log('Type of shopId:', typeof shopId);
  console.log('All products count:', products.length);
  console.log('All products:', products.map(p => ({ name: p.name, category: p.category })));
  console.log('Filtered products count:', shopProducts.length);
  console.log('Filtered products:', shopProducts.map(p => ({ name: p.name, category: p.category })));
  console.log('========================');
  
  const getShopInfo = (currentShopId) => {
    switch (currentShopId) {
      case 'herb-house':
        return {
          title: 'herb house',
          subtitle: 'premium flower',
          category: 'flower',
          description: 'premium cannabis flower. strain-specific cultivation. lab tested for potency and purity.'
        };
      case 'delights-cafe':
        return {
          title: 'delights',
          subtitle: 'edibles & more',
          category: 'edibles',
          description: 'precision-dosed edibles. consistent effects. gourmet ingredients. lab verified potency.'
        };
      case 'collectibles':
        return {
          title: 'collectibles',
          subtitle: 'hardware & apparel',
          category: 'hardware',
          description: 'premium accessories and apparel. engineered for performance. designed for enthusiasts.'
        };
      default:
        return {
          title: 'shop',
          subtitle: 'products',
          category: 'general',
          description: 'quality products for your needs.'
        };
    }
  };

  const shopInfo = getShopInfo(shopId);

  if (loading) {
    return (
      <div className="min-h-screen bg-white text-black font-sans">
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="text-center">
            <div className="font-mono text-sm uppercase tracking-wider opacity-50">loading</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white text-black font-sans" style={{ minHeight: '100vh' }}>
      <div className="flex flex-col w-full">
        {/* Shop Header */}
        <section className="border-b-4 border-black bg-[#f5f5f5] p-8 lg:p-16">
          {/* Orange highlight bar */}
          <div className="h-2 bg-tb-orange mb-4" />
          <div className="font-mono text-[10px] uppercase tracking-widest mb-4 opacity-50">category / {shopInfo.category}</div>
          <div
            className={
              `font-mono text-[10px] uppercase tracking-widest mb-2 ` +
              (shopId === 'delights-cafe'
                ? 'text-tb-orange'
                : 'opacity-30')
            }
          >
            shop: {shopId}
          </div>
          <div className="font-mono text-[10px] uppercase tracking-widest mb-2 opacity-30">products: {shopProducts.length}</div>
          <h1 className="text-6xl lg:text-8xl font-black lowercase mb-6">{shopInfo.title}</h1>
          <p className="text-sm max-w-2xl font-light">{shopInfo.description}</p>
        </section>

        {/* Products Grid */}
        <section className="border-b-4 border-black">
          <div className="grid grid-cols-2 lg:grid-cols-4">
            {shopProducts.map((product, idx) => (
              <div
                key={product._id || idx}
                className="border-r-4 border-b-4 border-black group transition-all duration-200 hover:transform hover:-translate-y-0.5"
              >
                <Link
                  to={`/product/${product.slug?.current || product._id}`}
                  className="block cursor-pointer"
                >
                  <div className="aspect-square relative overflow-hidden bg-gray-100 border-b-4 border-black group">
                    <img
                      src={getImageUrl(product.images?.[0])}
                      alt={product.name}
                      className="w-full h-full object-cover transition-all duration-300"
                    />
                    <div className="absolute top-0 left-0 w-full p-3 flex justify-between items-start">
                      <span className="bg-white px-2 py-1 text-[9px] font-bold uppercase tracking-wider">
                        {product.category || product.type}
                      </span>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          addToCart(product);
                        }}
                        className="bg-black text-white w-8 h-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-tb-orange"
                      >
                        <span className="text-xl leading-none">+</span>
                      </button>
                    </div>
                  </div>
                  <div className="p-4 bg-white">
                    <div className="font-bold text-sm lowercase mb-1">{product.name}</div>
                    <div className="flex justify-between items-center">
                      <span className="font-mono text-xs opacity-50">
                        {product.thc || product.weight || product.strain || 'premium'}
                      </span>
                      <span className="font-mono text-sm font-bold tabular-nums">${product.price}</span>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </section>
      </div>

          </div>
  );
};

export default ShopDetail;
