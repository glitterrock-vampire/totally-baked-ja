import { useState, useEffect } from 'react';
import { client } from '../../sanity/lib/client';

export const useSanityProducts = () => {
  const [products, setProducts] = useState([]);
  const [shops, setShops] = useState([]);
  const [homepage, setHomepage] = useState(null);
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch products
        const productsQuery = `*[_type == "product"] | order(createdAt desc) {
          _id,
          name,
          slug,
          type,
          price,
          weight,
          strain,
          thc,
          cbd,
          description,
          effects,
          aroma,
          category,
          origin,
          harvestDate,
          labTested,
          organic,
          images,
          inStock,
          featured
        }`;
        
        const productsData = await client.fetch(productsQuery);
        
        // Fetch homepage
        const homepageQuery = `*[_type == "homepage"][0] {
          _id,
          title,
          heroHeadline,
          heroDescription,
          featuredProduct->{
            _id,
            name,
            slug,
            type,
            price,
            weight,
            strain,
            thc,
            cbd,
            description,
            images,
            inStock,
            featured,
            category,
            badge
          },
          mostSoldProducts[]->{
            _id,
            name,
            slug,
            type,
            price,
            weight,
            strain,
            thc,
            cbd,
            description,
            images,
            inStock,
            featured,
            category,
            badge,
            sortOrder
          },
          categorySections,
          tickerMessages,
          videoSection,
          newsletterSection,
          seo
        }`;

        // Fetch collections
        const collectionsQuery = `*[_type == "collection" && isActive == true] | order(sortOrder asc) {
          _id,
          name,
          slug,
          description,
          collectionType,
          icon,
          color,
          products[]->{
            _id,
            name,
            slug,
            type,
            price,
            weight,
            strain,
            thc,
            cbd,
            description,
            images,
            inStock,
            featured,
            category,
            badge,
            sortOrder
          },
          featuredProducts[]->{
            _id,
            name,
            slug,
            type,
            price,
            weight,
            strain,
            thc,
            cbd,
            description,
            images,
            inStock,
            featured,
            category,
            badge,
            sortOrder
          },
          heroImage,
          sortOrder
        }`;

        // Fetch shops
        const shopsQuery = `*[_type == "shop" && isActive == true] | order(sortOrder asc) {
          _id,
          name,
          slug,
          headline,
          description,
          categoryLabel,
          shopType,
          heroImage,
          icon,
          themeColor,
          backgroundColor,
          featuredProducts[]->{
            _id,
            name,
            slug,
            type,
            price,
            weight,
            strain,
            thc,
            cbd,
            description,
            images,
            inStock,
            featured,
            category,
            badge,
            sortOrder
          },
          allProducts[]->{
            _id,
            name,
            slug,
            type,
            price,
            weight,
            strain,
            thc,
            cbd,
            description,
            images,
            inStock,
            featured,
            category,
            badge,
            sortOrder
          },
          productFilters,
          isActive,
          sortOrder,
          seo
        }`;
        
        const [homepageData, collectionsData, shopsData] = await Promise.all([
          client.fetch(homepageQuery),
          client.fetch(collectionsQuery),
          client.fetch(shopsQuery)
        ]);
        
        setProducts(productsData);
        setHomepage(homepageData);
        setCollections(collectionsData);
        setShops(shopsData);
      } catch (err) {
        console.error('Error fetching Sanity data:', err);
        console.error('Sanity config:', { projectId: 'nlb9fjou', dataset: 'totally-baked' });
        setError(err);
        
        // Fallback sample data if Sanity fails
        const fallbackProducts = [
          // Herb House Products (flower category)
          {
            _id: 'h1',
            name: 'northern lights v2',
            category: 'flower',
            price: 45,
            thc: '24%',
            strain: 'indica dominant',
            description: 'indica dominant. relaxation module.',
            image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            inStock: true,
            featured: true
          },
          {
            _id: 'h2',
            name: 'sour diesel pro',
            category: 'flower',
            price: 50,
            thc: '26%',
            strain: 'sativa dominant',
            description: 'sativa dominant. energy output maximized.',
            image: 'https://images.unsplash.com/photo-1536147116438-62679a5e01f2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            inStock: true,
            featured: true
          },
          {
            _id: 'h3',
            name: 'gelato 41.exe',
            category: 'flower',
            price: 48,
            thc: '22%',
            strain: 'hybrid',
            description: 'hybrid. balanced system performance.',
            image: 'https://images.unsplash.com/photo-1615485925694-a62ea95b315c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            inStock: true,
            featured: false
          },
          {
            _id: 'h4',
            name: 'purple punch mk2',
            category: 'flower',
            price: 46,
            thc: '25%',
            strain: 'indica',
            description: 'indica. deep relaxation protocol.',
            image: 'https://images.unsplash.com/photo-1605440698600-c0d3e1d7b5e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            inStock: true,
            featured: false
          },
          
          // Delights Products (edible category)
          {
            _id: 'd1',
            name: 'geometric gummies',
            category: 'edible',
            price: 35,
            weight: '10mg each',
            type: 'gummies',
            description: 'precision dosed. citrus algorithms.',
            image: 'https://images.unsplash.com/photo-1582053433976-25c00369fc93?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            inStock: true,
            featured: true
          },
          {
            _id: 'd2',
            name: 'dark matter bar',
            category: 'edible',
            price: 28,
            weight: '100mg total',
            type: 'chocolate',
            description: 'premium dark chocolate infusion.',
            image: 'https://images.unsplash.com/photo-1606312619070-d48b4cda8e6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            inStock: true,
            featured: true
          },
          {
            _id: 'd3',
            name: 'liquid logic fizz',
            category: 'beverage',
            price: 8,
            weight: '5mg/can',
            type: 'beverage',
            description: 'carbonated cannabis beverage.',
            image: 'https://images.unsplash.com/photo-1625772452859-1c03d5bf1137?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            inStock: true,
            featured: false
          },
          {
            _id: 'd4',
            name: 'mint protocol',
            category: 'edible',
            price: 22,
            weight: '5mg each',
            type: 'mints',
            description: 'breath mints. discrete dosing.',
            image: 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            inStock: true,
            featured: false
          },
          
          // Collectibles Products (accessory category)
          {
            _id: 'c1',
            name: 'lab coat tee',
            category: 'accessory',
            price: 45,
            type: 'apparel',
            description: 'premium branded apparel.',
            image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            inStock: true,
            featured: false
          },
          {
            _id: 'c2',
            name: 'milled grinder v1',
            category: 'accessory',
            price: 85,
            type: 'vaporizer',
            description: 'precision engineered grinder.',
            image: 'https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            inStock: true,
            featured: true
          },
          {
            _id: 'c3',
            name: 'rolling platform',
            category: 'accessory',
            price: 60,
            type: 'accessories',
            description: 'organized rolling station.',
            image: 'https://images.unsplash.com/photo-1577563908411-5077b6dc7624?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            inStock: true,
            featured: false
          },
          {
            _id: 'c4',
            name: 'ignition source',
            category: 'accessory',
            price: 25,
            type: 'accessories',
            description: 'premium lighter system.',
            image: 'https://images.unsplash.com/photo-1542219550-37153d387c27?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            inStock: true,
            featured: false
          }
        ];
        
        setProducts(fallbackProducts);
        
        // Fallback homepage data
        const fallbackHomepage = {
          heroHeadline: 'precision\nengineered\ncannabis',
          heroDescription: 'we design botanical experiences with industrial precision. our products are calibrated for optimal performance. no fillers. no compromises.',
          tickerMessages: ['new harvest available', 'free shipping over $100', 'system update: edibles restocked'],
          categorySections: [
            { title: 'herb house', subtitle: 'premium flower', slug: { current: 'herb-house' }, icon: 'leaf' },
            { title: 'delights', subtitle: 'edibles & more', slug: { current: 'delights-cafe' }, icon: 'coffee' },
            { title: 'collectibles', subtitle: 'hardware & apparel', slug: { current: 'collectibles' }, icon: 'star' }
          ]
        };
        
        setHomepage(fallbackHomepage);
        
        // Fallback shop data
        const fallbackShops = [
          {
            _id: 'shop-herb-house',
            name: 'Herb House',
            slug: { current: 'herb-house' },
            headline: 'Premium Cannabis Flower',
            description: 'premium cannabis flower. strain-specific cultivation. lab tested for potency and purity.',
            categoryLabel: 'herb house',
            shopType: 'herb-house',
            icon: 'leaf',
            themeColor: 'from-green-500 to-emerald-500',
            backgroundColor: 'bg-[#f5f5f5]',
            featuredProducts: [],
            allProducts: [],
            productFilters: [
              { name: 'Indica', value: 'indica' },
              { name: 'Sativa', value: 'sativa' },
              { name: 'Hybrid', value: 'hybrid' }
            ],
            isActive: true,
            sortOrder: 1
          },
          {
            _id: 'shop-delights-cafe',
            name: 'Delights Café',
            slug: { current: 'delights-cafe' },
            headline: 'Edibles & Beverages',
            description: 'precision-dosed edibles. consistent effects. gourmet ingredients. lab verified potency.',
            categoryLabel: 'delights',
            shopType: 'delights-cafe',
            icon: 'coffee',
            themeColor: 'from-orange-500 to-amber-500',
            backgroundColor: 'bg-[#f5f5f5]',
            featuredProducts: [],
            allProducts: [],
            productFilters: [
              { name: 'Gummies', value: 'gummies' },
              { name: 'Chocolates', value: 'chocolates' },
              { name: 'Beverages', value: 'beverages' }
            ],
            isActive: true,
            sortOrder: 2
          },
          {
            _id: 'shop-collectibles',
            name: 'Collectibles',
            slug: { current: 'collectibles' },
            headline: 'Accessories & Apparel',
            description: 'premium accessories and apparel. engineered for performance. designed for enthusiasts.',
            categoryLabel: 'collectibles',
            shopType: 'collectibles',
            icon: 'star',
            themeColor: 'from-purple-500 to-pink-500',
            backgroundColor: 'bg-[#f5f5f5]',
            featuredProducts: [],
            allProducts: [],
            productFilters: [
              { name: 'Vaporizers', value: 'vaporizers' },
              { name: 'Pipes', value: 'pipes' },
              { name: 'Apparel', value: 'apparel' }
            ],
            isActive: true,
            sortOrder: 3
          }
        ];
        
        setShops(fallbackShops);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Helper function to get image URL
  const getImageUrl = (image) => {
    if (!image) return 'https://images.unsplash.com/photo-1603909223429-69bb7101f420?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
    if (typeof image === 'string') return image;
    if (image.asset) return `https://cdn.sanity.io/images/nlb9fjou/totally-baked/${image.asset._ref.replace('image-', '').replace('-jpg', '.jpg').replace('-png', '.png').replace('-webp', '.webp')}`;
    return 'https://images.unsplash.com/photo-1603909223429-69bb7101f420?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
  };

  // Get featured product from homepage or fallback
  const featuredProduct = homepage?.featuredProduct || (products.length > 0 ? (products.find(p => p.featured && p.inStock) || products[0]) : null);

  // Get "most sold" section items: 8 total (3 herb, 3 delights, 2 collectibles)
  const herbForMostSold = products
    .filter((p) => (p.type === 'flower' || p.type === 'pre-roll') && p.inStock !== false)
    .slice(0, 3);

  const delightsForMostSold = products
    .filter((p) => ['edible', 'beverage'].includes(p.type) && p.inStock !== false)
    .slice(0, 3);

  const collectiblesForMostSold = products
    .filter((p) => p.type === 'accessory' && p.inStock !== false)
    .slice(0, 2);

  const mostSoldItems = [
    ...herbForMostSold,
    ...delightsForMostSold,
    ...collectiblesForMostSold,
  ];

  // Get products by collection type
  const getProductsByCollectionType = (type) => {
    const collection = collections.find(c => c.collectionType === type);
    if (collection?.products?.length > 0) {
      return collection.products.filter(p => p.inStock);
    }
    // Fallback to category/type filtering
    return products.filter(p => 
      (p.category === type || p.type === type || 
       (type === 'herb-house' && p.type === 'flower') ||
       (type === 'delights-cafe' && ['edible', 'beverage'].includes(p.type)) ||
       (type === 'collectibles' && p.type === 'accessory')) && p.inStock
    );
  };

  // Get herb house products
  const herbProducts = getProductsByCollectionType('herb-house');
  
  // Get delights products  
  const delightProducts = getProductsByCollectionType('delights-cafe');
  
  // Get collectibles products
  const collectibleProducts = getProductsByCollectionType('collectibles');

  // Get ticker messages from homepage or fallback
  const tickerMessages = homepage?.tickerMessages || ['new harvest available', 'free shipping over $100', 'system update: edibles restocked'];

  // Get category sections from homepage or fallback
  const categorySections = homepage?.categorySections || [
    { title: 'herb house', subtitle: 'premium flower', slug: { current: 'herb-house' }, icon: 'leaf' },
    { title: 'delights', subtitle: 'edibles & more', slug: { current: 'delights-cafe' }, icon: 'coffee' },
    { title: 'collectibles', subtitle: 'hardware & apparel', slug: { current: 'collectibles' }, icon: 'star' }
  ];

  return {
    products,
    shops,
    homepage,
    collections,
    loading,
    error,
    featuredProduct,
    herbProducts,
    delightProducts,
    collectibleProducts,
    mostSoldItems,
    tickerMessages,
    categorySections,
    getImageUrl
  };
};
