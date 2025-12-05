import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'nlb9fjou',
  dataset: 'totally-baked',
  useCdn: false,
  apiVersion: '2024-03-19',
  token: process.env.SANITY_API_TOKEN
})

const shops = [
  {
    _type: 'shop',
    name: 'collectibles',
    slug: { _type: 'slug', current: 'collectibles' },
    description: 'Premium collection of smoking accessories and collectibles',
    icon: 'star',
    color: 'from-purple-500 to-pink-500',
    order: 1
  },
  {
    _type: 'shop',
    name: 'delights café',
    slug: { _type: 'slug', current: 'delights-cafe' },
    description: 'Artisanal edibles and infused beverages',
    icon: 'coffee',
    color: 'from-orange-500 to-amber-500',
    order: 2
  },
  {
    _type: 'shop',
    name: 'herb house',
    slug: { _type: 'slug', current: 'herb-house' },
    description: 'Premium cannabis flowers and pre-rolls',
    icon: 'leaf',
    color: 'from-green-500 to-emerald-500',
    order: 3
  }
]

const products = [
  // Collectibles Shop Products
  {
    _type: 'product',
    name: 'vintage grinder',
    slug: { _type: 'slug', current: 'vintage-grinder' },
    type: 'accessory',
    price: 45,
    description: 'Classic vintage-style herb grinder with precision teeth',
    inStock: true,
    featured: false
  },
  {
    _type: 'product',
    name: 'glass pipe collection',
    slug: { _type: 'slug', current: 'glass-pipe-collection' },
    type: 'accessory',
    price: 120,
    description: 'Handcrafted glass pipe collection with unique designs',
    inStock: true,
    featured: true
  },
  {
    _type: 'product',
    name: 'rolling tray set',
    slug: { _type: 'slug', current: 'rolling-tray-set' },
    type: 'accessory',
    price: 35,
    description: 'Complete rolling tray set with accessories',
    inStock: true,
    featured: false
  },
  {
    _type: 'product',
    name: 'limited edition lighter',
    slug: { _type: 'slug', current: 'limited-edition-lighter' },
    type: 'accessory',
    price: 25,
    description: 'Collectible limited edition lighter series',
    inStock: true,
    featured: false
  },
  
  // Delights Café Products
  {
    _type: 'product',
    name: 'space brownie',
    slug: { _type: 'slug', current: 'space-brownie' },
    type: 'edible',
    price: 12,
    weight: '1 piece',
    description: 'Decadent chocolate brownie with premium infusion',
    inStock: true,
    featured: true
  },
  {
    _type: 'product',
    name: 'infused coffee',
    slug: { _type: 'slug', current: 'infused-coffee' },
    type: 'beverage',
    price: 8,
    weight: '12 oz',
    description: 'Premium coffee beans with subtle infusion',
    inStock: true,
    featured: false
  },
  {
    _type: 'product',
    name: 'gummy bears (10mg)',
    slug: { _type: 'slug', current: 'gummy-bears-10mg' },
    type: 'edible',
    price: 18,
    weight: '10 pieces',
    description: 'Fruit-flavored gummy bears with precise dosing',
    inStock: true,
    featured: false
  },
  {
    _type: 'product',
    name: 'chocolate bar',
    slug: { _type: 'slug', current: 'chocolate-bar' },
    type: 'edible',
    price: 15,
    weight: '1 bar',
    description: 'Rich dark chocolate bar with smooth infusion',
    inStock: true,
    featured: false
  },
  
  // Herb House Products
  {
    _type: 'product',
    name: 'purple haze (3.5g)',
    slug: { _type: 'slug', current: 'purple-haze-35g' },
    type: 'flower',
    price: 40,
    weight: '3.5g',
    strain: 'Purple Haze',
    thc: '18-22%',
    description: 'Legendary sativa with euphoric effects and sweet berry aroma',
    inStock: true,
    featured: true,
    effects: ['Euphoric', 'Creative', 'Uplifted'],
    aroma: ['Berry', 'Sweet', 'Earthy']
  },
  {
    _type: 'product',
    name: 'og kush (7g)',
    slug: { _type: 'slug', current: 'og-kush-7g' },
    type: 'flower',
    price: 70,
    weight: '7g',
    strain: 'OG Kush',
    thc: '20-25%',
    description: 'Classic hybrid with powerful relaxation effects',
    inStock: true,
    featured: false,
    effects: ['Relaxed', 'Happy', 'Sleepy'],
    aroma: ['Earthy', 'Woody', 'Pine']
  },
  {
    _type: 'product',
    name: 'sour diesel pre-rolls',
    slug: { _type: 'slug', current: 'sour-diesel-pre-rolls' },
    type: 'pre-roll',
    price: 25,
    weight: '2 pack',
    strain: 'Sour Diesel',
    thc: '19-23%',
    description: 'Pre-rolled Sour Diesel joints with energizing effects',
    inStock: true,
    featured: false,
    effects: ['Energized', 'Focused', 'Creative'],
    aroma: ['Diesel', 'Pungent', 'Earthy']
  },
  {
    _type: 'product',
    name: 'hybrid sampler',
    slug: { _type: 'slug', current: 'hybrid-sampler' },
    type: 'flower',
    price: 55,
    weight: '4g total',
    description: 'Curated sampler of premium hybrid strains',
    inStock: true,
    featured: false,
    effects: ['Balanced', 'Relaxed', 'Happy'],
    aroma: ['Mixed', 'Fruity', 'Earthy']
  }
]

async function seedData() {
  try {
    console.log('Clearing existing data...')
    
    // Delete existing shops and products
    const existingShops = await client.fetch('*[_type == "shop"]')
    const existingProducts = await client.fetch('*[_type == "product"]')
    
    for (const shop of existingShops) {
      await client.delete(shop._id)
    }
    
    for (const product of existingProducts) {
      await client.delete(product._id)
    }
    
    console.log('Creating shops...')
    const createdShops = []
    for (const shop of shops) {
      const created = await client.create(shop)
      createdShops.push(created)
      console.log(`Created shop: ${created.name}`)
    }
    
    console.log('Creating products...')
    const createdProducts = []
    for (const product of products) {
      const created = await client.create(product)
      createdProducts.push(created)
      console.log(`Created product: ${created.name}`)
    }
    
    // Link products to shops
    console.log('Linking products to shops...')
    
    // Collectibles products (first 4 products)
    const collectiblesShop = createdShops.find(s => s.slug.current === 'collectibles')
    if (collectiblesShop) {
      await client.patch(collectiblesShop._id).set({
        products: createdProducts.slice(0, 4).map(p => ({ _ref: p._id, _type: 'reference' }))
      }).commit()
    }
    
    // Delights Café products (next 4 products)
    const delightsShop = createdShops.find(s => s.slug.current === 'delights-cafe')
    if (delightsShop) {
      await client.patch(delightsShop._id).set({
        products: createdProducts.slice(4, 8).map(p => ({ _ref: p._id, _type: 'reference' }))
      }).commit()
    }
    
    // Herb House products (last 4 products)
    const herbHouseShop = createdShops.find(s => s.slug.current === 'herb-house')
    if (herbHouseShop) {
      await client.patch(herbHouseShop._id).set({
        products: createdProducts.slice(8, 12).map(p => ({ _ref: p._id, _type: 'reference' }))
      }).commit()
    }
    
    console.log('Data seeding completed successfully!')
    
  } catch (error) {
    console.error('Error seeding data:', error)
  }
}

seedData()
