import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useSanityProduct } from '../hooks/useSanityProduct';

const ProductPage = ({ cartCount, addToCart }) => {
  const { productId } = useParams();
  const { product, loading, error } = useSanityProduct(productId);

  if (loading) {
    return (
      <>
        <Header cartCount={cartCount} />
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

  if (error || !product) {
    return (
      <>
        <Header cartCount={cartCount} />
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
          <div className="text-center">
            <h1 className="text-5xl sm:text-7xl font-bold mb-6 leading-tight">
              product not
              <br />
              <span className="text-red-600">found</span>
            </h1>
            <p className="text-lg sm:text-xl text-neutral-600 max-w-2xl mx-auto mb-8">
              This product may be out of stock or no longer available.
            </p>
            <Link 
              to="/"
              className="inline-block border-2 border-black bg-black text-white px-6 py-3 text-lg font-bold hover:bg-neutral-800 transition-colors"
            >
              back to products →
            </Link>
          </div>
        </section>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header cartCount={cartCount} />
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <Link to="/" className="text-sm text-neutral-600 hover:text-black transition-colors">
            Home
          </Link>
          <span className="text-sm text-neutral-600 mx-2">/</span>
          <Link to="/shop/collectibles" className="text-sm text-neutral-600 hover:text-black transition-colors">
            {product.category}
          </Link>
          <span className="text-sm text-neutral-600 mx-2">/</span>
          <span className="text-sm text-black font-medium">{product.name}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-neutral-100 rounded-lg border-2 border-black">
              {product.images && product.images[0] ? (
                <img 
                  src={product.images[0]} 
                  alt={product.name}
                  className="w-full h-full object-cover rounded-lg"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-neutral-200 to-neutral-300 rounded-lg" />
              )}
            </div>
            <div className="grid grid-cols-3 gap-4">
              {product.images && product.images.slice(1).map((image, index) => (
                <div key={index} className="aspect-square bg-neutral-100 rounded border border-neutral-300">
                  <img 
                    src={image} 
                    alt={`${product.name} ${index + 2}`}
                    className="w-full h-full object-cover rounded"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <div className="text-sm text-neutral-500 mb-2 uppercase">{product.type}</div>
              <h1 className="text-4xl sm:text-5xl font-bold mb-4">{product.name}</h1>
              <div className="flex items-center gap-4 mb-6">
                <span className="text-3xl font-bold">${product.price}</span>
                <span className="text-neutral-600">{product.weight}</span>
              </div>
            </div>

            <div className="border-2 border-black p-6 bg-green-50">
              <h3 className="text-lg font-bold mb-3 text-green-800">Product Details</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-neutral-600">Strain:</span>
                  <span className="ml-2 font-medium">{product.strain || 'N/A'}</span>
                </div>
                <div>
                  <span className="text-neutral-600">THC:</span>
                  <span className="ml-2 font-medium">{product.thc || 'N/A'}</span>
                </div>
                <div>
                  <span className="text-neutral-600">CBD:</span>
                  <span className="ml-2 font-medium">{product.cbd || 'N/A'}</span>
                </div>
                <div>
                  <span className="text-neutral-600">Origin:</span>
                  <span className="ml-2 font-medium">{product.origin || 'N/A'}</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-3">Description</h3>
              <p className="text-neutral-600 leading-relaxed">{product.description}</p>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-3">Effects</h3>
              <div className="flex flex-wrap gap-2">
                {(product.effects || []).map((effect, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full"
                  >
                    {effect}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-3">Aroma Profile</h3>
              <div className="flex flex-wrap gap-2">
                {(product.aroma || []).map((scent, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1 bg-neutral-100 text-neutral-800 text-sm rounded-full"
                  >
                    {scent}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-4">
              {product.labTested && (
                <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                  Lab Tested
                </span>
              )}
              {product.organic && (
                <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                  Organic
                </span>
              )}
            </div>

            <button
              onClick={() => addToCart(product)}
              className="w-full border-2 border-black bg-black text-white px-6 py-4 text-lg font-bold hover:bg-neutral-800 transition-colors"
            >
              add to cart → ${product.price}
            </button>
          </div>
        </div>

        {/* Related Products */}
        <div>
          <h2 className="text-3xl font-bold mb-8">Related Products</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {(product.relatedProducts || []).map((relatedProduct) => (
              <Link
                key={relatedProduct.id || relatedProduct._id}
                to={`/product/${relatedProduct.slug?.current || relatedProduct.id}`}
                className="group border-2 border-black bg-white hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all p-6 block"
              >
                <div className="aspect-square bg-neutral-100 rounded mb-4" />
                <div className="text-xs uppercase text-neutral-500 mb-2">{relatedProduct.type || 'Product'}</div>
                <h3 className="text-xl font-bold mb-2">{relatedProduct.name}</h3>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold">${relatedProduct.price}</span>
                  <span className="text-sm text-green-600 group-hover:text-black transition-colors">
                    view →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default ProductPage;
