import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Footer from '../components/Footer';

const HomePage = ({ cartCount }) => {
  return (
    <>
      <Header cartCount={cartCount} />
      <Hero cartCount={cartCount} />
      <Footer />
    </>
  );
};

export default HomePage;
