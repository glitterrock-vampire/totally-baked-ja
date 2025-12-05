import React from 'react';
import Header from '../components/Header';
import VisualCollageHome from '../components/VisualCollageHome';
import Footer from '../components/Footer';

const HomePage = () => {
  return (
    <div className="min-h-screen">
      <Header cartCount={0} />
      <VisualCollageHome />
      <Footer />
    </div>
  );
};

export default HomePage;
