import { useState, useEffect } from 'react';
import { getShops, getShopBySlug } from '../lib/sanity';

export const useSanityShops = () => {
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchShops = async () => {
      try {
        setLoading(true);
        const result = await getShops();
        setShops(result);
        setError(null);
      } catch (err) {
        setError(err.message);
        setShops([]);
      } finally {
        setLoading(false);
      }
    };

    fetchShops();
  }, []);

  return { shops, loading, error };
};

export const useSanityShop = (slug) => {
  const [shop, setShop] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchShop = async () => {
      try {
        setLoading(true);
        const result = await getShopBySlug(slug);
        setShop(result);
        setError(null);
      } catch (err) {
        setError(err.message);
        setShop(null);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchShop();
    }
  }, [slug]);

  return { shop, loading, error };
};
