import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Order, Product } from '../types';
import { products } from '../data/products';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL || '',
  import.meta.env.VITE_SUPABASE_ANON_KEY || ''
);

export const useOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data: ordersData, error: ordersError } = await supabase
          .from('orders')
          .select(`
            *,
            items:order_items(*)
          `)
          .order('created_at', { ascending: false });

        if (ordersError) throw ordersError;

        const ordersWithProducts = ordersData.map((order: any) => ({
          ...order,
          items: order.items.map((item: any) => ({
            ...item,
            product: products.find((p: Product) => p.id === item.product_id),
          })),
        }));

        setOrders(ordersWithProducts);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch orders');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return { orders, loading, error };
};