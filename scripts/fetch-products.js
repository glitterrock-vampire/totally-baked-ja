import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'nlb9fjou',
  dataset: 'totally-baked',
  useCdn: false,
  apiVersion: '2024-12-10'
})

async function fetchProducts() {
  try {
    console.log('Fetching products from Sanity...')
    
    const products = await client.fetch(`
      *[_type == "product"] {
        _id,
        name,
        slug,
        type,
        category,
        price,
        weight,
        strain,
        thc,
        cbd,
        description,
        effects,
        aroma,
        origin,
        harvestDate,
        labTested,
        organic,
        inStock,
        featured,
        isMostSold,
        badge,
        sortOrder,
        "imageUrl": images[0].asset->url
      }
    `)
    
    console.log(`Found ${products.length} products`)
    
    // Group products by category
    const productsByCategory = products.reduce((acc, product) => {
      const category = product.category || 'uncategorized'
      if (!acc[category]) {
        acc[category] = []
      }
      acc[category].push(product)
      return acc
    }, {})
    
    console.log('\n=== Products by Category ===')
    Object.entries(productsByCategory).forEach(([category, items]) => {
      console.log(`\n${category.toUpperCase()} (${items.length} products):`)
      items.forEach(product => {
        console.log(`  - ${product.name} (${product.type})`)
      })
    })
    
    // Save to file
    const fs = await import('fs/promises')
    await fs.writeFile(
      '/Users/user/Desktop/Brand Management /herb-honey/totally-baked/totally-baked/products-export.json',
      JSON.stringify(products, null, 2)
    )
    
    await fs.writeFile(
      '/Users/user/Desktop/Brand Management /herb-honey/totally-baked/totally-baked/products-by-category.json',
      JSON.stringify(productsByCategory, null, 2)
    )
    
    console.log('\n=== Export Complete ===')
    console.log('Products saved to: products-export.json')
    console.log('Categories saved to: products-by-category.json')
    
    return { products, productsByCategory }
    
  } catch (error) {
    console.error('Error fetching products:', error)
    throw error
  }
}

fetchProducts()
