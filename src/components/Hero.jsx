import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Coffee, Leaf } from 'lucide-react';
import { shops } from '../data/shops';

const Hero = () => {
  return (
    <section className="min-h-screen bg-white relative overflow-hidden">
      {/* Teenage Engineering-inspired Layout */}
      <div className="relative h-screen pt-16">
        {/* Main Content Area */}
        <div className="flex flex-col lg:flex-row h-full">
          {/* Left Sidebar - Product Categories */}
          <div className="w-full lg:w-64 lg:border-r lg:border-black p-4 lg:p-6 space-y-4 lg:space-y-8">
            {/* Mobile: Horizontal scroll categories */}
            <div className="lg:hidden">
              <div className="flex gap-4 overflow-x-auto pb-2">
                <div className="flex-shrink-0">
                  <h3 className="text-sm font-fascinate mb-2">herb house</h3>
                  <div className="flex gap-2 text-xs">
                    <Link to="/shop/herb-house" className="whitespace-nowrap px-2 py-1 border border-black hover:bg-black hover:text-white transition-colors">flower</Link>
                    <Link to="/shop/herb-house" className="whitespace-nowrap px-2 py-1 border border-black hover:bg-black hover:text-white transition-colors">pre-rolls</Link>
                    <Link to="/shop/herb-house" className="whitespace-nowrap px-2 py-1 border border-black hover:bg-black hover:text-white transition-colors">concentrates</Link>
                  </div>
                </div>
                
                <div className="flex-shrink-0">
                  <h3 className="text-sm font-fascinate mb-2">delights café</h3>
                  <div className="flex gap-2 text-xs">
                    <Link to="/shop/delights-cafe" className="whitespace-nowrap px-2 py-1 border border-black hover:bg-black hover:text-white transition-colors">edibles</Link>
                    <Link to="/shop/delights-cafe" className="whitespace-nowrap px-2 py-1 border border-black hover:bg-black hover:text-white transition-colors">beverages</Link>
                    <Link to="/shop/delights-cafe" className="whitespace-nowrap px-2 py-1 border border-black hover:bg-black hover:text-white transition-colors">tinctures</Link>
                  </div>
                </div>

                <div className="flex-shrink-0">
                  <h3 className="text-sm font-fascinate mb-2">collectibles</h3>
                  <div className="flex gap-2 text-xs">
                    <Link to="/shop/collectibles" className="whitespace-nowrap px-2 py-1 border border-black hover:bg-black hover:text-white transition-colors">accessories</Link>
                    <Link to="/shop/collectibles" className="whitespace-nowrap px-2 py-1 border border-black hover:bg-black hover:text-white transition-colors">gear</Link>
                    <Link to="/shop/collectibles" className="whitespace-nowrap px-2 py-1 border border-black hover:bg-black hover:text-white transition-colors">merch</Link>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Desktop: Vertical sidebar */}
            <div className="hidden lg:block">
              <div>
                <h3 className="text-lg font-fascinate mb-4">herb house</h3>
                <div className="space-y-2 text-sm">
                  <Link to="/shop/herb-house" className="block hover:text-green-600 transition-colors">premium flower</Link>
                  <Link to="/shop/herb-house" className="block hover:text-green-600 transition-colors">pre-rolls</Link>
                  <Link to="/shop/herb-house" className="block hover:text-green-600 transition-colors">concentrates</Link>
                </div>
              </div>
              
              <div className="mt-6">
                <h3 className="text-lg font-fascinate mb-4">delights café</h3>
                <div className="space-y-2 text-sm">
                  <Link to="/shop/delights-cafe" className="block hover:text-green-600 transition-colors">edibles</Link>
                  <Link to="/shop/delights-cafe" className="block hover:text-green-600 transition-colors">beverages</Link>
                  <Link to="/shop/delights-cafe" className="block hover:text-green-600 transition-colors">tinctures</Link>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-fascinate mb-4">collectibles</h3>
                <div className="space-y-2 text-sm">
                  <Link to="/shop/collectibles" className="block hover:text-green-600 transition-colors">accessories</Link>
                  <Link to="/shop/collectibles" className="block hover:text-green-600 transition-colors">gear</Link>
                  <Link to="/shop/collectibles" className="block hover:text-green-600 transition-colors">merchandise</Link>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content - Product Grid */}
          <div className="flex-1 p-4 lg:p-8 overflow-y-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8">
              {/* Featured Product - Large */}
              <Link 
                to="/shop/herb-house"
                className="group block"
              >
                <div className="relative">
                  <div className="aspect-square bg-gradient-to-br from-green-500 to-emerald-500 opacity-20 rounded-lg lg:rounded-xl group-hover:opacity-30 transition-all duration-300" />
                  <div className="absolute inset-0 flex flex-col justify-between p-4 lg:p-6">
                    <Leaf className="w-8 h-8 lg:w-12 lg:h-12 text-green-700" />
                    <div>
                      <h3 className="text-lg lg:text-xl font-fascinate text-green-900 mb-2">
                        herb house
                      </h3>
                      <p className="text-green-800 text-xs lg:text-sm">premium flower collection</p>
                      <div className="mt-3 flex items-center gap-2">
                        <span className="text-green-700 text-xs lg:text-xs">explore</span>
                        <span className="w-5 h-5 lg:w-6 lg:h-6 bg-green-700 rounded-full flex items-center justify-center group-hover:bg-green-600 transition-colors">
                          <span className="text-white text-xs">→</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>

              {/* Medium Products */}
              <Link 
                to="/shop/delights-cafe"
                className="group block"
              >
                <div className="relative">
                  <div className="aspect-square bg-gradient-to-br from-orange-500 to-amber-500 opacity-20 rounded-lg lg:rounded-xl group-hover:opacity-30 transition-all duration-300" />
                  <div className="absolute inset-0 flex flex-col justify-between p-4 lg:p-6">
                    <Coffee className="w-8 h-8 lg:w-10 lg:h-10 text-orange-700" />
                    <div>
                      <h3 className="text-base lg:text-lg font-fascinate text-orange-900 mb-2">
                        delights café
                      </h3>
                      <p className="text-orange-800 text-xs lg:text-sm">edibles & beverages</p>
                      <div className="mt-3 flex items-center gap-2">
                        <span className="text-orange-700 text-xs">explore</span>
                        <span className="w-4 h-4 lg:w-5 lg:h-5 bg-orange-700 rounded-full flex items-center justify-center group-hover:bg-orange-600 transition-colors">
                          <span className="text-white text-xs">→</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>

              <Link 
                to="/shop/collectibles"
                className="group block"
              >
                <div className="relative">
                  <div className="aspect-square bg-gradient-to-br from-purple-500 to-pink-500 opacity-20 rounded-lg lg:rounded-xl group-hover:opacity-30 transition-all duration-300" />
                  <div className="absolute inset-0 flex flex-col justify-between p-4 lg:p-6">
                    <Star className="w-8 h-8 lg:w-10 lg:h-10 text-purple-700" />
                    <div>
                      <h3 className="text-base lg:text-lg font-fascinate text-purple-900 mb-2">
                        collectibles
                      </h3>
                      <p className="text-purple-800 text-xs lg:text-sm">gear & accessories</p>
                      <div className="mt-3 flex items-center gap-2">
                        <span className="text-purple-700 text-xs">explore</span>
                        <span className="w-4 h-4 lg:w-5 lg:h-5 bg-purple-700 rounded-full flex items-center justify-center group-hover:bg-purple-600 transition-colors">
                          <span className="text-white text-xs">→</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>

              {/* Additional Products */}
              <Link 
                to="/product/purple-haze"
                className="group block"
              >
                <div className="relative">
                  <div className="aspect-square bg-neutral-100 rounded-lg lg:rounded-xl group-hover:bg-neutral-200 transition-all duration-300" />
                  <div className="absolute inset-0 flex flex-col justify-between p-4 lg:p-6">
                    <div className="w-6 h-6 lg:w-8 lg:h-8 bg-green-600 rounded-full"></div>
                    <div>
                      <h3 className="text-xs lg:text-sm font-bold mb-1">purple haze</h3>
                      <p className="text-xs text-neutral-600">3.5g • hybrid</p>
                      <div className="mt-2">
                        <span className="text-xs lg:text-xs font-bold">$40</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>

              <Link 
                to="/product/space-brownie"
                className="group block"
              >
                <div className="relative">
                  <div className="aspect-square bg-neutral-100 rounded-lg lg:rounded-xl group-hover:bg-neutral-200 transition-all duration-300" />
                  <div className="absolute inset-0 flex flex-col justify-between p-4 lg:p-6">
                    <div className="w-6 h-6 lg:w-8 lg:h-8 bg-orange-600 rounded-full"></div>
                    <div>
                      <h3 className="text-xs lg:text-sm font-bold mb-1">space brownie</h3>
                      <p className="text-xs text-neutral-600">50mg • edible</p>
                      <div className="mt-2">
                        <span className="text-xs lg:text-xs font-bold">$12</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>

              <Link 
                to="/product/vintage-grinder"
                className="group block"
              >
                <div className="relative">
                  <div className="aspect-square bg-neutral-100 rounded-lg lg:rounded-xl group-hover:bg-neutral-200 transition-all duration-300" />
                  <div className="absolute inset-0 flex flex-col justify-between p-4 lg:p-6">
                    <div className="w-6 h-6 lg:w-8 lg:h-8 bg-purple-600 rounded-full"></div>
                    <div>
                      <h3 className="text-xs lg:text-sm font-bold mb-1">vintage grinder</h3>
                      <p className="text-xs text-neutral-600">accessory</p>
                      <div className="mt-2">
                        <span className="text-xs lg:text-xs font-bold">$45</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>

            {/* Bottom Call to Action */}
            <div className="mt-8 lg:mt-12 text-center px-4">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-fascinate mb-4">
                totally
                <br />
                <span className="text-green-600">baked</span>
              </h2>
              <p className="text-neutral-600 mb-6 lg:mb-8 text-sm lg:text-base">
                premium cannabis experience
              </p>
              <Link 
                to="/store"
                className="inline-block border-2 border-black px-4 py-2 lg:px-6 lg:py-3 text-xs lg:text-sm font-bold hover:bg-black hover:text-white transition-colors"
              >
                visit store →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
