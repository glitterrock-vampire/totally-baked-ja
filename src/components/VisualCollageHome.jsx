import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Coffee, Star, ArrowRight } from 'lucide-react';
import bg2 from '../assets/images/bg2.jpg';
import bg5 from '../assets/images/bg5.jpg';
import bg6 from '../assets/images/bg6.jpg';
import bg7 from '../assets/images/bg7.jpg';
import bg8 from '../assets/images/bg8.jpg';
import bg9 from '../assets/images/bg9.jpg';
import bg10 from '../assets/images/bg10.jpg';
import bg11 from '../assets/images/bg11.jpg';
import bg12 from '../assets/images/bg12.jpg';
import bg13 from '../assets/images/bg13.jpg';
import bg14 from '../assets/images/bg14.jpg';
import bg15 from '../assets/images/bg15.jpg';
import pexelsImage from '../assets/images/pexels-mfi97-606506.jpg';
import bobMarleyVideo from '../assets/images/Bob Marley interview on Marijuana (Trench Town Kingston, Jamaica).mp4';

const AnalogClock = () => {
  const [rotation, setRotation] = useState({ hour: 0, minute: 0, second: 0 });

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const hours = now.getHours() % 12;
      const minutes = now.getMinutes();
      const seconds = now.getSeconds();
      const milliseconds = now.getMilliseconds();
      
      // Calculate smooth rotations
      const secondRotation = ((seconds + milliseconds / 1000) * 6); // 6 degrees per second
      const minuteRotation = ((minutes + seconds / 60) * 6); // 6 degrees per minute
      const hourRotation = ((hours + minutes / 60) * 30); // 30 degrees per hour
      
      setRotation({
        hour: hourRotation,
        minute: minuteRotation,
        second: secondRotation
      });
    };

    updateClock();
    const animationFrame = requestAnimationFrame(function animate() {
      updateClock();
      requestAnimationFrame(animate);
    });

    return () => cancelAnimationFrame(animationFrame);
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center" style={{ width: '200px', height: '200px' }}>
      {/* Clock Body */}
      <div className="absolute inset-0 rounded-full bg-gray-100 border-4 border-gray-300 shadow-2xl">
        {/* Inner shadow for depth */}
        <div className="absolute inset-2 rounded-full bg-white shadow-inner"></div>
        
        {/* Clock Face Numbers */}
        <div className="absolute inset-0">
          <div className="absolute top-2 left-1/2 transform -translate-x-1/2 text-gray-700 text-lg font-bold">12</div>
          <div className="absolute top-1/2 right-2 transform -translate-y-1/2 text-gray-700 text-lg font-bold">3</div>
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-gray-700 text-lg font-bold">6</div>
          <div className="absolute top-1/2 left-2 transform -translate-y-1/2 text-gray-700 text-lg font-bold">9</div>
        </div>

        {/* Hour Markers */}
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-2 bg-gray-600"
            style={{
              top: '4px',
              left: '50%',
              transform: `translateX(-50%) rotate(${i * 30}deg)`,
              transformOrigin: '50% 96px'
            }}
          />
        ))}

        {/* Center Dot */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-gray-800 rounded-full z-20"></div>

        {/* Hour Hand */}
        <div
          className="absolute top-1/2 left-1/2 w-1 bg-gray-800 origin-bottom"
          style={{
            height: '60px',
            transform: `translate(-50%, -100%) rotate(${rotation.hour}deg)`,
            transition: 'transform 0.5s cubic-bezier(0.4, 0.0, 0.2, 1)'
          }}
        />

        {/* Minute Hand */}
        <div
          className="absolute top-1/2 left-1/2 w-0.5 bg-gray-700 origin-bottom"
          style={{
            height: '80px',
            transform: `translate(-50%, -100%) rotate(${rotation.minute}deg)`,
            transition: 'transform 0.5s cubic-bezier(0.4, 0.0, 0.2, 1)'
          }}
        />

        {/* Second Hand */}
        <div
          className="absolute top-1/2 left-1/2 w-0.5 bg-yellow-500 origin-bottom"
          style={{
            height: '90px',
            transform: `translate(-50%, -100%) rotate(${rotation.second}deg)`,
            transition: 'transform 0.1s cubic-bezier(0.4, 0.0, 0.2, 1)'
          }}
        >
          {/* Second hand counterweight */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-yellow-500 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

const VisualCollageHome = () => {
  return (
    <div className="bg-white">
      {/* Hero Collage Section */}
      <section className="relative min-h-screen flex items-center justify-center py-16">
        {/* Background Grid Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="grid grid-cols-12 h-full">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="border-r border-black"></div>
            ))}
          </div>
        </div>

        {/* Main Collage Container */}
        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4 relative">
            
            {/* Background Image Element - positioned near lab tested */}
            <div className="absolute bottom-0 left-1/4 lg:left-1/3 w-32 h-32 lg:w-48 lg:h-48 opacity-30 rounded-lg overflow-hidden z-0">
              <img src={bg7} alt="Background" className="w-full h-full object-cover" />
            </div>
            
            {/* Large Feature Image - Top Left */}
            <div className="col-span-2 md:col-span-3 lg:col-span-4 row-span-2 relative group z-10">
              <div className="aspect-[4/3] md:aspect-square rounded-lg overflow-hidden relative">
                <img src={bg2} alt="Herb House" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                  <div className="text-center p-4 md:p-8 w-full">
                    <Leaf className="w-12 h-12 md:w-20 md:h-20 text-white mx-auto mb-3 md:mb-4" />
                    <h3 className="text-xl md:text-3xl font-fascinate text-white mb-2">
                      herb house
                    </h3>
                    <p className="text-white/90 text-xs md:text-sm mb-4 md:mb-6">premium cannabis experience</p>
                    <Link 
                      to="/shop/herb-house"
                      className="inline-flex items-center gap-2 border-2 border-white px-3 py-2 md:px-4 text-white hover:bg-white hover:text-black transition-colors text-sm"
                    >
                      explore
                      <ArrowRight className="w-3 h-3 md:w-4 md:h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Small Feature - Top Right */}
            <div className="col-span-2 md:col-span-1 lg:col-span-2 relative group z-10">
              <div className="aspect-square rounded-lg overflow-hidden relative">
                <img src={bg5} alt="Delights Café" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                  <div className="text-center p-3 md:p-4 w-full">
                    <Coffee className="w-8 h-8 md:w-12 md:h-12 text-white mx-auto mb-2" />
                    <h4 className="text-sm md:text-lg font-fascinate text-white mb-1">
                      delights
                    </h4>
                    <p className="text-white/90 text-xs mb-2">edibles & drinks</p>
                    <Link 
                      to="/shop/delights-cafe"
                      className="text-white hover:text-gray-200 text-xs font-semibold"
                    >
                      discover →
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Analog Clock - positioned to the right of delights */}
            <div className="col-span-2 md:col-span-1 lg:col-span-2 lg:col-start-5 relative z-10">
              <div className="aspect-square flex items-center justify-center">
                <AnalogClock />
              </div>
            </div>

            {/* Medium Feature - Middle Left */}
            <div className="col-span-2 md:col-span-2 lg:col-span-3 relative group z-10">
              <div className="aspect-[4/3] md:aspect-square rounded-lg overflow-hidden relative">
                <img src={bg6} alt="Collectibles" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                  <div className="text-center p-4 md:p-6 w-full">
                    <Star className="w-8 h-8 md:w-12 md:h-12 text-white mx-auto mb-2" />
                    <h4 className="text-sm md:text-xl font-fascinate text-white mb-1">
                      collectibles
                    </h4>
                    <p className="text-white/90 text-xs md:text-sm mb-3">gear & accessories</p>
                    <Link 
                      to="/shop/collectibles"
                      className="text-white hover:text-gray-200 text-xs font-semibold"
                    >
                      shop now →
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Quote/Text Block - Middle Right */}
            <div className="col-span-2 md:col-span-2 lg:col-span-3 relative z-10">
              <div className="aspect-[4/3] md:aspect-square bg-black text-white rounded-lg p-4 md:p-6 flex flex-col justify-center">
                <h2 className="text-lg md:text-2xl lg:text-3xl font-fascinate mb-2 md:mb-4">
                  totally
                  <br />
                  <span className="text-green-400">baked</span>
                </h2>
                <p className="text-xs md:text-sm text-gray-300 mb-3 md:mb-4 leading-relaxed">
                  Curated cannabis experiences for the modern connoisseur.
                </p>
                <div className="flex flex-wrap gap-1 md:gap-2">
                  <span className="px-2 py-1 border border-green-400 text-green-400 text-xs rounded-full">
                    premium
                  </span>
                  <span className="px-2 py-1 border border-green-400 text-green-400 text-xs rounded-full">
                    artisanal
                  </span>
                  <span className="px-2 py-1 border border-green-400 text-green-400 text-xs rounded-full">
                    curated
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-10 right-10 w-20 h-20 bg-green-500 rounded-full opacity-10 blur-xl"></div>
        <div className="absolute bottom-20 left-10 w-32 h-32 bg-orange-500 rounded-full opacity-10 blur-xl"></div>
        <div className="absolute top-1/2 right-1/4 w-24 h-24 bg-purple-500 rounded-full opacity-10 blur-xl"></div>
      </section>

      {/* Extended Visual Section */}
      <section className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <div className="aspect-[4/3] bg-gradient-to-br from-green-50 to-emerald-100 rounded-lg p-8 flex flex-col justify-center">
              <Leaf className="w-12 h-12 text-green-700 mb-4" />
              <h3 className="text-xl font-fascinate text-green-900 mb-3">Premium Quality</h3>
              <p className="text-sm text-gray-600">
                Every product is carefully selected and tested to ensure the highest standards of excellence and purity.
              </p>
            </div>
            <div className="aspect-[4/3] bg-gradient-to-br from-orange-50 to-amber-100 rounded-lg p-8 flex flex-col justify-center">
              <Coffee className="w-12 h-12 text-orange-700 mb-4" />
              <h3 className="text-xl font-fascinate text-orange-900 mb-3">Community First</h3>
              <p className="text-sm text-gray-600">
                Building a community of cannabis enthusiasts who appreciate excellence and share our passion.
              </p>
            </div>
            <div className="aspect-[4/3] bg-gradient-to-br from-purple-50 to-pink-100 rounded-lg p-8 flex flex-col justify-center">
              <Star className="w-12 h-12 text-purple-700 mb-4" />
              <h3 className="text-xl font-fascinate text-purple-900 mb-3">Innovation</h3>
              <p className="text-sm text-gray-600">
                Pushing boundaries with new products and experiences that delight and inspire our customers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 relative">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img src={pexelsImage} alt="Story Background" className="w-full h-full object-cover object-left" />
          <div className="absolute inset-0 bg-white/90"></div>
        </div>
        
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-fascinate mb-12">
            our story
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-16 mb-16">
            <div className="text-left">
              <h3 className="text-2xl md:text-3xl font-fascinate mb-6">quality</h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                Every product is carefully selected and tested to ensure the highest standards. 
                We work directly with trusted growers and manufacturers to guarantee that every 
                item meets our rigorous quality requirements. From seed to sale, we maintain 
                complete control over the supply chain.
              </p>
            </div>
            <div className="text-left">
              <h3 className="text-2xl md:text-3xl font-fascinate mb-6">community</h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                Building a community of cannabis enthusiasts who appreciate excellence. 
                We host events, workshops, and gatherings that bring people together to share 
                knowledge and experiences. Our community is built on trust, education, and 
                mutual respect for the plant and its benefits.
              </p>
            </div>
            <div className="text-left">
              <h3 className="text-2xl md:text-3xl font-fascinate mb-6">innovation</h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                Pushing boundaries with new products and experiences for our customers. 
                Our team is constantly exploring new strains, consumption methods, and 
                product formulations. We believe in evolving with the industry while 
                maintaining our commitment to quality and safety.
              </p>
            </div>
          </div>
          <div className="pt-8">
            <Link 
              to="/store"
              className="inline-block border-2 border-black px-8 py-4 text-sm font-bold hover:bg-black hover:text-white transition-colors"
            >
              visit the store
            </Link>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="w-full">
        <div className="relative w-full h-96 md:h-screen">
          <video 
            className="w-full h-full object-cover"
            controls
            loop
            playsInline
          >
            <source src={bobMarleyVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </section>

      {/* Extended Collage Gallery */}
      <section className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-black text-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-fascinate mb-16 text-center">
            explore our world
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="aspect-square rounded-lg overflow-hidden relative group">
              <img src={bg12} alt="Collection 1" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                <p className="text-white text-xs p-4 font-semibold">strains</p>
              </div>
            </div>
            <div className="aspect-square rounded-lg overflow-hidden relative group">
              <img src={bg13} alt="Collection 2" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                <p className="text-white text-xs p-4 font-semibold">artisans</p>
              </div>
            </div>
            <div className="aspect-square rounded-lg overflow-hidden relative group">
              <img src={bg14} alt="Collection 3" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                <p className="text-white text-xs p-4 font-semibold">creations</p>
              </div>
            </div>
            <div className="aspect-square rounded-lg overflow-hidden relative group">
              <img src={bg15} alt="Collection 4" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                <p className="text-white text-xs p-4 font-semibold">essence</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-green-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-fascinate mb-8">
            join the experience
          </h2>
          <p className="text-xl mb-12 opacity-90">
            Discover premium cannabis products crafted with care and precision.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/store"
              className="inline-block border-2 border-white px-8 py-4 text-sm font-bold hover:bg-white hover:text-green-600 transition-colors"
            >
              shop now
            </Link>
            <Link 
              to="/shop/herb-house"
              className="inline-block border-2 border-white px-8 py-4 text-sm font-bold hover:bg-white hover:text-green-600 transition-colors"
            >
              learn more
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default VisualCollageHome;
