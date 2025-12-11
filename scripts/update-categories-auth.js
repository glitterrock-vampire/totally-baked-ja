import { createClient } from '@sanity/client'

// You need to authenticate with a token
// Get this from: https://www.sanity.io/manage/project/nlb9fjou/api
const client = createClient({
  projectId: 'nlb9fjou',
  dataset: 'totally-baked',
  useCdn: false,
  apiVersion: '2024-12-10',
  token: 'skbdj1iUzWovxxioIx34dXCM1yrVrgVzZvU38H5iqkC3jQS55asDZVsbIBtKHPkRU6ZOXmB5Ag82CDZLxPJNGmJ1WqKvneAtxh2URJo3TRbMr7PwgTRGN94mKtw3lHBQyF4eTkX428AGREhKxZdzzoPGAcati4YetSF0eOLxBYDyoshzGPHz'
})

// Map product types to their corresponding categories
const categoryMapping = {
  'flower': 'flower',
  'edible': 'edible', 
  'beverage': 'beverage',
  'accessory': 'accessory',
  'pre-roll': 'pre-roll',
  'concentrate': 'concentrate'
}

async function updateProductCategories() {
  try {
    console.log('Fetching uncategorized products...')
    
    // Get all products that need categorization
    const products = await client.fetch(`
      *[_type == "product" && !defined(category)] {
        _id,
        name,
        type,
        category
      }
    `)
    
    console.log(`Found ${products.length} products to categorize`)
    
    // Update products one by one to avoid transaction issues
    for (const product of products) {
      const newCategory = categoryMapping[product.type]
      
      if (!newCategory) {
        console.warn(`No category mapping found for product type: ${product.type}`)
        continue
      }
      
      console.log(`Updating ${product.name}: ${product.type} → ${newCategory}`)
      
      await client
        .patch(product._id)
        .set({ category: newCategory })
        .commit()
    }
    
    console.log('\n=== Update Complete ===')
    
    // Verify the updates
    const updatedProducts = await client.fetch(`
      *[_type == "product"] {
        name,
        type,
        category
      }
    `)
    
    console.log('\n=== Updated Product Categories ===')
    const productsByCategory = updatedProducts.reduce((acc, product) => {
      const category = product.category || 'uncategorized'
      if (!acc[category]) {
        acc[category] = []
      }
      acc[category].push(product)
      return acc
    }, {})
    
    Object.entries(productsByCategory).forEach(([category, items]) => {
      console.log(`\n${category.toUpperCase()} (${items.length} products):`)
      items.forEach(product => {
        console.log(`  - ${product.name} (${product.type})`)
      })
    })
    
  } catch (error) {
    console.error('Error updating categories:', error)
    throw error
  }
}

updateProductCategories()
