import { createClient } from '@sanity/client'

export const client = createClient({
  projectId: 'nlb9fjou',
  dataset: 'totally-baked',
  useCdn: true,
  apiVersion: '2024-03-19'
})

export const urlFor = (source) => {
  // Simple placeholder for now - we'll add images later
  return {
    url: () => '/placeholder.jpg'
  }
}
