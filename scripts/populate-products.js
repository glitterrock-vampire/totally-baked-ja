import { createClient } from '@sanity/client';

// Initialize Sanity client
const client = createClient({
  projectId: 'nlb9fjou',
  dataset: 'totally-baked',
  useCdn: false,
  apiVersion: '2024-01-01'
});

// Product data from original Alpine.js design
const products = [
  // Herb House Products
  {
    _type: 'product',
    name: 'northern lights v2',
    category: 'herb house',
    price: 45,
    thc: '24%',
    strain: 'indica dominant',
    description: 'indica dominant. relaxation module.',
    slug: { _type: 'slug', current: 'northern-lights-v2' },
    images: [
      {
        _type: 'image',
        asset: {
          _ref: 'image-herb-northern-lights',
          _type: 'reference'
        }
      }
    ],
    isMostSold: true,
    sortOrder: 1
  },
  {
    _type: 'product',
    name: 'sour diesel pro',
    category: 'herb house',
    price: 50,
    thc: '26%',
    strain: 'sativa dominant',
    description: 'sativa dominant. energy output maximized.',
    slug: { _type: 'slug', current: 'sour-diesel-pro' },
    images: [
      {
        _type: 'image',
        asset: {
          _ref: 'image-herb-sour-diesel',
          _type: 'reference'
        }
      }
    ],
    isMostSold: true,
    sortOrder: 2
  },
  {
    _type: 'product',
    name: 'gelato 41.exe',
    category: 'herb house',
    price: 48,
    thc: '22%',
    strain: 'hybrid',
    description: 'hybrid. balanced system performance.',
    slug: { _type: 'slug', current: 'gelato-41-exe' },
    images: [
      {
        _type: 'image',
        asset: {
          _ref: 'image-herb-gelato',
          _type: 'reference'
        }
      }
    ],
    isMostSold: true,
    sortOrder: 3
  },
  {
    _type: 'product',
    name: 'purple punch mk2',
    category: 'herb house',
    price: 46,
    thc: '25%',
    strain: 'indica',
    description: 'indica. deep relaxation protocol.',
    slug: { _type: 'slug', current: 'purple-punch-mk2' },
    images: [
      {
        _type: 'image',
        asset: {
          _ref: 'image-herb-purple-punch',
          _type: 'reference'
        }
      }
    ],
    sortOrder: 4
  },
  {
    _type: 'product',
    name: 'blue dream ultra',
    category: 'herb house',
    price: 47,
    thc: '23%',
    strain: 'sativa hybrid',
    description: 'sativa hybrid. creative enhancement.',
    slug: { _type: 'slug', current: 'blue-dream-ultra' },
    images: [
      {
        _type: 'image',
        asset: {
          _ref: 'image-herb-blue-dream',
          _type: 'reference'
        }
      }
    ],
    sortOrder: 5
  },
  {
    _type: 'product',
    name: 'white widow x',
    category: 'herb house',
    price: 49,
    thc: '27%',
    strain: 'balanced hybrid',
    description: 'balanced hybrid. full spectrum.',
    slug: { _type: 'slug', current: 'white-widow-x' },
    images: [
      {
        _type: 'image',
        asset: {
          _ref: 'image-herb-white-widow',
          _type: 'reference'
        }
      }
    ],
    sortOrder: 6
  },
  {
    _type: 'product',
    name: 'gorilla glue #4',
    category: 'herb house',
    price: 51,
    thc: '29%',
    strain: 'heavy indica',
    description: 'heavy indica. maximum potency.',
    slug: { _type: 'slug', current: 'gorilla-glue-4' },
    images: [
      {
        _type: 'image',
        asset: {
          _ref: 'image-herb-gorilla-glue',
          _type: 'reference'
        }
      }
    ],
    isMostSold: true,
    sortOrder: 7
  },
  {
    _type: 'product',
    name: 'jack herer elite',
    category: 'herb house',
    price: 48,
    thc: '24%',
    strain: 'sativa',
    description: 'sativa. cerebral activation.',
    slug: { _type: 'slug', current: 'jack-herer-elite' },
    images: [
      {
        _type: 'image',
        asset: {
          _ref: 'image-herb-jack-herer',
          _type: 'reference'
        }
      }
    ],
    sortOrder: 8
  },

  // Delights Products
  {
    _type: 'product',
    name: 'geometric gummies',
    category: 'delights',
    price: 35,
    weight: '10mg each',
    type: 'gummies',
    description: 'precision dosed. citrus algorithms.',
    slug: { _type: 'slug', current: 'geometric-gummies' },
    images: [
      {
        _type: 'image',
        asset: {
          _ref: 'image-delights-gummies',
          _type: 'reference'
        }
      }
    ],
    isMostSold: true,
    sortOrder: 1
  },
  {
    _type: 'product',
    name: 'dark matter bar',
    category: 'delights',
    price: 28,
    weight: '100mg total',
    type: 'chocolate',
    description: 'premium dark chocolate infusion.',
    slug: { _type: 'slug', current: 'dark-matter-bar' },
    images: [
      {
        _type: 'image',
        asset: {
          _ref: 'image-delights-chocolate',
          _type: 'reference'
        }
      }
    ],
    isMostSold: true,
    sortOrder: 2
  },
  {
    _type: 'product',
    name: 'liquid logic fizz',
    category: 'delights',
    price: 8,
    weight: '5mg/can',
    type: 'beverage',
    description: 'carbonated cannabis beverage.',
    slug: { _type: 'slug', current: 'liquid-logic-fizz' },
    images: [
      {
        _type: 'image',
        asset: {
          _ref: 'image-delights-beverage',
          _type: 'reference'
        }
      }
    ],
    sortOrder: 3
  },
  {
    _type: 'product',
    name: 'mint protocol',
    category: 'delights',
    price: 22,
    weight: '5mg each',
    type: 'mints',
    description: 'breath mints. discrete dosing.',
    slug: { _type: 'slug', current: 'mint-protocol' },
    images: [
      {
        _type: 'image',
        asset: {
          _ref: 'image-delights-mints',
          _type: 'reference'
        }
      }
    ],
    sortOrder: 4
  },
  {
    _type: 'product',
    name: 'honey drip system',
    category: 'delights',
    price: 40,
    weight: '500mg jar',
    type: 'honey',
    description: 'infused raw honey. natural sweetness.',
    slug: { _type: 'slug', current: 'honey-drip-system' },
    images: [
      {
        _type: 'image',
        asset: {
          _ref: 'image-delights-honey',
          _type: 'reference'
        }
      }
    ],
    isMostSold: true,
    sortOrder: 5
  },
  {
    _type: 'product',
    name: 'cookie protocol',
    category: 'delights',
    price: 18,
    weight: '25mg each',
    type: 'cookies',
    description: 'double chocolate chip. premium bake.',
    slug: { _type: 'slug', current: 'cookie-protocol' },
    images: [
      {
        _type: 'image',
        asset: {
          _ref: 'image-delights-cookies',
          _type: 'reference'
        }
      }
    ],
    sortOrder: 6
  },
  {
    _type: 'product',
    name: 'hard candy matrix',
    category: 'delights',
    price: 30,
    weight: '10mg each',
    type: 'candy',
    description: 'fruit flavored. long lasting.',
    slug: { _type: 'slug', current: 'hard-candy-matrix' },
    images: [
      {
        _type: 'image',
        asset: {
          _ref: 'image-delights-candy',
          _type: 'reference'
        }
      }
    ],
    sortOrder: 7
  },
  {
    _type: 'product',
    name: 'tincture drops',
    category: 'delights',
    price: 45,
    weight: '1000mg bottle',
    type: 'tincture',
    description: 'sublingual delivery. fast acting.',
    slug: { _type: 'slug', current: 'tincture-drops' },
    images: [
      {
        _type: 'image',
        asset: {
          _ref: 'image-delights-tincture',
          _type: 'reference'
        }
      }
    ],
    sortOrder: 8
  },

  // Collectibles Products
  {
    _type: 'product',
    name: 'lab coat tee',
    category: 'collectibles',
    price: 45,
    type: 'apparel',
    description: 'premium branded apparel.',
    slug: { _type: 'slug', current: 'lab-coat-tee' },
    images: [
      {
        _type: 'image',
        asset: {
          _ref: 'image-collectibles-tee',
          _type: 'reference'
        }
      }
    ],
    sortOrder: 1
  },
  {
    _type: 'product',
    name: 'milled grinder v1',
    category: 'collectibles',
    price: 85,
    type: 'vaporizer',
    description: 'precision engineered grinder.',
    slug: { _type: 'slug', current: 'milled-grinder-v1' },
    images: [
      {
        _type: 'image',
        asset: {
          _ref: 'image-collectibles-grinder',
          _type: 'reference'
        }
      }
    ],
    isMostSold: true,
    sortOrder: 2
  },
  {
    _type: 'product',
    name: 'rolling platform',
    category: 'collectibles',
    price: 60,
    type: 'accessories',
    description: 'organized rolling station.',
    slug: { _type: 'slug', current: 'rolling-platform' },
    images: [
      {
        _type: 'image',
        asset: {
          _ref: 'image-collectibles-platform',
          _type: 'reference'
        }
      }
    ],
    sortOrder: 3
  },
  {
    _type: 'product',
    name: 'ignition source',
    category: 'collectibles',
    price: 25,
    type: 'accessories',
    description: 'premium lighter system.',
    slug: { _type: 'slug', current: 'ignition-source' },
    images: [
      {
        _type: 'image',
        asset: {
          _ref: 'image-collectibles-lighter',
          _type: 'reference'
        }
      }
    ],
    sortOrder: 4
  },
  {
    _type: 'product',
    name: 'storage vault',
    category: 'collectibles',
    price: 75,
    type: 'storage',
    description: 'humidity controlled container.',
    slug: { _type: 'slug', current: 'storage-vault' },
    images: [
      {
        _type: 'image',
        asset: {
          _ref: 'image-collectibles-storage',
          _type: 'reference'
        }
      }
    ],
    sortOrder: 5
  },
  {
    _type: 'product',
    name: 'system hoodie',
    category: 'collectibles',
    price: 85,
    type: 'apparel',
    description: 'branded heavyweight hoodie.',
    slug: { _type: 'slug', current: 'system-hoodie' },
    images: [
      {
        _type: 'image',
        asset: {
          _ref: 'image-collectibles-hoodie',
          _type: 'reference'
        }
      }
    ],
    isMostSold: true,
    sortOrder: 6
  },
  {
    _type: 'product',
    name: 'rolling papers pro',
    category: 'collectibles',
    price: 12,
    type: 'papers',
    description: 'slow burn. natural gum.',
    slug: { _type: 'slug', current: 'rolling-papers-pro' },
    images: [
      {
        _type: 'image',
        asset: {
          _ref: 'image-collectibles-papers',
          _type: 'reference'
        }
      }
    ],
    sortOrder: 7
  },
  {
    _type: 'product',
    name: 'field notes',
    category: 'collectibles',
    price: 20,
    type: 'accessories',
    description: 'strain tracking notebook.',
    slug: { _type: 'slug', current: 'field-notes' },
    images: [
      {
        _type: 'image',
        asset: {
          _ref: 'image-collectibles-notebook',
          _type: 'reference'
        }
      }
    ],
    sortOrder: 8
  }
];

async function populateProducts() {
  try {
    console.log('Starting product population...');
    
    // Clear existing products
    const existingProducts = await client.fetch('*[_type == "product"]');
    console.log(`Found ${existingProducts.length} existing products`);
    
    if (existingProducts.length > 0) {
      await client.delete(existingProducts.map(p => p._id));
      console.log('Cleared existing products');
    }

    // Create new products
    const results = await client.create(products);
    console.log(`Created ${results.length} products`);
    
    console.log('Product population complete!');
    
    // Log the most sold items
    const mostSold = await client.fetch('*[_type == "product" && isMostSold == true] | order(sortOrder asc)');
    console.log('Most sold items:', mostSold.map(p => p.name));
    
  } catch (error) {
    console.error('Error populating products:', error);
  }
}

populateProducts();
