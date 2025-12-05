import { client, urlFor } from '../../sanity/lib/client'

export const getShops = async () => {
  const query = `*[_type == "shop"] | order(order asc) {
    _id,
    name,
    slug,
    description,
    icon,
    color,
    products[]->{
      _id,
      name,
      slug,
      type,
      price,
      weight,
      images
    }
  }`
  return await client.fetch(query)
}

export const getShopBySlug = async (slug) => {
  const query = `*[_type == "shop" && slug.current == $slug][0] {
    _id,
    name,
    slug,
    description,
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
      effects,
      aroma,
      category,
      weight,
      origin,
      harvestDate,
      labTested,
      organic,
      images,
      inStock,
      featured
    }
  }`
  return await client.fetch(query, { slug })
}

export const getProductBySlug = async (slug) => {
  const query = `*[_type == "product" && slug.current == $slug][0] {
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
    relatedProducts[]->{
      _id,
      name,
      slug,
      price,
      type,
      images
    },
    inStock,
    featured
  }`
  return await client.fetch(query, { slug })
}

export const getFeaturedProducts = async () => {
  const query = `*[_type == "product" && featured == true && inStock == true] | order(_createdAt desc) {
    _id,
    name,
    slug,
    type,
    price,
    weight,
    images,
    strain
  }[0...6]`
  return await client.fetch(query)
}

export const getAllProducts = async () => {
  const query = `*[_type == "product" && inStock == true] | order(_createdAt desc) {
    _id,
    name,
    slug,
    type,
    price,
    weight,
    images,
    strain,
    featured
  }`
  return await client.fetch(query)
}

export { urlFor }
