import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'nlb9fjou',
  dataset: 'totally-baked',
  useCdn: false,
  apiVersion: '2024-12-10'
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
    
    // Prepare updates for each product
    const updates = products.map(product => {
      const newCategory = categoryMapping[product.type]
      
      if (!newCategory) {
        console.warn(`No category mapping found for product type: ${product.type}`)
        return null
      }
      
      return {
        id: product._id,
        patch: {
          set: { category: newCategory }
        }
      }
    }).filter(Boolean)
    
    console.log(`Preparing to update ${updates.length} products...`)
    
    // Apply updates in batches
    const batchSize = 10
    for (let i = 0; i < updates.length; i += batchSize) {
      const batch = updates.slice(i, i + batchSize)
      
      console.log(`Updating batch ${Math.floor(i/batchSize) + 1}/${Math.ceil(updates.length/batchSize)}...`)
      
      const transaction = updates.map(update => 
        client.patch(update.id).set(update.patch.set)
      )
      
      await client.transaction(transaction).commit()
      
      // Show what was updated in this batch
      batch.forEach(update => {
        const product = products.find(p => p._id === update.id)
        console.log(`  ✓ ${product.name}: ${product.type} → ${update.patch.set.category}`)
      })
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
