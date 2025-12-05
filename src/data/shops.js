import { Star, Coffee, Leaf } from 'lucide-react';

export const shops = [
  {
    id: 'collectibles',
    name: 'collectibles',
    icon: Star,
    color: 'from-purple-500 to-pink-500',
    products: [
      { 
        id: 'vintage-grinder',
        name: 'vintage grinder', 
        price: 45, 
        type: 'accessory' 
      },
      { 
        id: 'glass-pipe-collection',
        name: 'glass pipe collection', 
        price: 120, 
        type: 'accessory' 
      },
      { 
        id: 'rolling-tray-set',
        name: 'rolling tray set', 
        price: 35, 
        type: 'accessory' 
      },
      { 
        id: 'limited-edition-lighter',
        name: 'limited edition lighter', 
        price: 25, 
        type: 'accessory' 
      }
    ]
  },
  {
    id: 'delights-cafe',
    name: 'delights café',
    icon: Coffee,
    color: 'from-orange-500 to-amber-500',
    products: [
      { 
        id: 'space-brownie',
        name: 'space brownie', 
        price: 12, 
        type: 'edible' 
      },
      { 
        id: 'infused-coffee',
        name: 'infused coffee', 
        price: 8, 
        type: 'beverage' 
      },
      { 
        id: 'gummy-bears',
        name: 'gummy bears (10mg)', 
        price: 18, 
        type: 'edible' 
      },
      { 
        id: 'chocolate-bar',
        name: 'chocolate bar', 
        price: 15, 
        type: 'edible' 
      }
    ]
  },
  {
    id: 'herb-house',
    name: 'herb house',
    icon: Leaf,
    color: 'from-green-500 to-emerald-500',
    products: [
      { 
        id: 'purple-haze',
        name: 'purple haze (3.5g)', 
        price: 40, 
        type: 'flower' 
      },
      { 
        id: 'og-kush',
        name: 'og kush (7g)', 
        price: 70, 
        type: 'flower' 
      },
      { 
        id: 'sour-diesel-pre-rolls',
        name: 'sour diesel pre-rolls', 
        price: 25, 
        type: 'pre-roll' 
      },
      { 
        id: 'hybrid-sampler',
        name: 'hybrid sampler', 
        price: 55, 
        type: 'flower' 
      }
    ]
  }
];
