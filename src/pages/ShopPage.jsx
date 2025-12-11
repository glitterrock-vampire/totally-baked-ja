import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import ShopDetail from '../components/ShopDetail';
import Footer from '../components/Footer';

// ShopPage can receive shopId either from the URL (/shop/:shopId)
// or as an explicit prop (for routes like /herb-house, /delights-cafe, /collectibles)
const ShopPage = ({ cartCount, addToCart, shopId: propShopId }) => {
  const { shopId: paramShopId } = useParams();
  const effectiveShopId = propShopId || paramShopId;

  return (
    <>
      <Header cartCount={cartCount} />
      <ShopDetail 
        addToCart={addToCart}
        shopId={effectiveShopId}
      />
      <Footer />
    </>
  );
};

export default ShopPage;
