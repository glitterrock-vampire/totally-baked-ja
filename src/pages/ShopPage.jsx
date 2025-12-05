import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import ShopDetail from '../components/ShopDetail';
import Footer from '../components/Footer';

const ShopPage = ({ cartCount, addToCart }) => {
  const { shopId } = useParams();

  return (
    <>
      <Header cartCount={cartCount} />
      <ShopDetail 
        addToCart={addToCart}
      />
      <Footer />
    </>
  );
};

export default ShopPage;
